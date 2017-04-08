var movieSearchApp = angular.module('movieSearchApp', []);

movieSearchApp.controller('SearchController',['$scope', 'MovieService', function($scope, MovieService) {
  var movieService = MovieService;
  $scope.movieTitle = movieService.movieTitle;
  $scope.getOMDB = movieService.getOMDB;
  $scope.movieFromOMDB = movieService.movieFromOMDB;
  $scope.addToFavorites = movieService.addToFavorites;

}]);

movieSearchApp.controller('FavoritesController',['$scope', 'MovieService', function($scope, MovieService) {
  var movieService = MovieService;
  $scope.getFavorites = movieService.getFavorites;
  $scope.getFavorites();
  $scope.favoritesObject = movieService.favoritesObject;
  $scope.deleteFavorite = movieService.deleteFavorite;


}]);

movieSearchApp.factory('MovieService',['$http',function($http) {

  var movieTitle = "";

  var movieFromOMDB = {
    showMovie: false,
    showMessage: false
  };

  var favoritesObject = {
    favorites: []
  };

  function getFavorites() {
    console.log('in getFavorites');
    $http.get('/favorites').then(function(response) {
      favoritesObject.favorites = response.data;
      console.log(favoritesObject.favorites);
    });
  }

  function getOMDB(movieTitle) {
    var movie = angular.copy(movieTitle);
    movieTitle = "";
    var OMDBPath = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
    $http.get(OMDBPath).then(function(response) {
      movieFromOMDB.response = response;
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

  function addToFavorites(favoriteMovie) {
    var favMovie = angular.copy(favoriteMovie);
    console.log('Posting movie: ',favMovie);
    $http.post('/favorites', favMovie).then(function(response) {
      console.log(response);
      getFavorites();
    });
  }

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
