var express = require('express');
var router = express.Router();
var pry = require('pryjs')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
var foodsController = require('../../../controllers/foodsController')

router.get('/', foodsController.index)

router.get('/:id', foodsController.show)

router.delete('/:id', foodsController.destroy)

router.patch('/:id', foodsController.update)

router.post('/', foodsController.create)


module.exports = router;
