// Dinner controller that we use whenever we want to display detailed
// information for one dish

dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter

	$scope.dish = Dinner.Dish.get({id:$routeParams.dishId});

	$scope.getNumberOfGuests = function () {
		return Dinner.getNumberOfGuests();
	}

	$scope.addDishToMenu = function () {
		Dinner.addDishToMenu($scope.dish);
	}

	$scope.getDishPrice = function () {
		return Dinner.getPriceOfDish($scope.dish).toFixed(2);
	}

	$scope.getIngredientPrice = function (quantity) {
		return quantity.toFixed(2);
	}
});