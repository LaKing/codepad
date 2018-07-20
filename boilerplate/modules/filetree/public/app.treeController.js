(function() {

    app.factory('socket', ['$rootScope', '$window', function($rootScope, $window) {
        var socket = io.connect();
        socket.on('disconnect', function() {
            $window.location.reload();
        });
        return {
            on: function(eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function(eventName, data, callback) {
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

    app.filter('filesByPath', function() {
        return function(input, dir) {

            if (!dir) dir = '';
            var out = [];
            angular.forEach(input, function(path) {
                if (path.substring(0, dir.length + 1) !== dir + '/') return;
                var px = path.substring(dir.length);
                var pa = px.substring(1).split('/');
                //console.log("Consider-file", dir, path, px, pa);
                if (pa.length !== 1) return;
                var e = pa[0];
                if (!out.includes(e)) out.push(e);
            });
            return out;
        };
    });
    app.filter('foldersByPath', function() {
        return function(input, dir) {
            if (!dir) dir = '';
            var out = [];
            angular.forEach(input, function(path) {
                if (path.substring(0, dir.length + 1) !== dir + '/') return;
                var px = path.substring(dir.length);
                var pa = px.substring(1).split('/');
                //console.log("Consider-dir", dir, path, px, pa);
                if (pa.length < 2) return;
                var e = '/' + pa[0];
                if (!out.includes(e)) out.push(e);
            });

            return out;
        };
    });


    app.directive('treeview', function() {

        return {
            restrict: 'E',
            scope: {
                path: '=path',
                files: '=files'
            },
            templateUrl: '/treetemplate.html',
            link: function($scope, element, attrs) {
                $scope.keys = function(data) {
                    return Object.keys(data);
                };
                $scope.get_underline = function(s) {
                    var n = 0;
                    for (var sid in s) {
                        n += s[sid];
                    }
                    return n % 2 == 0;
                };
                $scope.nixCase = function(v1, v2) {
                    if (v1.type !== 'string' || v2.type !== 'string') {
                        return (v1.index < v2.index) ? -1 : 1;
                    }
                    // TODO modify sorting to midnight commander style sorting to get a consistent view with it?

                    return v1.value.localeCompare(v2.value, "en", {
                        caseFirst: "upper"
                    });
                };
            }
        };
    });

    app.controller('treeController', ['$scope', '$rootScope', 'socket', function($scope, $rootScope, socket) {

        $scope.files = {};

        socket.on('files', function(data) {
            $scope.files = data;
        });

    }]);

})();