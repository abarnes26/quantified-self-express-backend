const express = require('express');
const router = express.Router();
const pry = require('pryjs')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

const mealsController = require('../../../controllers/mealsController')
var mealFoodsController = require('../../../controllers/mealFoodsController')


/* GET meals listing. */
router.get('/', mealsController.index)
router.get('/:id', mealsController.show)
router.delete('/:mealId/foods/:foodId', mealFoodsController.destroy)
router.post('/:mealId/foods/:foodId', mealFoodsController.create)

module.exports = router;
