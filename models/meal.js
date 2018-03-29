const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)


const Meal = {

  findAll: function() {
    return database.raw("SELECT meals.*, array_agg(json_build_object('id',foods.id,'name',foods.name, 'calories', foods.calories)) AS foods FROM meals LEFT JOIN meal_foods ON meals.id = meal_foods.meal_id LEFT JOIN foods ON meal_foods.food_id = foods.id GROUP BY meals.id")
    .then(function(meals) {
      return meals.rows
    })
   },

  find: function(id) {
    return database.raw("SELECT meals.*, array_agg(json_build_object('id',foods.id,'name',foods.name, 'calories', foods.calories)) AS foods FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON meal_foods.food_id = foods.id WHERE meals.id = ? GROUP BY meals.id", id)
    .then(function(meal) {
      return meal.rows[0]
    })
   },

  update: function(mealId) {
    return database.raw('SELECT foods.* FROM foods INNER JOIN meal_foods ON meal_foods.food_id = foods.id WHERE meal_foods.meal_id = ?', meal)
  }


}

module.exports = Meal
