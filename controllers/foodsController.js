var Food = require('../models/food')

var index = function(req, res, next) {
  Food.findAll()
    .then(function(foods) {
     res.json(foods)
   })
 }

var show = function(req, res, next) {
  var id = req.params.id
  Food.find(id)
    .then(function(food) {
      res.json(food)
    })
}

var destroy = function(req, res, next) {
  var id = req.params.id
  Food.delete(id)
    .then(function() {
      res.status(201).send({
        status: "Delete Successful!"
    })
  })
}

var update = function(req, res, next) {
  var id = req.params.id
  var food = req.body.food
  if (food['name']) {
  Food.updateName(food.name, id)
    .then(function(foods) {
    res.status(201).json(foods)
    })
  } else if (food['calories']) {
  Food.updateCalories(food.calories, id)
    .then(function(foods) {
    res.status(201).json(foods)
    })
  }
}

var create = function(req, res, next) {
  var name = req.body.food.name
  var calories = req.body.food.calories
  Food.newFood(name, calories)
    .then(function(inserted) {
      res.status(201).json(inserted)
  })
}

module.exports = {index, show, destroy, update, create}
