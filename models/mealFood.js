const pry = require('pryjs')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const MealFood = {
  delete: function(meal, food) {
    return database.raw('DELETE FROM meal_foods WHERE id = any (array(SELECT id FROM meal_foods WHERE meal_id = ? and food_id = ? LIMIT 1))',[meal, food])
  },

  new: function(meal, food) {
    return database.raw('INSERT INTO meal_foods(meal_id, food_id) VALUES (?, ?) RETURNING *',
     [meal, food])
     .then(function(inserted) {
       return inserted.rows[0]
     })
  }
}

module.exports = MealFood
