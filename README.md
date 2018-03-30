# quantified-self-express-backend

This API is a companion to a [front end](https://github.com/BLaurenB/quantified-self) built with JQuery and Javascript.  The project itself is a tool for calorie consumption tracking over the course of a day.  The intent was to gain experience in building a RESTful API using Express with Knex for database queries.

## Getting Started

To get started, clone this repo and from inside the parent directory run 

```
npm install
```

## Running the tests
The program has a supporting test structure using Mocha and Chai libraries for all endpoints.  To set up the tests, run the following commands from inside the directory -

```
$ npm install -D mocha chai
$ npm install -D https://github.com/chaijs/chai-http#3ea4524
```

Once installation is complete, run the tests using 

```
$ NODE_ENV=test mocha --exit
```

## Live Version

A current version of this repository is hosted on Heroku [here](https://qs-backend-express.herokuapp.com/). For best results use a program such as [Postman Rest Client](https://www.getpostman.com/) to send requests. All responses are in JSON format.

## Sample API Queries

### Endpoints

#### Meal

```GET /api/v1/meals``` returns a collection of all meals and their associated foods

```GET /api/v1/meals/:id/``` returns a specific meal and its associated foods

```POST /api/v1/meals/:id/foods/:id``` adds the specified food to the specified meal

```DELETE /api/v1/meals/:id/foods/:id``` removes the specified food from the specified meal

#### Foods

```GET /api/v1/foods``` returns a collection of all foods in the database

```GET /api/v1/foods/:id``` returns a single food item

```POST /api/v1/foods/``` creates a new food item. The new attributes should be passed in nested under the key "food".  I.e. (/api/v1/foods/1?food[name]=example&food[calories]=400)

```PATCH /api/v1/foods/:id``` updates the attribute of a specified food.  The new attribute should be passed in nested under the key "food".  I.e. (/api/v1/foods/1?food[name]=example)

```DELETE /api/v1/foods/:id``` removed the specified food from the database

## Built With

* [Express](https://expressjs.com/) - The JavaScript framework used
* [PostgreSQL](https://www.postgresql.org/) - Object-Relational Database Management System
* [Knex](http://knexjs.org/) - Used to build queries and interact with the database

## Authors

* **Alex Barnes** - [github](https://github.com/abarnes26)
* **Lauren Billington** - [github](https://github.com/BLaurenB)


