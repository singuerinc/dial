angular.module("dialOptions", [])
	.controller("DialOptionsController", ["$scope", function($scope) {

		var _onDataLoaded = function(items) {
			$scope.$apply(function() {
				$scope.data = JSON.parse(items.dial_data);
			});
		};

		chrome.storage.sync.get('dial_data', _onDataLoaded);
		//_onDataLoaded(data);

		$scope.saveAll = function() {
			chrome.storage.sync.set({
				'dial_data': JSON.stringify(angular.toJson($scope.data))
			}, function() {
				console.log('data saved!');
			});
		};

		$scope.newSection = function(data) {
			data.unshift({
				title: 'Untitled section',
				links: [{
					label: 'Untitled link',
					href: 'http://'
				}]
			});
		};

		$scope.removeSection = function(data, index) {
			data.splice(index, 1);
		};

		$scope.newLink = function(links) {
			links.unshift({
				label: 'Untitled link',
				href: 'http://'
			});
		};

		$scope.removeLink = function(links, index) {
			links.splice(index, 1);
		};

	}]);
