const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Imports the database connection
const db = require('./database'); 

const app = express();
// Use environment variable for port or default to 3308
const port = process.env.PORT || 3308;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Define a simple route to display the header
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>NodeJS Server</title>
            </head>
            <body>
                <h1>NodeJS Server</h1>
            </body>
        </html>
    `);
});

// Route to test the database connection by fetching all users
app.get('/test-db', (req, res) => {
    db.all(`SELECT id, username FROM Users`, [], (err, rows) => {
        if (err) {
            console.error(err);  // Log the error
            return res.status(500).json({ error: err.message });
        }
        res.json({ users: rows });
    });
});

// Route to insert a user, with password hashing
app.post('/users', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO Users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
            if (err) {
                console.error(err);  // Log the error
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
    } catch (error) {
        console.error(error);  // Log the error
        res.status(500).json({ error: error.message });
    }
});

// Route to get all users
app.get('/users', (req, res) => {
    db.all(`SELECT id, username FROM Users`, [], (err, rows) => {
        if (err) {
            console.error(err);  // Log the error
            return res.status(500).json({ error: err.message });
        }
        res.json({ users: rows });
    });
});

// Add Recipe Method
app.post('/add-recipe', (req, res) => {
    const { user_id, ingredients, result } = req.body;
    db.run(`INSERT INTO Recipes (user_id, ingredients, result) VALUES (?, ?, ?)`, [user_id, ingredients, result], function(err) {
        if (err) {
            console.error(err);  // Log the error
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Search Recipe Method
app.post('/search-recipe', (req, res) => {
    const { user_id, ingredients } = req.body;
    db.get(`SELECT * FROM Recipes WHERE user_id = ? AND ingredients = ?`, [user_id, ingredients], (err, row) => {
        if (err) {
            console.error(err);  // Log the error
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.json({ exists: true, recipe: row });
        } else {
            res.json({ exists: false });
        }
    });
});

// Return JSON String Method
app.post('/get-recipe-json', (req, res) => {
    const { user_id, ingredients } = req.body;
    db.get(`SELECT result FROM Recipes WHERE user_id = ? AND ingredients = ?`, [user_id, ingredients], (err, row) => {
        if (err) {
            console.error(err);  // Log the error
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.json({ recipe: row.result });
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    });
});

// Combined Method
app.post('/add-or-get-recipe', (req, res) => {
    const { user_id, ingredients, result } = req.body;

    db.get(`SELECT result FROM Recipes WHERE user_id = ? AND ingredients = ?`, [user_id, ingredients], (err, row) => {
        if (err) {
            console.error(err);  // Log the error
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.json({ recipe: row.result });
        } else {
            db.run(`INSERT INTO Recipes (user_id, ingredients, result) VALUES (?, ?, ?)`, [user_id, ingredients, result], function(err) {
                if (err) {
                    console.error(err);  // Log the error
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id: this.lastID });
            });
        }
    });
});

// Start the server
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    if (process.env.NODE_ENV !== 'test') {
        const open = (await import('open')).default;
        await open(`http://localhost:${port}`);
    }
});

// Export for testing purposes
module.exports = app;
