// Setup .env variables
require('dotenv').config()

console.log(`Env variable message was:\n ${process.env.NICE_MESSAGE}`)

const express = require('express')

// Instance. This is our server
const app = express()

// process.env gives access to environment variable
// Can be dangerous
// || : It'll default to the left value if it exists
const PORT = process.env.PORT || 3000;
// ALSO valid. Could add localhost as well 
const HOST = '0.0.0.0'

const firebaseAdmin = require('firebase-admin');
// Once we require, we can initialize
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))
})


// We can receive JSON data from POST/PUT/PATCH etc requests
// use : changes things
app.use(express.json());
// Same as the above, but for form data
app.use(express.urlencoded({extended: true}))


// Server listens to request

// We can add more routes
app.get('/', (request, response) => {
  response.json({message: "Today's date: Tuesday 23 Nov"})
})

// Should be added before app.listen
// We tell the server we are using that router, on this specific prefix of url
const importedPostRouting = require('./Posts/postsRoutes')
app.use('/posts', importedPostRouting)

const importedUserRouting = require('./Users/userRoutes');
app.use('/Users', importedUserRouting)


// To make app listen. When server run, this block of code runs
app.listen(PORT, HOST, () => {
  console.log("Server is running")
})