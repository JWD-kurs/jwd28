var wafepaApp = angular.module("wafepa", ['ngRoute']);

wafepaApp.controller("ctrl", function($scope){
	
	$scope.message = "Hello JWD28!";
	
});

wafepaApp.controller("activitiesCtrl", function($scope, $http, $location){
	
	var baseUrl = "/api/activities";
	
	$scope.activities = [];
	
	var getActivities = function(){
		
		var promise = $http.get(baseUrl);
		promise.then(
			function success(res){
				$scope.activities = res.data;
				console.log("Stigli podaci!");
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
		
		console.log("Test");
	}
	
	getActivities();
	
	$scope.goToAdd = function(){
		$location.path('/activities/add');
	}
	
	$scope.goToEdit = function(id){
		console.log(id);
		$location.path('/activities/edit/' + id);
	}
	
});

wafepaApp.controller("addActivityCtrl", function($scope, $http, $location){
	
	var baseUrl = "/api/activities";
	
	$scope.newActivity = {};
	$scope.newActivity.name = "";
	
	$scope.add = function(){
		var promise = $http.post(baseUrl, $scope.newActivity);
		promise.then(
			function success(res){
				$location.path('/activities');
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
	
});

wafepaApp.controller("editActivityCtrl", function($scope, $routeParams, $http, $location){
	
	var baseUrl = "/api/activities/";
	var id = $routeParams.aid;
	
	$scope.oldActivity = {};
	$scope.oldActivity.name = "";
	
	var getActivity = function(){
		$http.get(baseUrl + id).then(
			function success(res){
				$scope.oldActivity = res.data;
				console.log($scope.oldActivity);
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
	
	getActivity();
	
	$scope.edit = function(){
		$http.put(baseUrl + id, $scope.oldActivity).then(
			function success(res){
				$location.path('/activities');
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
});

wafepaApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl:'/app/html/home.html'
		})
		.when('/activities', {
			templateUrl : '/app/html/activities.html'
		})
		.when('/activities/add', {
			templateUrl : '/app/html/add-activity.html'
		})
		.when('/activities/edit/:aid', {
			templateUrl : '/app/html/edit-activity.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);