var Food = require('../models/food')

var index = function(req, res, next) {
  Food.findAll()
    .then(function(foods) {
     res.json(foods)
   })
 }

var show = function(req, res, next) {
  var id = req.params.id

  Food.find(id)
    .then(function(food) {
      res.json(food)
    })
}


module.exports = {index, show}
