const express = require('express');
const router = express.Router();
const pry = require('pryjs')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
const foodsController = require('../../../controllers/foodsController')

router.get('/', foodsController.index)

router.get('/:id', foodsController.show)

router.delete('/:id', foodsController.destroy)

router.patch('/:id', foodsController.update)

router.post('/', foodsController.create)


module.exports = router;
