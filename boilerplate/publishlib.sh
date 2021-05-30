#!/bin/bash

if [[ $INSTALL_DIR ]]
then
	echo "PUBLISH from $INSTALL_DIR as $USER ($UID)"
else
	echo "publishlib.sh is not meant to be executed directly."
fi

## project in the container
## publishdir="/srv/codepad-project"

if [[ $publishdir ]]
then
	echo "Using publishdir: $publishdir"
else
	## project in the container
	publishdir="$INSTALL_DIR"
fi


### This is a kind of sudoing for the publish process.
if [[ $UID != 0 ]]
then
    echo "ssh root@localhost publish"
    if ssh root@localhost "/bin/bash /bin/publish < /dev/null"
    then
        code=$?
        echo "ssh publish command complete, exit $code"
        exit "$code"
    else
    	echo "ssh command failed. Check $USER publickey in root's authorized_keys."
        exit 250
    fi
fi

## this function accepts only a single parameter, the folder in the project directory
## all other variables are global in the publish script
function publish() {
    echo "PUBLISH $1"
    ## note that node_modules files always date back to 1985. We can't rely on on the default file-size and mod-date by rsync.
    echo 'rsync --delete -avc -L -r -e "ssh -A '"$scuser@$schost"' ssh" "'"$publishdir/$1/"'" "root@'"$container:$publishdir/$1"'"'
    
    if ! ssh $scuser@$schost "ssh root@$container mkdir -p $publishdir"
    then
    	echo "Failed to create $publishdir in $container"
    fi
    
    if rsync --delete -avc -L -r -e "ssh -A $scuser@$schost ssh" "$publishdir/$1/" "root@$container:$publishdir/$1"
    then
    	echo SUCCESS
        echo ''
    else
    	echo FAILED
    fi
}
