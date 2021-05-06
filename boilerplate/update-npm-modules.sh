#!/bin/bash

for i in /srv/boilerplate/*/*
do
    cd "$i"
    pwd

    rm -fr package-lock.json
    rm -fr node_modules

    bash npm.sh

done