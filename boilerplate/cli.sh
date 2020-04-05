#!/bin/bash

echo "Started in $PWD"
if [[ ! -f /bin/node ]]
then
	echo "Install nodejs first."
    exit
fi

if [[ $UID != 0 ]]
then
	echo "You should be root to operate the boilerplate CLI."
	exit
fi

## go to the CWD
if [[ -L /bin/ß ]] 
then
	cd "$(dirname "$(dirname "$(readlink /bin/ß)")")"
fi

NAME="$(basename "$PWD")"

echo "NAME: $NAME"

VAR="/var/$NAME"
CWD="/srv/$NAME"
BPD="/srv/$NAME/boilerplate"

## working directory
readonly CWD="/srv/$NAME"
uid="$(stat -c '%U' "$CWD")"
gid="$(stat -c '%G' "$CWD")"
cd "$CWD"

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

if [[ ! -f boilerplate/cli.js ]]
then
	echo "Could not locate boilerplate/cli.js in the workind directory. Exiting."
    exit 32
fi

if [[ $1 == stop ]]
then
    if systemctl --quiet is-active "$NAME.scope"
	then
		echo "A systemd process scope is active. Stopping ..."
    	echo "systemctl stop $NAME.scope"
    	systemctl stop $NAME.scope
    else
    	echo "No running instances of $NAME.scope"
    fi
    exit
fi

if [[ $1 == install ]]
then
	## install needs root privileges
	echo "# systemd-run --unit $NAME --scope /bin/node --preserve-symlinks boilerplate/cli.js $@"
	systemd-run --unit "$NAME" --scope /bin/node --preserve-symlinks boilerplate/cli.js $@
    exit
fi

if [[ $1 == start ]] || [[ $1 == debug ]] || [[ $1 == uplink ]]
then
	## no privileges needed, but running in the NAME scope
	echo "# systemd-run --unit $NAME --scope --uid=$uid --gid=$gid /bin/node --preserve-symlinks boilerplate/cli.js $@"
	systemd-run --unit "$NAME" --scope --uid="$uid" --gid="$gid" /bin/node --preserve-symlinks boilerplate/cli.js $@
    exit
fi

if [[ $1 == lib ]] && [[ $2 ]]
then
	## no privileges needed, and running in the NAME-cli scope that should terminate automatically
	echo "# systemd-run --unit $NAME-cli --scope --uid=$uid --gid=$gid /bin/node --preserve-symlinks boilerplate/cli.js $@"
	systemd-run --unit "$NAME-cli" --scope --uid="$uid" --gid="$gid" /bin/node --preserve-symlinks boilerplate/cli.js $@
    exit
fi


if [[ $1 == restart-server ]]
then
	if [[ -f $VAR/project.pid ]]
    then
    	pid="$(cat $VAR/project.pid)"
        echo "kill -SIGUSR1 $pid"
        if kill -SIGUSR1 "$pid"
        then
        	echo OK
            exit
        fi
    fi
fi


## no privileges needed, and running in the NAME-cli scope that should terminate automatically
echo "# systemd-run --unit $NAME-cli --scope --uid=$uid --gid=$gid /bin/node --preserve-symlinks boilerplate/cli.js $@"
systemd-run --unit "$NAME-cli" --scope --uid="$uid" --gid="$gid" /bin/node --preserve-symlinks boilerplate/cli.js $@



if systemctl --quiet is-active "$NAME.scope"
then
	sleep 1
    echo "systemctl status $NAME.scope"
	systemctl status "$NAME.scope"
else
	echo "$NAME.scope inactive"
fi