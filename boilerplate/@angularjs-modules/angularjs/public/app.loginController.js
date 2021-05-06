(function() {

    app.controller('loginController', ['$scope', '$http', '$rootScope', 'socket', 'alertService', function($scope, $http, $rootScope, socket, alertService) {

        $scope.login_check = function() {
            // dev only
            if ($scope.email === 'admin' || $scope.email === 'x') return true;

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test($scope.email)) return false;

            if ($scope.password.length < 3) return false;

            return true;

        };

        $scope.email = "";
        $scope.password = "";
        $scope.login_message = "##&en Log In / Sign In ##&hu Bejelentkezés és regisztráció ##";

        $scope.login = function() {
            var data = JSON.stringify({
                email: $scope.email,
                password: $scope.password
            });
            console.log("post-login", data);
            $http.post('/post-login', data)
                .then(function(res) {
                    console.log("login:", res.data);
                    if (res.data == "OK") {
                        $scope.password = "";
                        alertService.add('success', '##&en Thank you! ##&hu Köszönjük, bejelentkezett. ##');

                        socket.connect(function() {
                            $rootScope.go2next();
                        });

                    } else {
                        alertService.add('danger', res.data);
                    }
                }, function errorCallback(response) {
                    console.log("error", response);
                    alertService.add('danger', "##&en Network failure. (login)0 ##&hu Hálózati hiba. (login) ##");
                });
        };

    }]);

})();
