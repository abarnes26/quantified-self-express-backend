var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

/* GET meals listing. */
router.get('/', function(req, res, next) {
  database.raw("Select meals.*, array_agg(json_build_object('id',foods.id,'name',foods.name, 'calories', foods.calories)) AS foods FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON meal_foods.food_id = foods.id GROUP BY meals.id;")
  .then(function(meals) {
    res.json(meals.rows);
    })
  });

router.get('/:id', function(req, res, next) {
  var id = req.params.id
  database.raw('Select * FROM meals WHERE id = ?', id)
  .then(function(meals) {
    res.json(meals.rows);
    })
  });


module.exports = router;




// Select meals.*, array_agg(json_build_object('id',foods.id,'name',foods.name, 'calories', foods.calories)) AS foods FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON meal_foods.food_id = foods.id GROUP BY meals.id;
