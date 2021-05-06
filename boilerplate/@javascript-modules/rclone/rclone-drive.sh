#/bin/bash

CWD=/srv/codepad-project

if [[ ! -f $CWD/rclone.conf ]]
then
	echo "No rclone.conf at $CWD/rclone.conf, please create a copy from the rclone module template and enter the folder id."
    exit 1
fi


## @javascript-modules/csvloader/node_modules/csvtojson/bin/csvtojson
csvtojson="$CWD/@javascript-modules/csvloader/node_modules/csvtojson/bin/csvtojson"
if [[ -f $csvtojson ]]
then
	echo "using $csvtojson" 
else
	echo "csvtojson not at $CWD/@javascript-modules/csvloader/node_modules/csvtojson/bin/csvtojson, please uplink/install or modify this script"
    echo "skipping csv conversion."
fi

echo "# $USER RCLONE SYNCING CLOUDDIR" >> /var/codepad-project/project.log

## full sync with csv to json conversion for spreadsheets
## using default paths
echo "SYNCING CLOUDDIR"
mkdir -p "$CWD"/var/clouddir
if rclone -v --config="$CWD/rclone.conf" --drive-export-formats txt,csv sync google-drive: "$CWD"/var/clouddir
then
	if [[ -f $csvtojson ]]
    then
    	for f in $(find "$CWD"/var/clouddir -name '*.csv')
    	do	
    		echo "csvtojson --ignoreEmpty=true $f > $f.json"
    		$csvtojson --ignoreEmpty=true $f > $f.json
    	done
    fi
    chown -R codepad:codepad "$CWD"/var/clouddir
    echo "SUCCESS"

else
    echo "FAILED"
fi



### another simple example
# for i in folder1 folder2
# do
#    echo "SYNCING $i"
#    rclone -v --config="/srv/codepad-project/rclone.conf" sync example-drive:"$i"/content /srv/codepad-project/static/content
# done