var mongoose = require('mongoose');
// var mongoURI = 'mongodb://localhost:27017/movieDB';
var mongoURI = 'mongodb://dbmaster:12345@ds155820.mlab.com:55820/moviedb';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('Mongo Connection Error: ' + err);
});

MongoDB.once('open', function(){
  console.log('Connected to Mongo');
});

module.exports = MongoDB;
