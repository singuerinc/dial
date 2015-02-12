angular.module('dial', [])
	.controller('DialController', ['$scope', '$filter', function($scope, $filter) {

		TweenLite.set('.clock', {css: {opacity: 0}});
		TweenLite.set('.wrapper', {css: {opacity: 0}});

		var layout = function() {
			new Packery('.wrapper', {
				itemSelector: 'section',
				gutter: 0
			});
			TweenLite.to('.wrapper', 0.4, {css: {opacity: 1, z: 0.01}, delay: 0.3});
			TweenLite.from('.wrapper', 0.7, {css: {y: '+=200px', z: 0.01}, ease: 'Expo.easeOut', delay: 0.3});
			TweenLite.to('.clock', 0.7, {css: {opacity: 1}, delay: 0.4});
			TweenLite.from('.clock', 0.7, {css: {y: '+=100px', z: 0.01}, ease: 'Expo.easeOut', delay: 0.4});
		};

		var _onDataLoaded = function(items) {
			$scope.$apply(function() {

				$scope.data = JSON.parse(items.dial_data);

				var all_data = [];
				for (var i = 0; i < $scope.data.length; i++) {
					var links = $scope.data[i].links;
					for (var j = 0; j < links.length; j++) {
						all_data.push(links[j]);
					}
				}

				$scope.all_data = all_data;
				setTimeout(layout, 1);
			});
		};

		chrome.storage.sync.get('dial_data', _onDataLoaded);
		//_onDataLoaded(data);

		$scope.search = '';

		$scope.theme = 'theme_dark';

		$scope.time = '-';

		$scope.init = function() {
			document.getElementById('search').focus();
		};

		$('#options_url').attr('href', chrome.extension.getURL("options.html"));

		$scope.changeTheme = function(theme) {
			$scope.theme = theme;
			localStorage.setItem('theme', theme);
		};

		var theme = localStorage.getItem('theme');
		if (typeof(theme) != 'undefined') {
			$scope.changeTheme(theme);
		}

		$scope.navigate = function($event) {
			if ($event.charCode == 13) {
				//console.log($scope.search);
				var resultLevel1 = $filter('filter')(data, $scope.search, 'label');
				if (resultLevel1.length > 0) {
					var result = $filter('filter')(resultLevel1[0].links, $scope.search,
						'label');
					if (result.length > 0) {
						document.location.href = result[0].href;
					}
				}
			}
		};

		var _update_time = function() {
			var today = new Date();
			var h = today.getHours();
			var m = today.getMinutes();
			m = m < 10 ? '0' + m : m;
			$scope.time = h + ":" + m;
		};

		_update_time();
		setInterval(_update_time, 1000);

	}]);
