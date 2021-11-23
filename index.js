const express = require('express')

// Instance. This is our server
const app = express()

// process.env gives access to environment variable
// Can be dangerous
// || : It'll default to the left value if it exists
const PORT = process.env.PORT || 3000;
// ALSO valid. Could add localhost as well 
const HOST = '0.0.0.0'


// We can receive JSON data from POST/PUT/PATCH etc requests
app.use(express.json());
// Same as the above, but for form data
app.use(express.urlencoded({extended: true}))

app.get('/', (request, response) => {
  response.json({message: "Today is a neat day!"})
})

// To make app listen. When server run, this block of code runs
app.listen(PORT, HOST, () => {
  console.log("Server is running")
})