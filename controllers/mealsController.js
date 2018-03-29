const Meal = require('../models/meal')

const index = function(req, res, next) {
  Meal.findAll()
  .then(function(meals) {
    res.json(meals)
  })
}

const show = function(req, res, next) {
  let id = req.params.id
  Meal.find(id)
  .then(function(meal) {
    res.json(meal);
  })
}

const update = function(req, res, next) {
  let mealId = req.params.mealId
  Meal.update(mealId)
  .then(function(meal) {
    res.status(201).json(meal.rows)
  })
}



module.exports = {index, show, update}
