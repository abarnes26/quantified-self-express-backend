const express = require('express');
const router = express.Router();
const pry = require('pryjs')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
const mealsController = require('../../../controllers/mealsController')

/* GET meals listing. */
router.get('/', mealsController.index)
router.get('/:id', mealsController.show)
router.get('/:mealId/foods/', mealsController.update)




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
