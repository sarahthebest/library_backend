require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  

const book_routes = require("./routes/book_routes");
const health_route = require("./routes/health_route");
const auth_routes = require("./routes/auth_routes");

const app = express();

app.use(cors({
    origin: 'http://localhost:5001'
    // methods: ['GET', 'POST'], 
    // allowedHeaders: ['Content-Type'], 
}));  

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

// Book routes
app.use("/api/books", book_routes);

// Health route
app.use("/api", health_route); 

// Auth routes
app.use("/api/auth", auth_routes); 


module.exports = app;
