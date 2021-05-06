echo "# mongod.service is required in this project, current status:"

if systemctl is-active mongod
then
	echo "# .. mongod is running."
else
	echo "# .. mongod needs to be installed / started"
	/bin/bash "$(dirname $0)/dnf.sh"
fi