const app = require('express')();
const mongoose = require('mongoose');
const carRoutes = require('./routes/cars');
const userRoutes = require('./routes/user');
const auth = require('./middleware/auth');

//configure dotenv file
require('dotenv').config();

//connect to database
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
.then(response => console.log('Connected to database...'))
.catch(error => console.log('Could not connected to database...'));

//use express.json to get front end data
app.use(require('express').json());

//setup the routes
app.use('/api/car', auth, carRoutes);
app.use('/api/user', userRoutes);

//create the server on port 1263
app.listen(process.env.PORT_NUMBER , () => {
    console.log(`Server has started on port ${process.env.PORT_NUMBER}`);
});