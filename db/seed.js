const ingredientsData = require('./db');
const Ingredient = require('./models/ingredients');
const User = require('./models/users');

User.remove({}, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User Table Cleared');
  }
});

Ingredient.remove({}, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Ingredient Table Cleared');
  }
});

ingredientsData.forEach((ing) => {
  Ingredient.create(ing);
})
