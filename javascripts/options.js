angular.module("dialOptions", [])
    .controller("DialOptionsController", ["$scope", function ($scope) {

        var dial_data;
        try {
            dial_data = JSON.parse(localStorage.getItem('dial_data'));
            if(dial_data == null){
                throw new Error();
            }
        } catch (error) {
            // if error get data from data.js
            dial_data = data;
        }

        $scope.data = dial_data;

        $scope.saveAll = function () {
            localStorage.setItem('dial_data', angular.toJson($scope.data));
        };

        $scope.newSection = function (data) {
            data.unshift({
                title: 'Untitled section',
                links: [{
                    label: 'Untitled link',
                    href: 'http://'
                }]
            });
        };

        $scope.removeSection = function (data, index) {
            data.splice(index, 1);
        };

        $scope.newLink = function (links) {
            links.unshift({
                label: 'Untitled link',
                href: 'http://'
            });
        };

        $scope.removeLink = function (links, index) {
            links.splice(index, 1);
        };

    }]);