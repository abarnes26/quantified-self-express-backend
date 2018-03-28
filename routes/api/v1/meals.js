var express = require('express');
var router = express.Router();
var pry = require('pryjs')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
var mealFoodsController = require('../../../controllers/mealFoodsController')


/* GET meals listing. */
router.get('/', function(req, res, next) {
  database.raw("SELECT meals.*, array_agg(json_build_object('id',foods.id,'name',foods.name, 'calories', foods.calories)) AS foods FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON meal_foods.food_id = foods.id GROUP BY meals.id;")
  .then(function(meals) {
    res.json(meals.rows);
  })
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id
  database.raw("SELECT meals.*, array_agg(json_build_object('id',foods.id,'name',foods.name, 'calories', foods.calories)) AS foods FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON meal_foods.food_id = foods.id WHERE meals.id = ? GROUP BY meals.id", id)
  .then(function(meals) {
    res.json(meals.rows[0]);
    })
  });


router.get('/:mealId/foods/', function(req, res, next) {
  var meal = req.params.mealId
  database.raw('SELECT foods.* FROM foods INNER JOIN meal_foods ON meal_foods.food_id = foods.id WHERE meal_foods.meal_id = ?',
   meal)
  .then(function(meal) {
    res.status(201).json(meal.rows)
  })
});

router.delete('/:mealId/foods/:foodId', mealFoodsController.destroy)

router.post('/:mealId/foods/:foodId', mealFoodsController.create)


module.exports = router;
