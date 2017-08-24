const ingredientsData = require('./db');
const Ingredient = require('./models/ingredients');
console.log('Ingredient', Ingredient);
const User = require('./models/users');
console.log('User', User);

// console.log('ingredientsData', ingredientsData)
User.remove({}, (err) => {
  if (err) {
    console.error(err);
  }
    console.log('User Table Cleared');

});

Ingredient.remove({}, (err) => {
  if (err) {
    console.error(err);
  }
    console.log('Ingredient Table Cleared');

});



ingredientsData.forEach((ing) => {
  Ingredient.create(ing);
})
