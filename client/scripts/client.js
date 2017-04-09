var movieSearchApp = angular.module('movieSearchApp', []);

// Search controller
movieSearchApp.controller('SearchController',['$scope', 'MovieService', function($scope, MovieService) {
  var movieService = MovieService;
  $scope.movieTitle = movieService.movieTitle;
  $scope.getOMDB = movieService.getOMDB;
  $scope.movieFromOMDB = movieService.movieFromOMDB;
  $scope.addToFavorites = movieService.addToFavorites;

}]);

// Favorites controller
movieSearchApp.controller('FavoritesController',['$scope', 'MovieService', function($scope, MovieService) {
  var movieService = MovieService;
  $scope.getFavorites = movieService.getFavorites;
  $scope.getFavorites();
  $scope.favoritesObject = movieService.favoritesObject;
  $scope.deleteFavorite = movieService.deleteFavorite;

}]);

// MovieService factory
movieSearchApp.factory('MovieService',['$http',function($http) {

  var movieTitle = "";

  // movieFromOMDB is an object that stores response from OMDB
  // showMovie and showMessage are flags that help displaying the
  // response from the server diferentiating if a movie was found or
  // if an error message came from the server
  var movieFromOMDB = {
    showMovie: false,
    showMessage: false
  };

  // object that contains array of favorite movies.
  // gets values from the database ($http.get)
  var favoritesObject = {
    favorites: []
  };

  // gets favorite movies stored in DB
  function getFavorites() {
    console.log('in getFavorites');
    $http.get('/favorites').then(function(response) {
      favoritesObject.favorites = response.data;
      console.log(favoritesObject.favorites);
    });
  }

  // gets information from OMDB based on search criteria
  function getOMDB(movieTitle) {
    var movie = angular.copy(movieTitle);
    movieTitle = "";
    if (movie) {
    var OMDBPath = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
    $http.get(OMDBPath).then(function(response) {
      movieFromOMDB.response = response;
      // the object from OMDB has a property "Response" that is set to
      // "True" if a movie was found. in that case I use the flags in Index.html
      // to display the movie info and hide the message,
      // viceversa in case an error message is received 
      if (movieFromOMDB.response.data.Response === "True") {
        movieFromOMDB.showMovie = true;
        movieFromOMDB.showMessage = false;
      } else {
        movieFromOMDB.showMovie = false;
        movieFromOMDB.showMessage = true;
      }
      console.log(response);
    });
    }
  }

  // adds movie to favorites list
  function addToFavorites(favoriteMovie) {
    var favMovie = angular.copy(favoriteMovie);
    console.log('Posting movie: ',favMovie);
    $http.post('/favorites', favMovie).then(function(response) {
      console.log(response);
      getFavorites();
    });
  }

  // deletes movie from favorites list
  function deleteFavorite(favoriteMovie) {
    console.log('Deleting movie: ',favoriteMovie);
    $http.delete('/favorites/' + favoriteMovie._id).then(function(response) {
      getFavorites();
    });
  }

  // public
  return {
    movieFromOMDB: movieFromOMDB,
    favoritesObject: favoritesObject,
    getFavorites: getFavorites,
    getOMDB: getOMDB,
    addToFavorites: addToFavorites,
    deleteFavorite: deleteFavorite
  };

}]);
