const MealFood = require('../models/mealFood')
const pry = require('pryjs')


const destroy = function(req, res, next) {
  let meal = req.params.mealId
  let food = req.params.foodId
  MealFood.delete(meal, food)
    .then(function() {
      res.status(201).send({
      status: "Delete Successful!"
       })
    })
}

const create = function(req, res, next) {
  let meal = req.params.mealId
  let food = req.params.foodId
  MealFood.new(meal, food)
  .then(function(inserted) {
    res.status(201).json(inserted)
  })
}

module.exports = {destroy, create}
