#!/bin/bash
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
chown codepad:codepad "$ssl_key" "$ssl_crt"

echo "Created certificate $ssl_key $ssl_cert"
