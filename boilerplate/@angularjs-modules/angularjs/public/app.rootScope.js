(function() {

  	function is_mobile() {
        if (/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) return true;
        else return false;
    }
  
    app.run(function($rootScope, $location, $templateCache, $window) {
        var path = $location.path();
        console.log("@rootScope", $location.absUrl());
        // rootscope functions and variables
        $rootScope.page = "main";
        $rootScope.pageuri = "/main.html";

        var url = $location.absUrl();

        if (url.split('/')[url.split('/').length - 1] === 'admin') {
            $rootScope.page = "admin-users";
            $rootScope.pageuri = "/admin-users.html";
        }

        $rootScope.go2 = function(page) {
            if ($rootScope.page === page) return;
            // ##&-- payment pages need to be refreshed every time in the browser TODO@LAB we check if there is a better way with $templateCache.remove - which seems to be the case. 
            // Server is always responding with 200 tio overcome browser cash 
            //if (page.substring(0,7) === "payment") $rootScope.pageuri = "/" + page + ".html?u=" + Date.now();
            //else ##
            $templateCache.remove("/" + page + ".html");
            $rootScope.pageuri = "/" + page + ".html";
            $rootScope.page = page;
            $location.hash(page);
            //console.log("GO2", page, $rootScope.pageuri);
            $window.scrollTo(0, 0);
        };

        $rootScope.go2next = function() {
            //console.log('go2next', $rootScope.next_page, $rootScope.next_pages);
            var page = 'main';
            if ($rootScope.next_page) {
                page = $rootScope.next_page;
                $rootScope.next_page = undefined;
                return $rootScope.go2(page);
            }

            if ($rootScope.next_pages) {
                if ($rootScope.next_pages.length > 0) {
                    page = $rootScope.next_pages[0];
                    $rootScope.next_pages.splice(0, 1);
                    return $rootScope.go2(page);
                }
            }

            return $rootScope.go2(page);
        };

        //$rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
        //    console.log("locationChangeStart", event, newUrl, oldUrl);
        //});

        // TODO@LAB - fires sometimes several times... why?!
        $rootScope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
            console.log("locationChangeSuccess", event, 'from', oldUrl, 'to:', newUrl);

            var hash = $location.hash().toLowerCase().replace(/[őóö]/ig, "o").replace(/[úűü]/ig, "u").replace(/á/ig, "a").replace(/é/ig, "e").replace(/í/ig, "i").replace(/\s+/g, '-');

            if (hash === '') return $rootScope.go2('main');
            if (hash.substring(0, 5) === 'admin')
                if (!$rootScope.session.is_admin) $rootScope.go2('login');

            if ($rootScope.page === hash) return;
            $rootScope.go2(hash);
        });

        if ($location.absUrl().indexOf("/admin") > 0) $rootScope.admin = true;

    });

})();
