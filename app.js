require('dotenv').config();

const DataBase = require('./Config/DataBase');
const express = require('express');

// Set Up Port and Make Server listen To requests
const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware to parse JSON

// Users Routes //
const Role_Routes = require('./Routes/Routes');
app.use('/api/v3/workout-plans', Role_Routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));