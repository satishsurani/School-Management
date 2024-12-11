const express = require('express'); // Importing the Express framework
const app = express(); // Creating an instance of an Express application
const port = 3000; // Setting the port number for the server
const cors = require('cors'); // Importing the CORS middleware to handle cross-origin requests
const router = require('./routes/schoolRoute'); // Importing the router for school-related routes

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Mounting the router to handle routes defined in the schoolRoute file
app.use('/', router);

// Starting the server and listening for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Log a message indicating the server is running
});
