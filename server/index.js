const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");

//connecting db
dotenv.config();
connectDB();

//app essentials
const app = express();
app.use(cors());
app.use(express.json());

//listenign port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log("http://localhost:5000/")
});


//app routes
app.get('/', (req, res) => {
    res.send('GameRadar API running')
});

//login requests
app.use("/api/auth", authRoutes);

//game data
app.use("/api/games", gameRoutes);