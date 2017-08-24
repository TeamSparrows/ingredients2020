const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../config');
const ingredientsSchema = mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true }
}, {collection: 'Ingredients'});

const Ingredient = mongoose.model('Ingredient', ingredientsSchema);

module.exports = Ingredient;
