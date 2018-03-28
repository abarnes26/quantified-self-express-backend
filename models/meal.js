const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)


const Meal = {

  findAll: function() {
     return database.raw("SELECT meals.*, array_agg(json_build_object('id',foods.id,'name',foods.name, 'calories', foods.calories)) AS foods FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON meal_foods.food_id = foods.id GROUP BY meals.id;")
     .then(function(meals) {
       return meals.rows
     })
   }


}

module.exports = {findAll}
