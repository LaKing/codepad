(function() {

    app.controller('settingsController', ['$scope', '$http', '$rootScope', 'socket', 'alertService', function($scope, $http, $rootScope, socket, alertService) {

        $scope.jsoneditoroptions = {};
        $scope.jsoneditoroptions.mode = 'tree';
        $scope.toggle_jsoneditor = function() {
            if ($scope.jsoneditoroptions.mode === 'tree') $scope.jsoneditoroptions.mode = 'code';
            else $scope.jsoneditoroptions.mode = 'tree';
        };

        $scope.settingsjson = {};
        socket.on('settings', function(data) {
            console.log("socket: settings", data);
            $scope.settingsjson = data;
            alertService.add('success', 'settings.json loaded.');

        });

        $scope.save_settings = function(data) {
            $scope.settingsjson = data;
            socket.emit("save-settings", $scope.settingsjson);
            console.log("save-settings", $scope.settingsjson);
            alertService.add('success', 'settings.json sent');

        };
        socket.emit("get-settings", '');

    }]);

})();