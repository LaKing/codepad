(function() {

    app.controller('mainController', ['$scope', '$http', '$rootScope', 'socket', 'alertService', 'session', '$window', function($scope, $http, $rootScope, socket, alertService, session, $window) {

        session.load();

        $scope.session_save = function() {
            session.save();
            alertService.add('success', 'Saved session.');
        };
        
        $scope.maindata = {};

        // json betöltés socket.io nélkül, sima get requestként
        $http.get('/maindata.json')
            .then(function(res) {
                $scope.maindata = res.data;
                console.log("maindata:", $scope.maindata);
            }, function errorCallback(response) {
                console.log("error", response);
                alert("##&en Network error (main) ##&hu Hálózati hiba! (main) ##");
            });

    }]);

})();
