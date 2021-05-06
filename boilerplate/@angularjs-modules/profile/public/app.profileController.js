(function() {


    app.controller('profile', ['$scope', '$http', '$rootScope', 'socket', 'alertService', function($scope, $http, $rootScope, socket, alertService) {

        $scope.forms = {};

        $scope.save = function() {
            var data = {};
            data.profile = $rootScope.session.user.profile;
            data.billing = $rootScope.session.user.billing;
            data.shipping = $rootScope.session.user.shipping;
            console.log('save-profile', data);
            socket.emit('save-profile', data);
            
            // go to next page?
            $rootScope.go2next();
        };

        // load forms 
        $http.get('/profile.json')
            .then(function(res) {
                $scope.forms = res.data;
            }, function errorCallback(response) {
                console.log("error", response);
                alert("##&en Network failure ##&hu Hálózati hiba! ##");
            });


    }]);

})();
