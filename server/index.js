const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

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
});


//app routes
app.get('/', (req, res) => {
    res.send('GameRadar API running')
});
