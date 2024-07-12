//Connects the SQL database to Node.Js

// Import sqlite3 module and enable verbose mode for debugging
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
let db = new sqlite3.Database('./recipe_genie.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the recipe_genie database.');
});

// Export the database connection
module.exports = db;
