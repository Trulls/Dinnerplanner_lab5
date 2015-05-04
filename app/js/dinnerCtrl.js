// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu

dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	$scope.setNumberOfGuest = function (number){
		Dinner.setNumberOfGuests(number);
	}

	$scope.getNumberOfGuests = function () {
		return Dinner.getNumberOfGuests();
	}

	$scope.getFullMenu = function () {
		return Dinner.getFullMenu();
	}

	$scope.getAllIngredients = function () {
		return Dinner.getAllIngredients();
	}

	$scope.getDishPrice = function (dish) {
		return Dinner.getPriceOfDish(dish).toFixed(2);
	}
	
	$scope.getIngredientQuantity = function (quantity) {
		return (quantity * $scope.getNumberOfGuests());
	}

	$scope.getTotalMenuPrice = function () {
		return Dinner.getTotalMenuPrice().toFixed(2);
	}

	$scope.confirmableDinner = function () {
		var menu = $scope.getFullMenu();
		for (var type in menu) {
			if (hasOwnProperty.call(menu, type)) return true;
		}
		return false;
	}

});