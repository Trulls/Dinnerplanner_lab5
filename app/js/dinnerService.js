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
  var selectedDishes = {};
  var currentDish = undefined;
  var dishes = [];

  //Sets the number of guests
  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  //Returns the number of guests
  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function (type) {
    return selectedDishes[type];
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
    _.each(this.selectedDishes, function (dish) {
      unitCost += dish.price;
    }, this);
    return unitCost * this.numberOfGuests;
  };

  //Adds the passed dish to the menu. If the dish of that 
  //type already exists on the menu it is removed from 
  //the menu and the new one added.
  this.addDishToMenu = function () {
    this.selectedDishes[currentDish.type] = currentDish;
  }

  //Removes dish from menu
  this.removeDishFromMenu = function (id) {
    _.reject(this.selectedDishes, function (dish) {
      return dish.id === id;
    });
  }

  this.DishSearch = $resource(
    'http://api.bigoven.com/recipes',
    {pg:1,rpp:25,api_key:'YOUR_API_KEY'}
  );

  this.Dish = $resource(
    'http://api.bigoven.com/recipe/:id',
    {api_key:'YOUR_API_KEY'}
  );

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});

// this.getAllRecipes = function (type, filter) {
  //   var apiKey = "dvx6H6QTYoSVG1J9p9BaIcf097ZInDlP";
  //   var pg = "1";
  //   var rpp = "15";
  //   var typeq = "&any_kw='" + type + "'";
  //   var filterq = "";
  //   if (filter) {
  //     filterq = "&any_kw='" + filter + "'";
  //   }
  //   var url =   "http://api.bigoven.com/recipes?api_key=" + apiKey +
  //         "&pg=" + pg + "&rpp=" + rpp + typeq + filterq;
  //   var myModel = this;

  //   $.ajax({
  //         type: "GET",
  //         dataType: 'json',
  //         cache: false,
  //         url: url,
  //         success: function (data) {
  //             //console.log("SUCCESS: ajax");
  //             var _recipes = [];
  //             for (var i=0; i<data.Results.length; i++) {
  //               var dish = data.Results[i];
  //               var recipe = {
  //           'id':dish.RecipeID,
  //           'name':dish.Title,
  //           'type':type,
  //           'image':dish.ImageURL
  //         }
  //         _recipes.push(recipe);
  //       }
  //       //console.log("Request done");
  //       dishes = _recipes;
  //       // spinner.stop();
  //       }
  //     });
  //   };

  // // Function that returns a dish of specific ID
  // this.getDish = function (id, view) {
  //   var apiKey = "dvx6H6QTYoSVG1J9p9BaIcf097ZInDlP";
  //   var url =   "http://api.bigoven.com/recipe/" + id + "?api_key=" + apiKey;
  //   var myModel = this;

  //   $.ajax({
  //         type: "GET",
  //         dataType: 'json',
  //         cache: true,
  //         url: url,
  //         success: function (data) {
  //             //console.log("SUCCESS: ajax");
  //             var dish = data;
  //             var _recipe = {
  //         'id':dish.RecipeID,
  //         'name':dish.Title,
  //         'type':dish.Category,
  //         'image':dish.ImageURL,
  //         'description':dish.Description,
  //         'instruction':dish.Instructions,
  //       }

  //       var _ingredients = [];
  //       var _totalPrice = 0;

  //       dish.Ingredients.forEach(function (ingredient) {
  //         var _quantity = ingredient.Quantity;
  //         var _price = _quantity;
  //         _totalPrice += _price;

  //         var _ingredient = {
  //           'name':ingredient.Name,
  //           'quantity':_quantity,
  //           'unit':ingredient.Unit,
  //           'price':_price
  //         }
  //         _ingredients.push(_ingredient);
  //       });

  //       _recipe.ingredients = _ingredients;
  //       _recipe.price = _totalPrice;

  //       //console.log("Request done");
  //       window.app.switchView(view);
  //       currentDish = _recipe;
  //       return _recipe;
  //           }
  //     });
  // };