//index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended: true }));

//Basic route for testing
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to MyBrokeLife API',
        status : 'running'
    });
});

//TODO: Add routes here later
//app.use('/api/auth', require('./routes/auth));
//app.use('/api/categories', require('./routes/categories'));

//Start server
async function startServer () {
    await connectDB();
    app.listen(PORT, () => {
        console.log('Server is running on port ${PORT}');
    });
}

startServer();