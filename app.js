require('dotenv').config();

const DataBase = require('./Config/DataBase');
const express = require('express');
const cors = require('cors');

// Set Up Port and Make Server listen To requests
const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware to parse JSON



// ✅ حل مشكلة CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Users Routes //
const PaymentMethods_Routes = require('./Routes/Routes');
app.use('/api/v3/payment-method', PaymentMethods_Routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));