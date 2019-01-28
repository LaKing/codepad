/*ßoilerplate */

(function() {

    app.run(function($rootScope, $location, $templateCache, $window, socket, $sce) {

        var url = $location.absUrl();

        $rootScope.pad = '/logs';
        $rootScope.refresh = false;

        // ng-click="$root.set_pad(path, p)" 
        $rootScope.set_pad = function(path, pad) {
            if (!path) path = '';
            $rootScope.pad = '/p' + path + '/' + pad;
            console.log('$rootScope.pad', $rootScope.pad);
            if (url.split('/')[url.split('/').length - 1] === 'files') $window.open($rootScope.pad, '_blank');
            //$location.hash($rootScope.pad);
        };

        // oncontextmenu="return false"
        $rootScope.click_pad = function($event, path, pad) {
            switch ($event.which) {
                case 1:

                    $rootScope.set_pad(path, pad);
                    break;
                case 2:
                    // in case you need some middle click things
                    break;
                case 3:
                    // this is right click
                    if (!path) path = '';
                    var pad_uri = '/p' + path + '/' + pad;
                    $window.open(pad_uri, '_blank');
                    break;
                default:
                    alert("you have a strange mouse!");
                    break;
            }
        };
/*
        $rootScope.beautifyable = function() {
            var pad = $rootScope.pad.split('?')[0];
            var par = pad.split('.');
            var ext = par[par.length - 1].toLowerCase();
            if (ext === 'js') return 'JavaScript';
            if (ext === 'css') return 'CSS';
            if (ext === 'html') return 'HTML';
            //if (ext === 'ejs') return true;

            return false;
        };
*/
        $rootScope.files = function() {
            $window.open(url + 'files', '_blank');
        };

        $rootScope.play = function() {
            $window.open('https:' + url.split(':')[1], '_blank');
        };

        $rootScope.logs = function() {
            $window.open(url + 'logs', '_blank');
        };

        $rootScope.shell = function() {
            $window.open(url + 'shell', '_blank');
        };

        $rootScope.push = function() {
            socket.emit("exec", 'push');
        };

        $rootScope.beautify = function() {
            socket.emit("beautify", $rootScope.pad.substring(2));
        };

        $rootScope.plug_and_play = function() {
            $rootScope.refresh = true;
          
            $rootScope.beautify();
          
            setTimeout(function() {
                $rootScope.pad = '/logs';
                $rootScope.push();
            }, 500);

        };
      
        socket.on('push-complete', function(code) {
            if ($rootScope.refresh === false) return;
            $rootScope.refresh = false;
        	if (code === 0) $rootScope.play();            
        });

        $rootScope.search = function() {
            if ($rootScope.replace_input) $window.open(url + 'search?find=' + $rootScope.search_input + '&replace=' + $rootScope.replace_input, '_blank');
            else $window.open(url + 'search?find=' + $rootScope.search_input, '_blank');
        };

        socket.on('msg', function(data) {
            $rootScope.status = data;
            $rootScope.status_red = false;
        });
        socket.on('err', function(data) {
            $rootScope.status = data;
            $rootScope.status_red = true;
        });

        socket.on('logline', function(data) {
            console.log(data);
            $rootScope.logline = $sce.trustAsHtml(data);
        });

        socket.on('ntc', function(data) {
            var txt = '';
            if (data.now) txt += data.now + ' ';
            if (data.username) txt += data.username + ' ';
            if (data.opname) txt += data.opname + ' ';
            if (data.filepath) txt += data.filepath + ' ';
            if (data.msg) txt += data.msg + ' ';
            $rootScope.notice = txt;
            $rootScope.ntc = data;
        });

        socket.on('disconnect', function() {
            $window.location.reload();
        });

    });

})();