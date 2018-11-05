#!/bin/bash

## username of the user running codepad
user="$1"

if [[ -z $user ]]
then
    user="codepad"
fi

if [[ $user == root ]]
then
    echo "We need a target user, that is not root."
    exit
fi

## enforce user
if [[ $UID != 0 ]]
then
    echo "This script needs root rights. Currently running as $USER"
    exit 1
fi

## we may start this from boilerplate/scripts directly, but it has to run in the folder containing boilerplate
if [[ ! -d boilerplate ]]
then
    cd ..
    cd ..
fi

## project directory - this file should reside in the project root folder
wd="$(pwd)"

if [[ ! -d boilerplate ]]
then
    echo "boilerplate directory not found!"
    exit 2
fi

## home of the user running codepad
home="$(getent passwd "$user" | cut -f6 -d:)"

if [[ -z $home ]]
then
    echo "Please specify an existing user as argument."
    exit 4
fi

echo "Running in $wd as $USER for user $user with home $home"

systemctl stop codepad

NOW="$(date +%Y.%m.%d-%H:%M:%S)"


function log() {
    local msg
    msg=$*
    echo "# $msg"
}


function run() {
    local cmd
    cmd=$*
    echo "# $cmd"
    $*
}

## exit if failed
function exif {
    local exif_code="$?"
    if [ "$exif_code" != "0" ]
    then
        ## the first in stack is what we are looking for. (0th is this function itself)
        log "ERROR $exif_code @ ${BASH_SOURCE[1]}#$BASH_LINENO ${FUNCNAME[1]} :: $*"
        exit "$exif_code";
    fi
}

function install_dependencies() {

   log "Running the installer"
   run npm install

   log "Install mongodb"
   run dnf -y install mongodb mongodb-server


   ## ez nem 100% hogy kell TODO kell?
   #dnf -y install mongoose

   log "start mongodb"
   run systemctl enable mongod
   run systemctl start mongod
   run systemctl status mongod --no-pager

   log "Running git user configurations"

   run git config --global user.email "codepad@$HOSTNAME"
   run git config --global user.name "codepad"

}

function create_certificate() {
 
        ## Create a certificate
        ssl_password="no_password"
        ssl_days=365
        ssl_key=localhost.key
        ssl_csr=localhost.csr
        ssl_org=localhost.org.pem
        ssl_crt=localhost.crt
        ssl_config=localhost-cert-config.txt    

cat  <<EOF>> "$ssl_config"

        RANDFILE               = /tmp/ssl_random

        [ req ]
        prompt                 = no
        string_mask            = utf8only
        default_bits           = 2048
        default_keyfile        = keyfile.pem
        distinguished_name     = req_distinguished_name

        req_extensions         = v3_req

        output_password        = no_password

        [ req_distinguished_name ]
        CN                     = $HOSTNAME
        emailAddress           = webmaster@$HOSTNAME

        [ v3_req ]
        basicConstraints = critical,CA:FALSE
        keyUsage = keyEncipherment, dataEncipherment
        extendedKeyUsage = serverAuth
        subjectAltName = @alt_names
        [alt_names]
        DNS.1 = $HOSTNAME
        DNS.2 = *.$HOSTNAME

EOF

    if [[ ! -f "$ssl_key" ]] || [[ ! -f "$ssl_crt" ]]
    then
        echo "Generate self-signed certificate"

        ## Generate a Private Key
        openssl genrsa -des3 -passout "pass:$ssl_password" -out "$ssl_key" 2048 #2> /dev/null

        ## Generate a CSR (Certificate Signing Request)
        openssl req -new -passin "pass:$ssl_password" -passout "pass:$ssl_password" -key "$ssl_key" -out "$ssl_csr" -days "$ssl_days" -config "$ssl_config" #2> /dev/null

        ## Remove Passphrase from Key
        cp "$ssl_key" "$ssl_org"
        openssl rsa -passin "pass:$ssl_password" -in "$ssl_org" -out "$ssl_key" #2> /dev/null       

        ## Self-Sign Certificate
        openssl x509 -req -days "$ssl_days" -passin "pass:$ssl_password" -extensions v3_req -in "$ssl_csr" -signkey "$ssl_key" -out "$ssl_crt" #2> /dev/null

    fi

    chmod 600 "$ssl_key"
    chmod 644 "$ssl_crt"
    chown "$user":"$user" "$ssl_key" "$ssl_crt"

    echo "Created certificate $ssl_key $ssl_cert"

}

