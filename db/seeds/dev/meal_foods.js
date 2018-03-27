pry = require('pryjs')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
const foodsData = require('../../../data/foods')
const mealsData = require('../../../data/meals')
const mealFoodsData = require('../../../data/meal_foods')

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals, foods RESTART IDENTITY CASCADE')
  .then(() => {
    return knex.raw('TRUNCATE meal_foods RESTART IDENTITY');
  })
  .then(() => {
    return knex('foods').insert(foodsData)
  })
  .then(() => {
    return knex('meals').insert(mealsData)
  })
  .then(() => {
    return knex('meal_foods').insert(mealFoodsData)
  })
}
//
// const createMealFood = (knex, meal, foodId) => {
//   return knex('meals').where('name', meal.name).first()
//   .then((mealRecord) => {
//     return knex('meal_foods').insert({
//       food_id: foodId,
//       meal_id: mealRecord.id
//     })
//   })
// }
