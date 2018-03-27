const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const Food = {
  findAll: function() {
    return database.raw('Select * FROM foods')
  .then(function(foods) {
    return foods.rows
    })
  },

  find: function(id) {
    return database.raw('Select * FROM foods WHERE id = ?', id)
    .then(function(food) {
      return food.rows[0]
      })
  },

  delete: function(id) {
    return database.raw('DELETE FROM foods WHERE id = ?', id)
  }
}

module.exports = Food
