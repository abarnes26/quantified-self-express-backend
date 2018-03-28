const Meal = require('../models/food')

const index = (req, res, next) => {
  Meal.findAll()
  .then(function(meals) {
    res.json(meals)
  })
}
