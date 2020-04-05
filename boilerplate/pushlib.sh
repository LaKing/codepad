#!/bin/bash

start="$(date +%s)"

## make sure we are in the right folder
#INSTALL_BIN="$(realpath "$BASH_SOURCE")"
#INSTALL_DIR="${INSTALL_BIN:0:-8}"
#cd "$INSTALL_DIR"

if [[ $INSTALL_DIR ]]
then
    cd $INSTALL_DIR
    echo "Continue in $PWD"
else
    echo "This file shall be sourced, so that INSTALL_DIR is set"
    exit 16
fi

## we will override this in install-defaults
user=codepad

if [[ -f boilerplate/install-defaults.sh ]]
then
	echo 'Loading install defaults'
    source boilerplate/install-defaults.sh
fi

## some reasonable defaults if the boilerplate variables can not be loaded
NAME="$(basename "$INSTALL_DIR")"
HOST="$HOSTNAME"
VAR="/var/$NAME"
CWD="/srv/$NAME"
BPD="/srv/$NAME/boilerplate"

## there should be a var folder or a symlink to the var folder
if [[ ! -d var ]]
then
    echo 'Missing var folder.'
fi

## we have this default env file in our project eventually
if [[ -f env.sh ]]
then
    echo 'Loading env.sh'
    source env.sh
else

    ## load boilerplate variables
    if [[ -f var/boilerplate.sh ]]
    then
        echo "Loading boilerplate variables"
        source var/boilerplate.sh
        NAME="$BOILERPLATE_NAME"
        HOST="$BOILERPLATE_HOSTNAME"
        VAR="$BOILERPLATE_VAR"
        CWD="$BOILERPLATE_CWD"
        BPD="$BOILERPLATE_BPD"
    else
        echo "Boilerplate variables could not be loaded, guessing defaults, should be fine."
    fi
fi

## just to make sure we are in the right folders, and have the right defaults
echo "NAME: $NAME"
echo "HOST: $HOST"
echo "VAR:  $VAR"
echo "CWD:  $CWD" 

readonly project_log="$VAR"/project.log
readonly project_pid="$VAR"/project.pid
readonly push_lock="$VAR"/push_lock
readonly push_log="$VAR"/push.log
readonly unit="$NAME.scope"

## working directory
readonly uid="$(stat -c '%U' "$CWD")"
readonly gid="$(stat -c '%G' "$CWD")"

if [[ $uid == 0 ]]
then
    echo "UID error. There should be a non-root UID and GID for the project. Exiting."
    exit 76
fi

if [[ $gid == 0 ]]
then
    echo "GID error. There should be a non-root UID and GID for the project. Exiting."
    exit 76
fi

## systemd-run --scope can only run as root in containers, so we need to allow codepad to make a connection to localhost as root, and execute the command as root.
## This is a kind of sudoing for the push process.
if [[ $UID != 0 ]]
then
    echo "ssh root@localhost push > $push_log"
    ssh  -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no root@localhost "/bin/bash /bin/push < /dev/null > $push_log"
    code=$?
    echo "ssh push command complete, exit $code"
    exit "$code"
fi

error_count=0;

if [[ ! -d $VAR ]]
then 
    echo "Project VAR Working Directory $VAR not found. Exiting."
    exit 77
fi

if [[ ! -d $CWD ]]
then 
    echo "Project Current Working Directory $CWD not found. Exiting."
    exit 78
fi

if [[ ! -d $BPD ]]
then 
    echo "Project boilerplate Directory $BPD not found. Exiting."
    exit 79
fi

## the push process is a singleton, at least at the first part
if [[ -f $push_lock ]] 
then
    echo "push_lock found. Please remove $push_lock"
    exit 11
fi

NOW=$(date +%Y.%m.%d-%H:%M:%S)

echo "$NOW" > "$push_lock"
echo ''  > "$project_log"

function push_unlock() {
    echo @push_unlock
    rm -fr "$push_lock"
}

## log to the stdout and to the file
function log() {
    local msg
    msg=$*
    echo "# $msg"
    echo "# $msg" >> "$project_log"
}

## log to stdout and the file the command we run
function run() {
    local cmd
    cmd=$*
    echo "# $cmd"
    echo "# $cmd" >> "$project_log"
    $* 2>&1 >> "$project_log"
}

## the procedure to make sure we terminate the process
function terminate_process_service() {
    echo @terminate_process_service

    systemctl is-active "$unit"

    if systemctl --quiet is-active "$unit"
    then
        run systemctl stop "$unit" &
        sleep 2
    fi

    systemctl is-active "$unit"

    if [[ $(systemctl is-active "$unit") == inactive ]]
    then
        echo 'terminated.'
        return
    fi


    run systemctl kill -s SIGKILL "$unit"
    sleep 1

    systemctl is-active "$unit"
    #echo $?

    if systemctl --quiet is-failed "$unit"
    then
        run systemctl reset-failed "$unit"
    fi

    if [[ $(systemctl is-active "$unit") == inactive ]]
    then
        echo 'terminated..'
        return
    fi
}

