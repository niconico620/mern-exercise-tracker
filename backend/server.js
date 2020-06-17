//require all the dependencies we're gonna need
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//this configures so we can have our environment variables in a .env file
require('dotenv').config();

//this is how we're going to create our express server
const app =  express();
const port = process.env.port || 5000;

//our middleware. this will allow us to parse jason.
app.use(cors());
app.use(express.json());

//get the uri from the env file (from mongodb) then connect through mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParse: true, useCreateIndex: true});
//connect
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('MongoDB database connection established successfully.');
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//it is what starts the server
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})