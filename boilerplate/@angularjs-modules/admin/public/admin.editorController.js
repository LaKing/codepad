(function() {

    app.controller('editorController', ['$scope', '$window', '$location', '$rootScope', 'socket', 'alertService', '$document', function($scope, $window, $location, $rootScope, socket, alertService, $document) {
        console.log("Init EditorController", socket.connected);
        
        $rootScope.save_page = function() {

            var document = $document[0];
            var content = String(document.getElementById('page').innerHTML);
            
            console.log("admin-save-page", $rootScope.page, content.substring(0, 200));
            socket.emit("admin-save-page", content);
        };
        
        $rootScope.codepad_page = function() {
            var document = $document[0];
            var data = String(document.getElementById('page').innerHTML);
            var arr = data.split('!');
            if (arr[1] !== '-- @path') return console.log("Path tag missing", arr[1], arr[2]);
            var file_tag = arr[2].trim();
            $window.open('https://' + $location.host() + ':9001/p/' + file_tag, '_blank');
        };


    }]);

})();
