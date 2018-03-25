const foodsData = require('../../../data/foods')
const mealsData = require('../../../data/meals')

exports.seed = function(knex, Promise) {
  return knex('meals').del()
    .then(() => {
      return knex('foods').del();
    })
    .then(() => {
      return knex('foods').insert(foodsData)
    })
    .then(() => {
      return knex('meals').insert(mealsData)
    })
}
