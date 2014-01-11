var app = angular.module('fxshopperApp', []);
 
app.controller('MainCtrl', function ($scope, $http) {
	$scope.showResult = false;
	$scope.showError = false;

	$scope.title = "FXShopper";
	$scope.amount = "10000";
	$scope.fromCcy = "AUD";
	$scope.toCcy = "USD";

	$scope.rates = [];

	$scope.getRate = function(){
		$http({
			url: '/collectRates', 
		    method: "GET",
		    params: {
		    	fromCcy: $scope.fromCcy,
		    	toCcy: $scope.toCcy,
		    	amount: $scope.amount
		    }			
		}).success(function(data, status, headers, config) {
			$scope.showError = false;			
			angular.forEach(data, function(model){
				model.counterAmount = parseFloat(model.rate * $scope.amount).toFixed(2);
			});
			$scope.rates = data;
			$scope.showResult = true;
		}).error(function(data, status, headers, config){
			$scope.showResult = false;
			$scope.showError = true;
		});		
	}

});