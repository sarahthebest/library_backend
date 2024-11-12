require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const book_routes = require("./routes/book_routes");
const app = express();

app.use(express.json());
app.use(cors);

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api/books", book_routes);

module.exports = app;
