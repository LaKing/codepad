#!/bin/bash

## This script should help to start the boilerplate by shell execution
if [[ $UID == 0 ]]
then
    echo "You should run this as root."
fi

echo "# enable node binding to privileged ports"
    ## Allow Node to bind to privileged ports (80 and 443 for example .)
echo "setcap cap_net_bind_service=+ep /usr/bin/node"
setcap cap_net_bind_service=+ep /usr/bin/node

readonly INSTALL_BIN="$(realpath "$BASH_SOURCE")"
readonly INSTALL_DIR="${INSTALL_BIN:0:-9}"
readonly NAME="$(basename "$INSTALL_DIR")"

pid=/var/"$NAME"/project.pid
log=/var/"$NAME"/project.log

# working directory
readonly wd="/srv/$NAME"
uid="$(stat -c '%U' "$wd")"
gid="$(stat -c '%G' "$wd")"

if systemctl is-active "$NAME".scope > /dev/null
then
    echo "# Stopping current $NAME.scope"
    systemctl stop "$NAME".scope
else
    echo "# $NAME.scope inactive"
fi


if [[ ! -f server.js ]]
then
    echo '# server.js not found! exiting.'
    exit 87
fi

#(echo >/dev/tcp/localhost/80) &>/dev/null && echo "## TCP port 80 opened by an application" || echo "# TCP port 80 available"
(echo >/dev/tcp/localhost/443) &>/dev/null && echo "## TCP port 443 opened by an application" && exit || echo "# TCP port 443 available"

echo "# $NAME process is $USER ($UID), pid $$, continue with:"
echo "systemd-run --scope --unit $NAME --no-ask-password --uid=$uid --gid=$gid /bin/node --preserve-symlinks server.js"
cd "$wd"
systemd-run --scope --unit "$NAME" --no-ask-password --uid="$uid" --gid="$gid" /bin/node --preserve-symlinks server.js

exit_code=$?
echo "# $NAME exited with $exit_code"

