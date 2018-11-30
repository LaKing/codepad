#!/bin/bash
MAILTO="webmaster@$HOSTNAME"
MAILFROM="root"

NOW=$(date +%Y.%m.%d-%H:%M:%S)
DAY=$(date +%Y.%m.%d)
PROJECTLOG=$(cat /var/codepad/project.log)
UNITSTATUS=$(systemctl status $UNIT)

sendmail $MAILTO <<EOF
From:$MAILFROM
To:$MAILTO
Subject: $HOSTNAME - project entered failed state $DAY
$NOW
$PROJECTLOG

EOF

echo -e "Status mail sent to: $MAILTO"
