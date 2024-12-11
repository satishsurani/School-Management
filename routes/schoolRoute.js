const express = require('express'); // Importing the Express framework
const { addSchool, listSchools } = require('../controllers/schoolController'); // Importing controller functions for handling routes
const router = express.Router(); // Creating a router instance

// Route to add a new school
// POST /addSchool - Calls the addSchool function in the controller to handle the request
router.post('/addSchool', addSchool);

// Route to list schools sorted by proximity
// GET /listSchools - Calls the listSchools function in the controller to handle the request
router.get('/listSchools', listSchools);

// Exporting the router to make it available for use in other parts of the application
module.exports = router;
