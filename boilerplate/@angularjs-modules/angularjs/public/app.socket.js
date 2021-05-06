(function() {

    app.factory('socket', ['$rootScope', 'alertService', '$window', '$timeout', function($rootScope, alertService, $window, $timeout) {
        var socket = {}; // = io.connect();
        var connected = false;
        return {
            is_connected: function() {
                return connected;
            },
            connect: function() {
                if (connected) return;
                console.log("@socket.io connect");

                socket = io.connect();
                connected = true;

                socket.on("session-data", function(data) {
                    $rootScope.session = data;
                    console.log('@socket session-data', data);

                    // If we require, for example name from the user, send him to the profile page
                    //if (!$rootScope.session.user.profile.name) $rootScope.page = "profile";
                    // we may disable some buttons if we have to

                });

                socket.on("success", function(data) {
                    alertService.add('success', data);
                });
                socket.on("danger", function(data) {
                    alertService.add('danger', data);
                });
                socket.on("redirect", function(url) {
                    console.log("redirect", url);
                    $window.location.href = url;
                });
            },
            on: function(eventName, callback) {
                if (!connected) return console.log("socket not connected - ", eventName);
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function(eventName, data, callback) {
                if (!connected) return console.log("socket not connected - ", eventName);
                socket.emit(eventName, data, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }]);
})();
