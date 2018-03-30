const Food = require('../models/food')

const index = function(req, res, next) {
  Food.findAll()
    .then(function(foods) {
     res.json(foods)
   })
 }

const show = function(req, res, next) {
  let id = req.params.id
  Food.find(id)
    .then(function(food) {
      res.json(food)
    })
}

const destroy = function(req, res, next) {
  let id = req.params.id
  Food.delete(id)
    .then(function() {
      res.status(201).send({
        status: "Delete Successful!"
    })
  })
}

const update = function(req, res, next) {
  let id = req.params.id
  let food = req.body.food
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

const create = function(req, res, next) {
  let name = req.body.food.name
  let calories = req.body.food.calories
  Food.newFood(name, calories)
    .then(function(inserted) {
      res.status(201).json(inserted)
  })
}

module.exports = {index, show, destroy, update, create}
