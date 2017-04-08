var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
  Title : String,
  Year : String,
  Genre : String,
  Director: String,
  Actors: String,
  Plot: String,
  Poster: String
});

var Movie = mongoose.model('movie', MovieSchema, 'movies');

// gets favorite movies saved to the database
router.get('/', function(req,res){
  console.log("/favorites get route hit");
  Movie.find({},function(err,allMovies) {
    if(err) {
      console.log('Mongo error: ',err);
    }
    res.send(allMovies);
  });
});

// saves a favorite movie into the database
router.post('/', function(req,res) {
  console.log("/favorites post route hit");
  var movie = new Movie();
  movie.Title = req.body.response.data.Title;
  movie.Year = req.body.response.data.Year;
  movie.Genre = req.body.response.data.Genre;
  movie.Director = req.body.response.data.Director;
  movie.Actors = req.body.response.data.Actors;
  movie.Plot = req.body.response.data.Plot;
  movie.Poster = req.body.response.data.Poster;
  movie.save(function(err, savedMovie){
  if(err){
    console.log("Mongo error:", err);
    res.sendStatus(500);
  }
  res.send(savedMovie);
  });
});


module.exports = router;
