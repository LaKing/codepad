#!/bin/bash

# echo $PWD

if [[ ! -f /bin/ß ]]
then
    ln -s "$PWD"/cli.sh /bin/ß
    chmod +x /bin/ß
fi

/bin/node /srv/codepad-project/boilerplate/cli.js $*
