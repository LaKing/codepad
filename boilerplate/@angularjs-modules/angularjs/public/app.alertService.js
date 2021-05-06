(function() {

    // danger success, warn, ...
    app.factory('alertService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
        $rootScope.alerts = [];
        var alertCounter = 0;
        var alertService = {
            add: function(type, msg) {
                alertCounter += 1;

                var alert = {
                    type: type,
                    //msg: '#' + alertCounter + ' ' + msg,
                    msg: msg,
                    anim: ''
                };

                $timeout(function() {
                    alert.anim = 'fadeIn';
                }, 100);

                $timeout(function() {
                    alert.anim = 'fadeOut';
                }, 6000);

                // ez a timeout időzít
                $timeout(function() {
                    alert.type = 'done';
                    alertService.purge();
                }, 7000);

                for (var i = 0; i < $rootScope.alerts.length; i++) {
                    if ($rootScope.alerts[i].type === 'done') {
                        $rootScope.alerts[i] = alert;
                        return;
                    }
                }


                $rootScope.alerts.push(alert);

            },
            purge: function() {
                for (var i = 0; i < $rootScope.alerts.length; i++) {
                    if ($rootScope.alerts[i].type !== 'done') {
                        return;
                    }
                }

                $rootScope.alerts = [];
            }
        };
        return alertService;
    }]);

})();
