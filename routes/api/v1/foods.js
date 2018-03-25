var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

/* GET foods listing. */
router.get('/', function(req, res, next) {
  database.raw('Select * FROM foods')
  .then(function(foods) {
    res.json(foods.rows);
    })
  });

router.get('/:id', function(req, res, next) {
  var id = req.params.id
  database.raw('Select * FROM foods WHERE id = ?', id)
  .then(function(food) {
    res.json(food.rows);
    })
  });

router.delete('/:id', function(req, res, next) {
  var id = req.params.id
  database.raw('DELETE FROM foods WHERE id = ?', id)
  .then(function() {
    res.status(201).send({
      status: "Delete Successful!"
    })
  })
});

router.post('/', function(req, res, next) {
  var name = req.body.food.name
  var calories = req.body.food.calories
  database.raw('INSERT INTO foods(name, calories) VALUES (?, ?) RETURNING *',
   [name, calories])
  .then(function(inserted) {
    res.status(201).json(inserted.rows)
  })
});




module.exports = router;
