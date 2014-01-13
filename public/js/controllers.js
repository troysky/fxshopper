var app = angular.module('fxshopperApp', []);
 
app.controller('MainCtrl', function ($scope, $http) {
	$scope.showLoading = false;
	$scope.showResult = false;
	$scope.showError = false;

	$scope.title = "FXShopper";
	$scope.amount = "10000";
	$scope.fromCcy = "AUD";
	$scope.toCcy = "USD";

	$scope.rates = [];

	$scope.getRate = function(){
		$scope.showResult = false;
		$scope.showLoading = true;
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
			$scope.showLoading = false;
			angular.forEach(data, function(model){
				model.counterAmount = parseFloat(model.rate * $scope.amount).toFixed(2);
			});
			$scope.rates = data;			
			$scope.showResult = true;
		}).error(function(data, status, headers, config){
			$scope.showResult = false;
			$scope.showLoading = false;
			$scope.showError = true;
		});		
	}

});

app.directive('loadingIndicator', function() {
    return {
    	restrict: 'E',
    	templateUrl: 'loading-indicator.html'
    };
});