## mongodb repo installation
echo "# ensure mongod.service"

rm -fr /etc/yum.repos.d/mongodb-org-4.0.repo

cat > /etc/yum.repos.d/mongodb.repo << EOF
[Mongodb]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
EOF

## remove older versions
dnf -y remove mongodb mongodb-server
dnf -y remove mongo-tools

## mongodb database installation
dnf -y install mongodb-org

## start the service
systemctl enable mongod
systemctl start mongod
systemctl status mongod --no-pager