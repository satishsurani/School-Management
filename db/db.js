const mysql = require('mysql');

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',       // Database server host (usually 'localhost' for local development)
    user: 'root',            // Username to connect to the database
    password: '',            // Password for the database user (empty in this case)
    database: 'school_management' // Name of the database to use
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err); // Log error details if connection fails
        process.exit(1); // Exit the process with an error code
    }
    console.log('Connected to MySQL database'); // Log success message if connection is successful
});

// Export the database connection for use in other parts of the application
module.exports = db;