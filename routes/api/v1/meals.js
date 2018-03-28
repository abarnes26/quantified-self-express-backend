const express = require('express');
const router = express.Router();
const pry = require('pryjs')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
const mealsController = require('../../../controllers/mealsController')

/* GET meals listing. */
router.get('/', mealsController.index)
  // database.raw("SELECT meals.*, array_agg(json_build_object('id',foods.id,'name',foods.name, 'calories', foods.calories)) AS foods FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON meal_foods.food_id = foods.id GROUP BY meals.id;")
  // .then(function(meals) {
  //   res.json(meals.rows);
  // })


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




///////////////////////////////////////////
router.delete('/:mealId/foods/:foodId', function(req, res, next) {
  var meal = req.params.mealId
  var food = req.params.foodId
  database.raw('DELETE FROM meal_foods WHERE meal_id = ? AND food_id = ?',
   [meal, food])
   .then(function() {
     res.status(201).send({
       status: "Delete Successful!"
     })
   })
});

router.post('/:mealId/foods/:foodId', function(req, res, next) {
  var meal = req.params.mealId
  var food = req.params.foodId
  database.raw('INSERT INTO meal_foods(meal_id, food_id) VALUES (?, ?) RETURNING *',
   [meal, food])
  .then(function(inserted) {
    res.status(201).json(inserted.rows[0])
  })
});



module.exports = router;
