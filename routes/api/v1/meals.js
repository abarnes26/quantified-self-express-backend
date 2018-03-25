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


module.exports = router;
