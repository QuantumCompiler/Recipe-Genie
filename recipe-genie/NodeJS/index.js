const express = require('express');
const cors = require('cors');

// Imports the database connection
const db = require('./database'); 

const app = express();
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

// Example route to insert a user, with password hashing
const bcrypt = require('bcrypt');

app.post('/users', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO Users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Example route to get all users
app.get('/users', (req, res) => {
    db.all(`SELECT id, username FROM Users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ users: rows });
    });
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    const open = (await import('open')).default;
    await open(`http://localhost:${port}`);
});