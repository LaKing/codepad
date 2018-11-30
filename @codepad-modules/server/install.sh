#!/bin/bash

## enforce codepad user
if [[ $UID != 0 ]]
then
    echo "This script has to run as root. Currently running as $USER"
    exit 1
fi

NOW=$(date +%Y.%m.%d-%H:%M:%S)

## working directory
## we must guess a default here
## TODO detect the right directory
name=codepad-project
echo "Started $name install.sh $NOW"

wd="/srv/$name"
user=codepad

project_log="/var/$name/project.log"
echo '' > "$project_log"

## this module directory 
md="$(dirname $(readlink -f $0))"


function log() {
    local msg
    msg=$*
    echo "# $msg"
    echo "# $msg" >> "$project_log"
}

function run() {
    local cmd
    cmd=$*
    echo "# $cmd"
    echo "# $cmd" >> "$project_log"
    $* 2>&1 >> "$project_log"
}

if [[ ! -d $wd ]]
then
    log "Target working directory is $wd"
    mkdir -p $wd
fi

## go to the working directory of the project
cd "$wd"

chown -R "$user:$user" "$wd"
chmod -R +X "$wd"

## we also set up a directory in /var for localized files, logs, editor files - wich are disposable files
mkdir -p "/var/$name"
if [[ -L $wd/var ]]
then
    echo "link to /var exists"
else
    ln -s /var/"$name" "$wd/var"
fi

chown -R "$user:$user" /var/"$name"


log "Disabling httpd apache webserver"
   systemctl disable httpd
   systemctl stop httpd

log "Running git user configurations"

   git config --global user.email "codepad@$HOSTNAME"
   git config --global user.name "Codepad"


## copy all files froom install dir into the working directory
if [[ -d $md/install ]]
then
    log "Copy script files"
    cd "$md/install"
    for f in *
    do
        if [[ -f $wd/$f ]]
        then
            echo " @ $f"
            diff "$f" "$wd/$f" 
        else
            echo " @ Creating $f"
            cat "$f" > "$wd/$f"
        fi
    done

    ## make shell scripts executeable
    chmod 744 "$wd"/*.sh

fi


log "enable node binding to privileged ports"
    ## Allow Node to bind to privileged ports (80 and 443 for example .)
    setcap cap_net_bind_service=+ep /usr/bin/node

echo "Create project service"

cat > /etc/systemd/system/project.service << EOF
## srvctl generated
[Unit]
Description=Codepad/ßoilerplate project in production
After=syslog.target network.target
OnFailure=notify.service
[Service]
PermissionsStartOnly=true
Type=simple
WorkingDirectory=$wd
ExecStartPre=/bin/bash -c 'echo SERVICE-RESTART > $project_log'
ExecStartPre=/usr/sbin/setcap cap_net_bind_service=+ep /usr/bin/node
ExecStart=/bin/node $wd/server.js
PIDFile=/var/$name/project.pid
User=codepad
Group=codepad
Restart=always
RestartSec=3
SyslogIdentifier=project

# Environment variables:
Environment=NODE_ENV=production
# Allow many incoming connections
LimitNOFILE=infinity
# Allow core dumps for debugging
LimitCORE=infinity
StandardInput=null
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
EOF

cat /etc/systemd/system/project.service

## if the app crashes we can send an email via systemd notify service
cat > /etc/systemd/system/notify.service << EOF
[Unit]
Description=Unit Status Mailer Service
After=network.target
[Service]
Type=simple
ExecStart=/bin/bash $wd/notify.sh
EOF

cat /etc/systemd/system/notify.service

## syslog routes our console log to a file and to journald.
syslogconf="/etc/rsyslog.d/project.conf"

{
    echo '$template plainFormat,"%msg%\n"'
    echo 'if $programname == "project" then /var/'"$name"'/project.log;plainFormat'
    echo 'if $programname == "project" then stop'
} > "$syslogconf"


log "rsyslog configuration"
systemctl restart rsyslog.service
systemctl status rsyslog.service

log "daemon-reload"
systemctl daemon-reload


systemctl status project.service

if [[ -f "$wd"/boilerplate/cli.sh ]] && [[ ! -f /bin/ß ]]
then
    log "Create ß cli command"
    ln -s "$wd"/boilerplate/cli.sh /bin/ß
    chmod +x /bin/ß
fi


if [[ -f "$wd"/push.sh ]] && [[ ! -f /bin/push ]]
then
    log "Create push command"
    ln -s "$wd"/push.sh /bin/push
    chmod +x /bin/push
fi

if [[ -f "$wd"/publish.sh ]] && [[ ! /bin/publish ]]
then
    log "Create publish command"
    ln -s "$wd"/publish.sh /bin/publish
    chmod +x /bin/publish
fi

if [[ ! -f /root/.ssh/id_rsa ]]
then
    ssh-keygen -t rsa -b 4096 -f /root/.ssh/id_rsa -N '' -C "boilerplate@$HOSTNAME"
fi

## if codepad exists symlink log and pid files
if [[ -d /var/codepad ]]
then
    rm -fr /var/codepad/project.pid
    rm -fr /var/codepad/project.log
    ln -s "$project_log" /var/codepad/project.log
    ln -s /var/"$name"/project.pid /var/codepad/project.pid
fi

echo "Finished $NOW"