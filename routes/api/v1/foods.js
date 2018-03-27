var express = require('express');
var router = express.Router();
var pry = require('pryjs')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
var foodsController = require('../../../controllers/foodsController')

router.get('/', foodsController.index)

router.get('/:id', foodsController.show)
// 
// function(req, res, next) {
//   var id = req.params.id
//   database.raw('Select * FROM foods WHERE id = ?', id)
//   .then(function(food) {
//     res.json(food.rows[0]);
//     })
//   });

router.delete('/:id', function(req, res, next) {
  var id = req.params.id
  database.raw('DELETE FROM foods WHERE id = ?', id)
  .then(function() {
    res.status(201).send({
      status: "Delete Successful!"
    })
  })
});

router.patch('/:id', function(req, res, next) {
  var id = req.params.id
  var food = req.body.food
  if (food['name']) {
  database.raw('UPDATE foods SET name = ? WHERE id = ? RETURNING *', [food.name, id])
  .then(function(foods) {
    res.status(201).json(foods.rows[0])
    })
  // .catch(console.error(res.error))
  } else if (food['calories']) {
  database.raw('UPDATE foods SET calories = ? WHERE id = ? RETURNING *', [food.calories, id])
  .then(function(foods) {
    res.status(201).json(foods.rows[0])
    })
  // .catch(console.error(res.error))
  }
});

router.post('/', function(req, res, next) {
  var name = req.body.food.name
  var calories = req.body.food.calories
  database.raw('INSERT INTO foods(name, calories) VALUES (?, ?) RETURNING *',
   [name, calories])
  .then(function(inserted) {
    res.status(201).json(inserted.rows[0])
  })
});




module.exports = router;
