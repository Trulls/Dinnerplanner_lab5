// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details
  
  var numberOfGuest = 4;
  var menu = {};
  var dishes = [];

  //Sets the number of guests
  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  //Returns the number of guests
  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }

  //Returns the dish that is on the menu for selected category 
  this.getSelectedDish = function (category) {
    return menu[category];
  };

  //Returns all the dishes on the menu.
  this.getFullMenu = function () {
    return dishes;
  };

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function () {
    ingredients = [];
    dishes.forEach(function (dish) {
      ingredients.push(_.pluck(dish.ingredients, 'name'));
    });
    return _.uniq(_.flatten(ingredients));
  };

  //Returns the total price of the menu (all the 
  //ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function () {
    var unitCost = 0;
    _.each(this.menu, function (dish) {
      unitCost += dish.price;
    }, this);
    return unitCost * this.numberOfGuests;
  };

  //Adds the passed dish to the menu. If the dish of that 
  //category already exists on the menu it is removed from 
  //the menu and the new one added.
  this.addDishToMenu = function (dish) {
    console.log(dish);
    console.log(dish.Category);
    menu[dish.Category] = dish;
    console.log(menu);
  }

  //Removes dish from menu
  this.removeDishFromMenu = function (id) {
    _.reject(this.menu, function (dish) {
      return dish.id === id;
    });
  }

  this.DishSearch = $resource(
    'http://api.bigoven.com/recipes',
    {pg:1,rpp:25,api_key:'dvx6H6QTYoSVG1J9p9BaIcf097ZInDlP'}
  );

  this.Dish = $resource(
    'http://api.bigoven.com/recipe/:id',
    {api_key:'dvx6H6QTYoSVG1J9p9BaIcf097ZInDlP'}
  );

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});