// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {
	// TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

	$scope.numberOfGuests = Dinner.getNumberOfGuests();

		$scope.setNumberOfGuest = function(number){
			Dinner.setNumberOfGuests(number);
		}

		$scope.getNumberOfGuests = function() {
			return Dinner.getNumberOfGuests();
		}



  // Dinner.DishSearch.get({title_kw:'chicken'}) 
  // or to get a single dish we would do 
  // Dinner.Dish.get({id:12345}).

});