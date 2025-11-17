// تحميل dotenv بشكل صحيح
require('dotenv').config();

const mongoose = require('mongoose');




const mongoURI = process.env.MONGOURI;

if (!mongoURI) {
    console.error('❌ CRITICAL: MONGOURI is undefined!');
    console.error('💡 Please check:');
    console.error('   1. .env file exists in root directory');
    console.error('   2. .env contains MONGOURI=your_connection_string');
    console.error('   3. No typos in variable name');
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Failed:', error.message);
        process.exit(1);
    });

module.exports = mongoose;