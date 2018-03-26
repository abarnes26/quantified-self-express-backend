var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

/* GET meals listing. */
router.get('/', function(req, res, next) {
  database.raw('Select * FROM meals')
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

  //lookup array agg

router.get('/:mealid/foods/', function(req, res, next) {
  var meal = req.params.mealid
  database.raw('SELECT foods.* FROM foods INNER JOIN meal_foods ON meal_foods.food_id = foods.id WHERE meal_foods.meal_id = ?',
   meal)
  .then(function(meal) {
    res.status(201).json(meal.rows)
  })
});

router.delete('/:mealid/foods/:foodid', function(req, res, next) {
  var meal = req.params.mealid
  var food = req.params.foodid
  database.raw('DELETE FROM meal_foods WHERE meal_id = ? AND food_id = ?',
   [meal, food])
   .then(function() {
     res.status(201).send({
       status: "Delete Successful!"
     })
   })
});

router.post('/:mealid/foods/:foodid', function(req, res, next) {
  var meal = req.params.mealid
  var food = req.params.foodid
  database.raw('INSERT INTO meal_foods(meal_id, food_id) VALUES (?, ?) RETURNING *',
   [meal, food])
  .then(function(inserted) {
    res.status(201).json(inserted.rows)
  })
});



module.exports = router;
