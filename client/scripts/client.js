var movieSearchApp = angular.module('movieSearchApp', []);

movieSearchApp.controller('SearchController',['$scope', 'MovieService',function($scope, MovieService) {
  var movieService = MovieService;
  $scope.movieTitle = "";
  $scope.getOMDB = movieService.getOMDB;
  $scope.movieFromOMDB = movieService.movieFromOMDB;
  $scope.addToFavorites = movieService.addToFavorites;

}]);

movieSearchApp.controller('FavoritesController',['$scope',function($scope) {

}]);

movieSearchApp.factory('MovieService',['$http',function($http) {

  var movieFromOMDB = {
    showMovie: false,
    showMessage: false
  };

  var favorites = [];

  return {
    movieFromOMDB: movieFromOMDB,
    getOMDB: function(movieFromInput) {
      var movie = angular.copy(movieFromInput);
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
    },
    addToFavorites: function(favoriteMovie) {
      var favMovie = angular.copy(favoriteMovie);
      favorites.push(favMovie);
      console.log(favorites);
    }
  };

}]);
