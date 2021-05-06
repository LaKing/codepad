(function() {

    var app = angular.module('app');
    app.directive('boilerLogin', function($http, alertService, socket, $rootScope, $location) {
        return {
            templateUrl: "login-template.html",
            link: function(scope, element, attr) {

                scope.host = $location.host().split('.')[0];

                scope.email = "";
                scope.password = "";
                scope.remember_me = true;

                scope.login_message = "##&en Enter your e-mail address, or use an account ##&hu Adja meg e-mail címét, vagy használja egyik fiókját ##";

                scope.log_b = false;
                scope.reg_b = false;
                scope.rem = true;

                scope.login_check = function() {
                    // dev only
                    if (scope.email === 'admin' || scope.email === 'x') return true;

                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(scope.email)) return false;

                    //if ($scope.password.length < 3) return false;

                    return true;

                };

                scope.password_check = function() {

                    // rules for password validity
                    if (scope.password.length < 3) return false;

                    return true;

                };

                scope.post_email = function() {
                    var data = JSON.stringify({
                        email: scope.email,
                    });
                    console.log("post-email.json", data);
                    $http.post('/post-email.json', data)
                        .then(function(res) {
                            console.log("post-email response:", res.data);
                            if (res.data == "OK") {
                                //alertService.add('success', '##&en OK ##&hu OK ##');
                                scope.login_message = "##&en Enter your password, or request an email to log in ##&hu Belépés jelszóval, vagy e-mail kérésével ##";
                                scope.log_b = true;
                            }
                            if (res.data == "BADFORMAT") {
                                alertService.add('danger', '##&en Invalid address ##&hu Érvénytelen cím ##');
                                scope.login_message = "##&en Enter your e-mail address ##&hu Adja meg e-mail címét ##, " + scope.email + " ##&en is invalid. ##&hu érvénytelen. ##";
                                console.log("REG_B", $scope.reg_b);
                            }
                            if (res.data == "GOODFORMAT") {
                                scope.login_message = "##&en Sign Up ##&hu Regisztráció ##";
                                scope.reg_b = true;
                            }
                        }, function errorCallback(response) {
                            console.log("error", response);
                            alertService.add('danger', "##&en Network failure. ##&hu Hálózati hiba. ##");

                        });
                };

                scope.login = function() {
                    var data = JSON.stringify({
                        email: scope.email,
                        password: scope.password,
                        rem: scope.rem
                    });

                    console.log("post-login.json", data);
                    $http.post("/post-login.json", data)
                        .then(function(res) {
                            console.log("post-login then:", res.data);
                            if (res.data == "OK") {
                                scope.password = "";
                                alertService.add('success', '##&en Thank you! ##&hu Köszönjük, bejelentkezett. ##');
                                scope.login_message = "##&en Logged in. ##&hu bejelentkezett. ##";

                                socket.connect();
                                $rootScope.go2next();

                            } else {
                                alertService.add('danger', res.data);
                            }
                        }, function errorCallback(response) {
                            console.log("error", response);
                            scope.login_message = "##&en Network failure. ##&hu Hálózati hiba. ##";
                            alertService.add('danger', scope.login_message);

                        });
                };

                scope.send_email = function() {
                    var data = JSON.stringify({
                        email: scope.email
                    });
                    console.log("post-email-request.json", data);
                    $http.post('/post-email-request.json', data)
                        .then(function(res) {
                            console.log("request-email response:", res.data);
                            if (res.data == "OK") {
                                //alertService.add('success', '##&en OK ##&hu OK ##');
                                scope.login_message = "##&en Please check your inbox, we have sent you an email ##&hu Kérjük ellenőrozze e-mail fiókját, üzenetet kapott tőlünk ##";
                            } else {
                                alertService.add('danger', '##&en Error while sending e-mail ##&hu Hiba az email küldése során ##');
                            }
                        }, function errorCallback(response) {
                            console.log("error", response);
                            alertService.add('danger', "##&en Network failure. ##&hu Hálózati hiba. ##");
                        });
                };
            }
        };
    });
})();
