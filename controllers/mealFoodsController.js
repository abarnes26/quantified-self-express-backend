var MealFood = require('../models/mealFood')
var pry = require('pryjs')


var destroy = function(req, res, next) {
  var meal = req.params.mealId
  var food = req.params.foodId
  MealFood.delete(meal, food)
    .then(function() {
      res.status(201).send({
      status: "Delete Successful!"
       })
    })
}

var create = function(req, res, next) {
  var meal = req.params.mealId
  var food = req.params.foodId
  MealFood.new(meal, food)
  .then(function(inserted) {
    res.status(201).json(inserted)
  })
}

module.exports = {destroy, create}
