(function() {

    app.controller('promoController', ['$scope', '$http', '$rootScope', 'socket', 'alertService', function($scope, $http, $rootScope, socket, alertService) {

        $scope.forms = {};
        $scope.data = {};

        $scope.save = function() {
            console.log('save-promo', $scope.data);
            socket.emit('save-promo', $scope.data);
        };

        // load forms 
        $http.get('/admin-promo.form.json')
            .then(function(res) {
                //$rootScope.forms = res.data;
                console.log("forms:", res.data);
                $scope.forms = res.data;
            }, function errorCallback(response) {
                console.log("error", response);
                alert("##&en Network-error ##&hu Hálózati hiba! ##");
            });

    }]);
})();
