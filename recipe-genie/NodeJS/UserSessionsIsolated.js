
// Import needed modules 
const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');

//Imports database module 
const db = require('./database'); 

const app = express();
const port = process.env.PORT || 3308;

// Middleware to parse JSON requests
app.use(express.json());

// User Sessions setup
app.use(session({
    secret: 'thisisasecretkeyforthepurposesofgreatsecurity12345678',
    saveUninitialized: true,
    resave: true
}));

// Login route for user sessions
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const isLoggedIn = await isCorrectLogin(username, password);
        if (isLoggedIn) {
            db.get(`SELECT * FROM Users WHERE username = ?`, [username], (err, user) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                // Save user in a session
                req.session.user = user; 
                res.json({ message: 'Login successful' });
            });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check if the user is logged in for user sessions
app.get("/login-status", (req, res) => {
    if (req.session.user) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

// Logout and destroy the user session
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Function to verify user credentials
async function isCorrectLogin(username, password) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT password FROM Users WHERE username = ?`, [username], async (err, row) => {
            if (err) {
                return reject(err);
            }
            if (!row) {
                return resolve(false); // Username not found
            }
            try {
                const match = await bcrypt.compare(password, row.password);
                resolve(match);
            } catch (error) {
                reject(error);
            }
        });
    });
}

// Middleware to protect routes for user sessions
const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Export the Express app for testing
module.exports = app;
