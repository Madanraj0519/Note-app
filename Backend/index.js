require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;


const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.ConnectionString)
.then(() => console.log("Database connection established successfully"))
.catch((err) => console.log(err));

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const { authRoute } = require("./route/auth.route");
const { noteRoute } = require("./route/note.route");

app.use(express.json());

app.use(cors({
    origin:"*",
}));


app.get("/", (req, res) => {
    res.json({ data : "hello world"});
});


app.use('/api/auth', authRoute );
app.use('/api/note', noteRoute);

app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
});

module.exports = app;