function start_server() {
    echo @start_server
    if [ ! -f "$CWD/server.js" ]
    then
        log "$CWD/server.js not found"
        push_unlock
        exit 87
    fi

    ## enable if the app uses port 80. We assume that our app uses port 443 when pushed.
    #(echo >/dev/tcp/localhost/80) &>/dev/null && log "TCP port 80 opened by an application" || log "TCP port 80 available"
    (echo >/dev/tcp/localhost/443) &>/dev/null && log "TCP port 443 opened by an application, exiting." && push_unlock && exit 80 #|| log "TCP port 443 available"

    cd "$CWD"
    
    ## make sure we have a right to bind to privileged port
    setcap cap_net_bind_service=+ep /usr/bin/node
    

    
    echo "systemd-run --unit $NAME --scope --uid=$user --gid=$user /bin/node --preserve-symlinks server.js 2>> $project_log 1>> $project_log &"
    if systemd-run --unit "$NAME" --scope --uid="$user" --gid="$user" /bin/node --preserve-symlinks server.js 2>> "$project_log" 1>> "$project_log" &
    then
    	main_pid="$!"
        echo "systemd-run OK, main pid $main_pid"
        
        ## we will use this await folder to find out if all processes we need to be waiting for are complete.
        ## The folder should contain files with pids that are running, and that our IDE should notify us to wait for.
        rm -fr "$VAR"/await
        mkdir -p "$VAR"/await 
    
        ## we assume we need to wait for the http-server
        echo "$main_pid" > "$VAR"/await/await-https-server.pid
        chown -R "$uid":"$gid" "$VAR"/await 2> /dev/null
    else
        echo 'systemd-run FAILED'
    fi

}

## with every push process, we use this script to increment the version variable
function increment_version() {
    echo @increment_version
    cd "$CWD"
    if ! [ -f "$CWD/version" ]
    then
        echo 0.0.0 > $CWD/version
    fi

    ## current version
    # shellcheck disable=SC2006
    # shellcheck disable=SC2002
    cv=`cat $CWD/version | awk -F. -v OFS=. 'NF==1{print ++$NF}; NF>1{if(length($NF+1)>length($NF))$(NF-1)++; $NF=sprintf("%0*d", length($NF), ($NF+1)%(10^length($NF))); print}'`
    echo "$cv" > "$CWD/version"
    log "VERSION $cv"
}

## We can check if our main pid crashed or not. Our web app should be running ...
function check_process() {
  echo @check_process
  systemctl status "$unit" --no-pager
  if systemctl is-active "$unit" > /dev/null
  then
        if ps -p "$main_pid" > /dev/null
        then
            echo "Running on PID $main_pid"
            return
        else
           log "EXIT Main pid $main_pid inactive."
           ((error_count++))
           exit 169
        fi
  else
    log "ERROR $unit inactive"
    ((error_count++))
    echo "---- $project_log ----"
    cat "$project_log"
    exit 69
  fi
}

## If there are files in the await folder, we shall wait before we compelete the push process. 
function await_processes() {
    echo -e '.\c'
    local pidfile pid
    for pidfile in "$VAR"/await/*.pid
    do
        if [[ -f $pidfile ]] 
        then
            pid="$(cat "$pidfile")"
            if ps -p "$pid" > /dev/null
            then
                sleep 0.3
            else
                rm -fr "$pidfile"
            fi
            return
         else
            count=0
         fi        
     done
}

function await_processes_countdown() {
	echo @await_processes_countdown
    local count
    count=600
    while [ $count -ge 1 ]
    do       
        ((count--))
    	await_processes
    done
    echo '@online'
}

## in case we have some custom pushfiles, process them with this function
## eg. git-push.sh
function process_pushfiles() {
    echo @process_pushfiles
    for f in $CWD/*-push.sh
    do
        if [[ -e $f ]]
        then
            log "$(basename "$f")" 
            /bin/bash "$f" >> "$project_log"
        fi
    done
}

## we assume that errors with capital letters are the ones we need to be notified about.
function show_errors() {
    echo "@show_errors $HOST"

    local uri
    for f in "$VAR"/debug/*.stdout.log
    do
        if [[ -f $f ]] && grep -i ERROR "$f"
        then
            ## \e = \x1B
            ## \a = \x07
            uri="https://$HOST:9001/p/var/debug/${f##*/}"
            echo -e '\e[31m error IN \e[31m\e]8;;'"$uri"'\a'"${f##*/}"'\e]8;;\a\e[0m'  >> "$project_log"
            echo -e '\e[31m error IN \e[31m\e]8;;'"$uri"'\a'"${f##*/}"'\e]8;;\a\e[0m'
            grep -i ERROR "$f" >> "$project_log"
            #((error_count++))
            error_count=$((error_count + $(grep -i ERROR "$f" | wc -l)))
        fi
    done

    for f in "$VAR"/debug/*.stderr.log
        do
        if [[ -f $f ]] && grep ERROR "$f"
        then
            ## \e = \x1B
            ## \a = \x07
            uri="https://$HOST:9001/p/var/debug/${f##*/}"
            echo -e '\e[31m ERROR IN \e[31m\e]8;;'"$uri"'\a'"${f##*/}"'\e]8;;\a\e[0m'  >> "$project_log"
            echo -e '\e[31m ERROR IN \e[31m\e]8;;'"$uri"'\a'"${f##*/}"'\e]8;;\a\e[0m'
            #((error_count++))
            error_count=$((error_count + $(grep ERROR "$f" | wc -l)))
        fi
    done
}

## all functions defined, now do it!

log "PUSH $NAME $cv $HOSTNAME:$CWD $NOW $user as $USER"

## make sure all folders have the proper rights
chown -R "$uid":"$gid" "$CWD" 2> /dev/null
chmod -R +X $CWD 2> /dev/null

increment_version

terminate_process_service
if [[ -f stop.sh ]] 
then
	echo "source stop.sh"
    source stop.sh
fi

start_server
sleep 1
push_unlock
check_process
process_pushfiles
await_processes_countdown
show_errors
check_process
end="$(date +%s)"
log "PUSH $NAME READY ($error_count errors, $((end-start)) sec)" 

