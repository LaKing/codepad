const LOGIN_METHODS = {};

if (ß.USE_PASSPORT)
        LOGIN_METHODS.password = {
            iconColor: "",
            icon: "assignment",
            guest: {
                title: "##&en Password ##&hu Jelszavas ##",
                subtitle: "##&en Authenticate using a password ##&hu Bejelentezés jelszóval ##",
                action: "password_login"
            },
            user: {
                title: "##&en Password settings ##&hu Jelszó beállítás ##",
                subtitle: "##&en Change your password ##&hu Jelszó megváltoztatása ##",
                action: "password_settings"
            }
        };

if (ß.USE_PASSPORT_HASH)
        LOGIN_METHODS.email = {
            iconColor: "",
            icon: "mail",
            guest: {
                title: "##&en Email authentication link ##&hu Email alapú belépés ##",
                subtitle: "##&en Get a login-link by email ##&hu Egy linkre kattintva léphet be, melyet emailben kap ##",
                action: "email_login"
            },
            user: {
                title: "##&en Email settings ##&hu Email beállítások ##",
                subtitle: "##&en Update your login email ##&hu Email címének változtatása ##",
                action: "email_settings"
            }
        };

if (ß.USE_PASSPORT_FACEBOOK)
        LOGIN_METHODS.facebook = {
            iconColor: "#3b5998",
            icon: "fab fa-facebook",
            guest: {
                title: "Facebook",
                subtitle: "##&en Login via facebook auth ##&hu Belépés hitelesítése facebook fiókkal ##",
                action: "/auth/facebook"
            },
            user: {
                title: "Facebook",
                subtitle: "##&en Link with Facebook account ##&hu Facebook fiók kapcsolás ##",
                action: "/connect/facebook"
            }
        };

if (ß.USE_PASSPORT_GOOGLE)
        LOGIN_METHODS.google = {
            iconColor: "#ea4335",
            icon: "fab fa-google",
            guest: {
                title: "Google",
                subtitle: "##&en Login via Google auth ##&hu Belépés hitelesítése Google fiókkal ##",
                action: "/auth/google"
            },
            user: {
                title: "Google",
                subtitle: "##&en Link with Google account ##&hu Google fiók kapcsolás ##",
                action: "/connect/google"
            }
        };


export default LOGIN_METHODS;
