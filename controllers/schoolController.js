// Importing the database connection
const db = require('../db/db');
const calculateDistance = require('../utilis/calculateDistance');

// Function to add a new school
const addSchool = async(req, res) => {
    try {
        // Extracting values from the request body
        const { name, address, latitude, longitude } = req.body;

        // Validating input fields
        if (!name || !address || latitude == null || longitude == null) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Ensuring latitude and longitude are of type 'number'
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
        }

        // SQL query to insert the new school into the database
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';

        // Executing the query using the database connection
        db.query(query, [name, address, latitude, longitude], (err, result) => {
            if (err) {
                console.error('Database Error:', err); // Log error for debugging
                return res.status(500).json({ error: 'Failed to add school', details: err.message });
            }

            // Responding with success message and the ID of the newly added school
            res.status(201).json({ message: 'School added successfully', id: result.insertId });
        });
    } catch (error) {
        console.error('Error adding school:', error); // Catching and logging any unexpected errors
    }
};

// Function to list schools sorted by proximity to a given location
const listSchools = (req, res) => {
    try {
        // Extracting latitude and longitude from the query parameters
        const { latitude, longitude } = req.query;

        // Validating latitude and longitude inputs
        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const userLatitude = parseFloat(latitude); // Parsing latitude to a float
        const userLongitude = parseFloat(longitude); // Parsing longitude to a float

        // Ensuring parsed values are valid numbers
        if (isNaN(userLatitude) || isNaN(userLongitude)) {
            return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
        }

        // SQL query to fetch all schools from the database
        const query = 'SELECT * FROM schools';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Database Error:', err); // Log error for debugging
                return res.status(500).json({ error: 'Failed to fetch schools', details: err.message });
            } 

            // Calculating the distance of each school from the user and sorting by distance
            const sortedSchools = results.map(school => {
                const distance = calculateDistance(userLatitude, userLongitude, school.latitude, school.longitude);
                return { ...school, distance }; // Adding distance to the school object
            }).sort((a, b) => a.distance - b.distance); // Sorting schools by distance (ascending)

            // Responding with the sorted list of schools
            res.status(200).json(sortedSchools);
        });
    } catch (error) {
        console.error(error); // Catching and logging any unexpected errors
    }
}

// Exporting the functions so they can be used in other parts of the application
module.exports = { addSchool, listSchools };