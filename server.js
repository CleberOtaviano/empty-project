var express = require('express');
var app = express();

// Bring Mongoose into the app
var mongoose = require( 'mongoose' );
var MONGODB_HOST = process.env.MONGODB_SERVICE_HOST;
var MONGODB_PORT = process.env.MONGODB_SERVICE_PORT;
var MONGODB_DATABASE = process.env.MONGODB_DATABASE;
var MONGODB_USER = process.env.MONGODB_USER;
var MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

// Build the connection string
var dbURI = 'mongodb://AdminEstampeiroUser:EsTampeiroSenhaDB123@'+MONGODB_HOST+':'+MONGODB_PORT+'/estampeirodb';

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('CONECTADO','Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('DEU RUIM','Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('DISCONECTOU','Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
