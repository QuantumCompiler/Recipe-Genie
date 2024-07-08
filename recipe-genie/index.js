//We import express for use
const express = require("express");
//Allow cross-origin resource sharing
const cors = require("cors");
//We initialilze the express app
const app =  express();
app.use(cors);
//Local port to host the web application. Stick with 3308
const port = process.env.port || 3308;
//Initialize web app on specified port
app.listen(port, () =>
    console.log('Example app listening at local port of http://localhost:%d', port)
);
