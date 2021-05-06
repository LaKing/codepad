(function() {

    app.factory('session', ['$http', '$rootScope', 'socket', 'alertService', function($http, $rootScope, socket, alertService) {
        $rootScope.session = {};
        $rootScope.session.data = {};
        var session = {};
        session.load = function(callback) {
            //console.log("@session load");
            if (!callback) callback = function() {
                //console.log('no callback');
            };
            $http.get('/session.json')
                .then(function(res) {
                    $rootScope.session = res.data;
                    console.log("@load session-data:", $rootScope.session);
                    
                    //alertService.add('success', 'session.load get-session-data');
                    
                    // open the socket if the user is logged in
                    if ($rootScope.session.passport)
                        if ($rootScope.session.passport.user !== undefined) {
                            socket.connect();
                        }
                    callback(null);
                }, function errorCallback(response) {
                    console.log("error", response);
                    alertService.add('danger', '##&en Network error ##&hu Hálózati hiba ## (session)');
                    callback(response);
                });
        };

        session.save = function(callback) {
            if (!$rootScope.session.data) return console.log("no session data");
            if (!callback) callback = function() {
                //console.log('no callback');
            };

            $http.post('/session-data', $rootScope.session.data)
                .then(function(res) {
                    console.log("post-session-data:", $rootScope.session.data);
                    //alertService.add('success', 'session.save post-session-data');
                    callback(null);
                }, function errorCallback(response) {
                    console.log("error", response);
                    alertService.add('danger', '##&en Network error ##&hu Hálózati hiba ## (session-data)');
                    callback(response);
                });
        };
        return session;
    }]);

})();

//##&-- socket.on("session-data", function(data) ... defined in angular module##
