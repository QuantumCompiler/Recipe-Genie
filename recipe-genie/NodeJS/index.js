const express = require('express');
const cors = require('cors');

// Imports the database connection
const db = require('./database'); 

// Example route to insert a user, with password hashing
const bcrypt = require('bcrypt');

const app = express();
//The port variable 3000 will change as we run on a a real server 
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


// Route to test the database connection by fetching all users. Tests SQLite and Node.JS.connection 
app.get('/test-db', (req, res) => {
    console.log('GET /test-db request received');
    db.all(`SELECT id, username FROM Users`, [], (err, rows) => {
        if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log('Database query successful:', rows);
        res.json({ users: rows });
    });
});

app.post('/users', async (req, res) => {
    const { username, password } = req.body;
    console.log('POST /users request received with data:', req.body);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO Users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
            if (err) {
                console.error('Database insert error:', err.message);
                return res.status(500).json({ error: err.message });
            }
            console.log('User inserted with ID:', this.lastID);
            res.status(201).json({ id: this.lastID });
        });
    } catch (error) {
        console.error('Error hashing password:', error.message);
        res.status(500).json({ error: error.message });
    }
});


// Example route to get all users
app.get('/users', (req, res) => {
    console.log('GET /users request received');
    db.all(`SELECT id, username FROM Users`, [], (err, rows) => {
        if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log('Database query successful:', rows);
        res.json({ users: rows });
    });
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    const open = (await import('open')).default;
    await open(`http://localhost:${port}`);
});

// Handle POST request from React
app.post("/post", (req, res) => {
    console.log("Connected to React!!!!!");
    console.log("Data received:", req.body);
    // res.json({ message: "Data received successfully" });
    res.send("Hello from Node!!!");
});

// Recieve Username and Password from React
// Requires input in format 

async function isCorrectLogin(username, password) {
    console.log(`Checking login for user: ${username}`);

    return new Promise((resolve, reject) => {
        db.get(`SELECT password FROM Users WHERE username = ?`, [username], async (err, row) => {
            if (err) {
                console.error('Database query error:', err.message);
                return reject(err);
            }
            if (!row) {
                console.log('Username not found:', username);
                return resolve(false); // Username not found
            }
            try {
                const match = await bcrypt.compare(password, row.password);
                console.log(`Password match for user ${username}:`, match);
                resolve(match);
            } catch (error) {
                console.error('Error comparing passwords:', error.message);
                reject(error);
            }
        });
    });
}

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const [isLoggedIn, foundUsername] = await isCorrectLogin(username, password);
        res.status(200).json([isLoggedIn, foundUsername]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});