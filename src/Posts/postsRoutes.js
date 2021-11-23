const express = require('express')


// Express has router options
const routes = express.Router()

// To run a router, it must be attached to app
// In router, we are just saying forward slash /
// '/' Home page
routes.get('/', (request, response) => {

  // We are accessiong data from request
  response.json(`Received a request on ${request.originalUrl}`);
})

// This is a route parameter
// THIS param can be used as variable
// Nested dynamci
routes.get('/:postID', (request, response) => {
  response.json(`Route param was ${request.params.postID}`)
})

// Indicates this is a post request
// Will need POSTMAN for this
routes.post('/:postID', (request, response) => {
  let submittedData = request.body
  // We will need to check terminal to see what terminal is logging
  console.log(JSON.stringify(submittedData))
  // response.json(`Received POST request with these params: ${request.params.postID}`)

  let submittedName = request.body.name.toUpperCase();
  submittedName += submittedName;

  response.json(`Received name of ${request.body.name} and hair length that is ${request.body.hair}`)

  
})


// NESTER ROUTES
// routes.get('/:username/status/:postID', (request, response) => {
//   response.json(`Route param was ${request.params.postID}`)
// })


module.exports = routes

// How can we use this in our server