#if [[ $user == codepad ]] && [[ $home  == /srv/codepad ]]
#then
#    ## update srvctl container config
#    usermod --shell /bin/bash -d /var/codepad codepad
#    exif
#fi

mkdir -p "$home"

echo "Chmod / chown"
chown -R "$user":"$user" "$wd" 2> /dev/null #1> /dev/null
chmod -R +X "$wd" 2> /dev/null #1> /dev/null

log 'Started the codepad installer'

create_certificate
install_dependencies

#log "enable node binding to privileged ports"
## Allow Node to bind to privileged ports (80 and 443 for example .)
# run setcap cap_net_bind_service=+ep /usr/bin/node

run ls "$home"
run pidof node

if [[ ! -f "$home"/.ssh/id_rsa ]]
then
	log "Create ssh keys"
    mkdir -p "$home"/.ssh
    ssh-keygen -b 4096 -f "$home"/.ssh/id_rsa -N '' -C "codepad@$HOSTNAME"
    cat "$home"/.ssh/id_rsa.pub > "$home"/.ssh/authorized_keys
    chown -R "$user":"$user" "$home"/.ssh
fi

if [[ ! -f "$home"/.profile ]]
then
    log "Create .profile file"
    echo "cd $wd" >> "$home"/.profile
    echo "mc" >> "$home"/.profile
fi

log "Create codepad service"

cat > "/etc/systemd/system/codepad.service" << EOF
## srvctl generated
[Unit]
Description=Codepad, the collaborative code editor
After=syslog.target network.target
[Service]
PermissionsStartOnly=true
Type=simple
WorkingDirectory=$wd
ExecStartPre=/usr/sbin/setcap cap_net_bind_service=+ep /usr/bin/node
ExecStart=/bin/node $wd/server.js
User=$user
Group=$user
Restart=always
# Environment variables:
Environment=NODE_ENV=production
[Install]
WantedBy=multi-user.target
EOF

if [[ -f server.js ]]
then
    echo "server.js found"
else
    log "createing server.js"

cat > server.js << EOF
#!/bin/node

// to configure our server, we create the ß object now.
if (!global.ß) global.ß = {};

// enable permanent debug mode,
// ß.DEBUG = true;

ß.theme = "cobalt";

require("./boilerplate");

/*
THEMES:

3024-day    ambiance-mobile  blackboard  dracula        elegant       icecoder     liquibyte  mdn-like  neo           paraiso-dark    rubyblue   ssms                     ttcn         xq-light
3024-night  base16-dark      cobalt      duotone-dark   erlang-dark   idea         lucario    midnight  night         paraiso-light   seti       the-matrix               twilight     yeti
abcdef      base16-light     colorforth  duotone-light  gruvbox-dark  isotope      material   monokai   oceanic-next  pastel-on-dark  shadowfox  tomorrow-night-bright    vibrant-ink  zenburn
ambiance    bespin           darcula     eclipse        hopscotch     lesser-dark  mbo        neat      panda-syntax  railscasts      solarized  tomorrow-night-eighties  xq-dark

*/
EOF
fi

if [[ -f .gitignore ]]
then
    echo ".gitignore found"
else
    log "createing .gitignore"
cat > .gitignore << EOF
lib-cov
*.seed
*.log
*.csv
*.dat
*.out
*.pid
*.gz

npm-debug.log
node_modules
package-lock.json
EOF

fi

log "daemon-reload"
run systemctl daemon-reload

log "enable and start codepad"
run systemctl enable codepad.service
run systemctl restart codepad.service

sleep 2

run systemctl status codepad.service

echo "READY"
