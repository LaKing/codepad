(function() {

    app.controller('adminController', ['$scope', '$http', '$rootScope', 'socket', 'alertService', function($scope, $http, $rootScope, socket, alertService) {
        console.log("Init Admincontroller");



        $scope.json = {};

        $scope.jsoneditoroptions = {};
        $scope.jsoneditoroptions.mode = 'tree';
        $scope.toggle_jsoneditor = function() {
            if ($scope.jsoneditoroptions.mode === 'tree') $scope.jsoneditoroptions.mode = 'code';
            else $scope.jsoneditoroptions.mode = 'tree';
        };


        $scope.test = "";
        $scope.testdata = "-";
        $scope.main = {};
        socket.on('main', function(data) {
            $scope.main = data;
        });

        $scope.action = function() {
            socket.emit("test", $scope.test);
        };

        socket.on('test', function(data) {
            $scope.testdata = data;
        });


    }]);

})();