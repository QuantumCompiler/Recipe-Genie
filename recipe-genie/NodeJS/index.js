const express = require('express');
const cors = require('cors');

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