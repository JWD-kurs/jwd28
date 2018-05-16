var wafepaApp = angular.module("wafepa", ['ngRoute']);

wafepaApp.controller("ctrl", function($scope){
	
	$scope.message = "Hello JWD28!";
	
});


wafepaApp.controller("standoviCtrl", function($scope, $http){
	
	var baseUrl = "/api/standovi";
	var baseUrlSajmovi = "/api/sajmovi";
	
	$scope.sajmovi = [];
	$scope.standovi = [];
	
	$scope.stand = {};
	$scope.stand.zakupac = "";
	$scope.stand.povrsina = "";
	$scope.stand.sajamId = 0;
	
	$scope.search = {};
	$scope.search.zakupac = "";
	$scope.search.minP = "";
	$scope.search.maxP = "";
	
	$scope.pageNum = 0;
	$scope.totalPages = 1;
	
	var getStandovi = function(){
		
		var config = { params: {} };
		
		if($scope.search.zakupac != ""){
			config.params.zakupac = $scope.search.zakupac;
		}
		if($scope.search.minP != ""){
			config.params.minP = $scope.search.minP;
		}
		if($scope.search.maxP != ""){
			config.params.maxP = $scope.search.maxP;
		}
		
		config.params.pageNum = $scope.pageNum;
		
		$http.get(baseUrl, config).then(
			function success(res){
				$scope.standovi = res.data;
				$scope.totalPages = res.headers("totalPages");
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
	
	var getSajmovi = function(){
		$http.get(baseUrlSajmovi).then(
			function success(res){
				$scope.sajmovi = res.data;
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
	
	getStandovi();
	getSajmovi();
	
	
	$scope.add = function(){
		//console.log($scope.stand);
		$http.post(baseUrl, $scope.stand).then(
				function success(res){
					getStandovi();
					$scope.stand = {};
					$scope.stand.zakupac = "";
					$scope.stand.povrsina = "";
					$scope.stand.sajamId = 0;
				},
				function error(res){
					alert("Something went wrong!");
				}
		);
	}
	
	$scope.search2 = function(){
		$scope.pageNum = 0;
		getStandovi();
	}
	
	$scope.go = function(direction){
		$scope.pageNum += direction;
		getStandovi();
	}
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
	
	$scope.deleteActivity = function(id){
		var promise = $http.delete(baseUrl + "/" + id);
		promise.then(
			function success(res){
				getActivities();
			},
			function error(res){
				alert("Something went wrong!");
			}
		)
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
		.when('/standovi', {
			templateUrl : '/app/html/standovi.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);