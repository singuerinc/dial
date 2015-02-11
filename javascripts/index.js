angular.module('dial', [])
    .controller('DialController', ['$scope', '$filter', function ($scope, $filter) {

        var dial_data;
        try {
            dial_data = JSON.parse(localStorage.getItem('dial_data'))
            if(dial_data == null){
                throw new Error();
            }
        } catch (error) {
            // if error get data from data.js
            dial_data = data;
        }

        $scope.search = '';
        $scope.data = dial_data;

        var all_data = [];
        for(var i=0; i<$scope.data.length; i++){
            var links = $scope.data[i].links;
            for(var j=0; j<links.length; j++){
                all_data.push(links[j]);
            }
        }

        $scope.all_data = all_data;

        $scope.theme = 'theme_dark';

        $scope.time = '-';

        $scope.init = function(){
          document.getElementById('search').focus();
        };

        $scope.changeTheme = function (theme) {
            $scope.theme = theme;
            localStorage.setItem('theme', theme);
        };

        var theme = localStorage.getItem('theme');
        if(typeof(theme) != 'undefined'){
            $scope.changeTheme(theme);
        }

        $scope.navigate = function($event){
            if($event.charCode == 13){
                //console.log($scope.search);
                var resultLevel1 = $filter('filter')(data, $scope.search, 'label');
                if (resultLevel1.length > 0) {
                    var result = $filter('filter')(resultLevel1[0].links, $scope.search, 'label');
                    if (result.length > 0) {
                        document.location.href = result[0].href;
                    }
                }
            }
        };

        setTimeout(function () {

            new Packery('.wrapper', {
                itemSelector: 'section',
                gutter: 0
            });

        }, 1);

        var _update_time = function () {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            m = m < 10 ? '0' + m : m;
            $scope.time = h + ":" + m;
        };

        _update_time();
        setInterval(_update_time, 1000);

    }]);
