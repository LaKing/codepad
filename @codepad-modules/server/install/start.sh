#!/bin/bash

## This script should help to start the boilerplate by shell execution

if [[ $UID == 0 ]]
then
    echo "enable node binding to privileged ports"
    ## Allow Node to bind to privileged ports (80 and 443 for example .)
    setcap cap_net_bind_service=+ep /usr/bin/node
fi

pid=/var/codepad/project.pid
log=/var/codepad/project.log

if [[ -f $pid ]]
then
    echo "Found pidfile, killing $(cat "$pid")"
    kill "$(cat "$pid")"
    rm -fr "$pid"
    sleep 1
fi

(echo >/dev/tcp/localhost/80) &>/dev/null && echo "TCP port 80 opened by an application" || echo "TCP port 80 available"
(echo >/dev/tcp/localhost/443) &>/dev/null && echo "TCP port 443 opened by an application" && exit || echo "TCP port 443 available"

echo "This process is $USER ($UID), pid $$, continue as codepad"
su codepad -s /bin/bash -c '/bin/node server.js'
exit_code=$?
echo "- the node process exited with $exit_code"
sleep 1

