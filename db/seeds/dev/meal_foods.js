pry = require('pryjs')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
const foodsData = require('../../../data/foods')
const mealsData = require('../../../data/meals')

exports.seed = function(knex, Promise) {
  return knex('meal_foods').del()
    .then(() => {
      return knex('meals').del();
    })
    .then(() => {
      return knex('foods').del();
    })
    .then(() => {
      knex.raw('TRUNCATE TABLE foods CASCADE')
    })
    .then(() => {
      return knex('foods').insert(foodsData)
    })
    .then(() => {
      return knex('meals').insert(mealsData)
    })
    // .then(() => {
    //   return knex('meal_foods').del()
    // })
    // .then(() => {
    //   let mealFoodsData = []
    //   mealsData.forEach((meal) => {
    //     let foodId = knex('foods').select('id').orderBy('random()');
    //     mealFoodsData.push(createMealFood(knex, meal, foodId))
    //   })
    //   return Promise.all(mealFoodsData)
    // })
  }

const createMealFood = (knex, meal, foodId) => {
  return knex('meals').where('name', meal.name).first()
  .then((mealRecord) => {
    return knex('meal_foods').insert({
      food_id: foodId,
      meal_id: mealRecord.id
    })
  })
}
