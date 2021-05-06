## Enable HTTPS
## based on https://www.medo64.com/2016/11/enabling-https-on-mikrotik/

## /tool fetch url="https://raw.githubusercontent.com/LaKing/boilerplate/master/%40javascript-modules/mikrotik/routeros_scripts/enable-https.ros.sh" mode=https

/certificate
add name=root-cert common-name=MyRouter days-valid=3650 key-usage=key-cert-sign,crl-sign
sign root-cert
add name=https-cert common-name=MyRouter days-valid=3650
sign ca=root-cert https-cert

/ip service
set www-ssl certificate=https-cert disabled=no
#set www disabled=yes

## TODO - set to port 8443