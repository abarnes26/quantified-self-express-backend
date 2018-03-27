pry = require('pryjs')

const foodsData = require('../../../data/foods')
const mealsData = require('../../../data/meals')
const mealFoodsData = require('../../../data/meal_foods')

exports.seed = function(knex, Promise) {
  return knex('meal_foods').del()
    .then(() => {
      return knex('meals').del();
    })
    .then(() => {
      return knex('foods').del();
    })
    // .then(() => {
    //   knex.raw('SET FOREIGN_KEY_CHECKS = 0; TRUNCATE meal_foods; TRUNCATE meals; TRUNCATE foods; SET FOREIGN_KEY_CHECKS = 1;')
    // })
    .then(() => {
      return knex('foods').insert(foodsData)
    })
    .then(() => {
      return knex('meals').insert(mealsData)
    })
    .then(() => {
      return knex('meal_foods').insert(mealFoodsData)
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

  // 'SELECT foods.id FROM foods ORDER BY random() LIMIT 1;')


const createMealFood = (knex, meal, foodId) => {
  return knex('meals').where('name', meal.name).first()
  .then((mealRecord) => {
    return knex('meal_foods').insert({
      food_id: foodId,
      meal_id: mealRecord.id
    })
  })
}
