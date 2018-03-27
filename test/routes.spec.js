var pry = require('pryjs')
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');
const environment   = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database      = require('knex')(configuration)

chai.use(chaiHttp);

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  });

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  });

  describe('Client Routes', () => {
    it('should return the home page with text', () => {
      return chai.request(server)
      .get('/')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.html;
      })
      .catch((error) => {
        throw error;
      });
    });

    it('should return a 404', () => {
      return chai.request(server)
      .get('/sad')
      .then((response) => {
        response.should.have.status(404)
      })
      .catch((error) => {
        throw error
      })
    })
  });

  describe('GET /api/v1/meals', () => {
    it('should return a list of all meals', () => {
      return chai.request(server)
        .get('/api/v1/meals')
        .then((response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(4);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal("Breakfast");
          response.body[0].should.have.property('foods');
          response.body[0].foods.length.should.equal(2)
        })
        .catch((error) => {
          throw error;
        });
    });
  })
  describe('GET /api/v1/meals/1', () => {
    it('should return a single meal', () => {
      return chai.request(server)
        .get('/api/v1/meals/1')
        .then((response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.an('object')
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
          response.body.should.have.property('name');
          response.body.name.should.equal("Breakfast");
          response.body.should.have.property('foods');
          response.body.foods.length.should.equal(2)
        })
        .catch((error) => {
          throw error;
        });
    });
  })

  describe('GET /api/v1/foods', () => {
    it('should return a list of all the foods', () => {
      return chai.request(server)
        .get('/api/v1/foods')
        .then((response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.an('array')
          response.body.length.should.equal(13);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal("Banana");
          response.body[0].should.have.property('calories');
          response.body[0].calories.should.equal(150)
        })
        .catch((error) => {
          throw error;
        });
    });
  })

  describe('GET /api/v1/foods/1', () => {
    it('should return a single food', () => {
      return chai.request(server)
        .get('/api/v1/foods/1')
        .then((response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.an('object')
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
          response.body.should.have.property('name');
          response.body.name.should.equal("Banana");
          response.body.should.have.property('calories');
          response.body.calories.should.equal(150)
        })
        .catch((error) => {
          throw error;
        });
    });
  })

  describe('POST /api/v1/foods', () => {
    it('should add a food', () => {
      return chai.request(server)
        .post('/api/v1/foods')
        .send({
          food:{
          name: "Chocolate Cake",
          calories: 350
          }
        })
        .then((response) => {
          response.should.have.status(201);
          response.body.should.be.an('object')
          response.body.should.have.property('id')
          response.body.id.should.equal(14)
          response.body.should.have.property('name')
          response.body.name.should.equal("Chocolate Cake")
          response.body.should.have.property('calories')
          response.body.calories.should.equal(350)
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe('POST a food to a meal', () => {
    it('should add a food to specified meal', () => {
      return chai.request(server)
        .post('/api/v1/meals/1/foods/3')
        .then((response) => {
          response.should.have.status(201);
          response.body.should.be.an('object')
          response.body.should.have.property('id')
          response.body.id.should.equal(9)
          response.body.should.have.property('meal_id')
          response.body.meal_id.should.equal(1)
          response.body.should.have.property('food_id')
          response.body.food_id.should.equal(3)
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe('PATCH a food name', () => {
    it('should update the food name', () => {
      return chai.request(server)
        .patch('/api/v1/foods/1')
        .send({
          food:{
          name: "Vanilla Cake"
          }
        })
        .then((response) => {
          response.should.have.status(201);
          response.body.should.be.an('object')
          response.body.should.have.property('id')
          response.body.id.should.equal(1)
          response.body.should.have.property('name')
          response.body.name.should.equal("Vanilla Cake")
          response.body.should.have.property('calories')
          response.body.calories.should.equal(150)
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe('PATCH a food calories', () => {
    it('should update the food calories', () => {
      return chai.request(server)
        .patch('/api/v1/foods/1')
        .send({
          food:{
          calories: 5000
          }
        })
        .then((response) => {
          response.should.have.status(201);
          response.body.should.be.an('object')
          response.body.should.have.property('id')
          response.body.id.should.equal(1)
          response.body.should.have.property('name')
          response.body.name.should.equal("Banana")
          response.body.should.have.property('calories')
          response.body.calories.should.equal(5000)
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe('DELETE a food', () => {
    it('should delete the food and send back a confirmation', () => {
      return chai.request(server)
        .delete('/api/v1/foods/10')
        .then((response) => {
          response.should.have.status(201);
          response.body.should.be.an('object')
          response.body.should.have.property('status')
          response.body.status.should.equal("Delete Successful!")
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe('DELETE a food from a meal', () => {
    it('should delete the food and send back a confirmation', () => {
      return chai.request(server)
        .delete('/api/v1/meals/1/foods/1')
        .then((response) => {
          response.should.have.status(201);
          response.body.should.be.an('object')
          response.body.should.have.property('status')
          response.body.status.should.equal("Delete Successful!")
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  // //
  //   it('should not add a secret if message is not provided', () => {
  //     return chai.request(server)
  //       .post('/api/secrets')
  //       .send({})
  //       .then((response) => {
  //         response.should.have.status(422);
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  //   });
  // });
});
