var express = require('express');
var router = express.Router();
var pry = require('pryjs')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

/* GET meals listing. */
router.get('/', function(req, res, next) {
     let food_collection = []
     return database.raw('Select * FROM meals')
      .then(function(meals) {
        meals.rows.forEach(function(row) {
          food_collection.push({id: row.id, name: row.name, food: []})
          // food_collection[0].food
          // => []
        })
        for (i = 0; i < 4; i++) {
          eval(pry.it)
          food_collection[i].food.push(meal_foods_lookup(food_collection[i].id))
      }
    })
    .catch(function(error) {
      console.error(error)
    })
    res.json(food_collection);
  })

const meal_foods_lookup = (mealId) => {
  return database.raw('SELECT foods.* FROM foods INNER JOIN meal_foods ON meal_foods.food_id = foods.id WHERE meal_foods.meal_id = ?',
     mealId)
  .then(function(mealFoods) {
    return Promise.resolve(mealFoods.rows)
  })
  .catch(function(error) {
    console.error(error)
  })
  }


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
