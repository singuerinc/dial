angular.module('dial', [])
	.controller('DialController', ['$scope', '$filter', function($scope, $filter) {

		TweenLite.set(['.clock', '.wrapper'], {css: {opacity: 0}});

		var animIntro = function(){
			TweenLite.to('.wrapper', 0.4, {css: {opacity: 1, z: 0.01}, delay: 0.3});
			TweenLite.from('.wrapper', 0.7, {css: {y: '+=100px'}, ease: 'Expo.easeOut', delay: 0.3, onComplete: function () {
				setTimeout(function () {
					var d = document.querySelector('.wrapper');
					d.style.height = (Math.ceil(parseInt(d.style.height)/2)*2)+'px';
					d.style.transform = 'translate3d(-50%, -50%, 0)';
				}, 1);
			}});
			TweenLite.to('.clock', 0.7, {css: {opacity: 1}, delay: 0.4});
			TweenLite.from('.clock', 0.7, {css: {y: '+=100px', z: 0.01}, ease: 'Expo.easeOut', delay: 0.4});
			TweenLite.to('footer', 0.7, {css: {opacity: 1}, delay: 0.4});
		};

		$scope.layout = function() {
			new Packery('.wrapper', {
				itemSelector: 'section',
				gutter: 0
			});

		};

		var parseAllData = function(){
			var all_data = [];
			for (var i = 0; i < $scope.data.length; i++) {
				var links = $scope.data[i].links;
				for (var j = 0; j < links.length; j++) {
					all_data.push(links[j]);
				}
			}

			$scope.all_data = all_data;
		};

		var _updateWithData = function(items){
			$scope.data = JSON.parse(items.dial_data);

			parseAllData($scope.data);

			setTimeout($scope.layout, 1);
			setTimeout(animIntro, 1);
		};

		var _onDataLoaded = function(items) {

			if(!$scope.$$phase) {
				$scope.$apply(function() {
					_updateWithData(items);
				});
			} else {
				_updateWithData(items);
			}
		};

		try{
			chrome.storage.sync.get('dial_data', _onDataLoaded);
		} catch(err){
			_onDataLoaded({dial_data: JSON.stringify(data)});
		}

		$scope.search = '';

		$scope.theme = 'theme_dark';
		$scope.editMode = false;

		$scope.time = '-';

		$scope.init = function() {
			$('search').focus();
		};

		$scope.changeTheme = function(theme) {
			$scope.theme = theme;
			localStorage.setItem('theme', theme);
		};

		var theme = localStorage.getItem('theme');
		if (typeof(theme) != 'undefined') {
			$scope.changeTheme(theme);
		}

		$scope.setEditMode = function(){
			$scope.search = '';
			$scope.editMode=!$scope.editMode;
			if($scope.editMode) {
				TweenLite.to('#search', 0.2, {css: {opacity: 0, display: 'none'}});
			} else {
				TweenLite.to('#search', 0.2, {css: {opacity: 1, display: 'inline-block'}});
			}
			setTimeout($scope.layout, 1);
		};

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



		// cms

		$scope.saveAll = function() {
			chrome.storage.sync.set({
				'dial_data': JSON.stringify(angular.toJson($scope.data))
			}, function() {
				console.log('data saved!');
			});
		};

		$scope.createNewSection = function() {
			TweenLite.to('#new-section-modal', 0.3, {css: {opacity: 1, display: 'block'}});
		};

		$scope.newSection = function(data, title) {
			if(title=='' || title==null) return;
			data.unshift({
				title: title,
				links: []
			});
			setTimeout($scope.layout, 1);
			TweenLite.to('#new-section-modal', 0.3, {css: {opacity: 0, display: 'none'}});
		};

		$scope.cancelNewSection = function () {
			TweenLite.to('#new-section-modal', 0.3, {css: {opacity: 0, display: 'none'}});
		};

		$scope.removeSection = function(data, index) {
			data.splice(index, 1);
			parseAllData();
			setTimeout($scope.layout, 1);
			//$scope.saveAll();
		};

		$scope.newLink = function(links) {
			links.unshift({
				label: 'Untitled link',
				href: 'http://'
			});
			parseAllData();
			//$scope.saveAll();
		};

		$scope.removeLink = function(links, index) {
			links.splice(index, 1);
		};

	}]);
