var movieSearchApp = angular.module('movieSearchApp', []);

movieSearchApp.controller('SearchController',['$scope', 'MovieService',function($scope, MovieService) {
  var movieService = MovieService;
  $scope.movieTitle = "";
  $scope.getOMDB = movieService.getOMDB;
  $scope.movieFromOMDB = movieService.movieFromOMDB;

}]);

movieSearchApp.controller('DisplayController',['$scope', 'MovieService',function($scope, MovieService) {
  var movieService = MovieService;
  $scope.movieFromOMDB = movieService.movieFromOMDB;
}]);

movieSearchApp.controller('FavoritesController',['$scope',function($scope) {

}]);

movieSearchApp.factory('MovieService',['$http',function($http) {

  var movieFromOMDB = {
    showMovie: false,
    showMessage: false
  };

  return {
    movieFromOMDB: movieFromOMDB,
    getOMDB: function(movieFromInput) {
      var movie = angular.copy(movieFromInput);
      var OMDBPath = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
      $http.get(OMDBPath).then(function(response) {
        movieFromOMDB.response = response;
        if (movieFromOMDB.response.data.Response === "True") {
          console.log('1 error is ', movieFromOMDB.response.data.Response);

          movieFromOMDB.showMovie = true;
          movieFromOMDB.showMessage = false;

        } else {
          console.log('2 error is ', movieFromOMDB.response.data.Response);
          movieFromOMDB.showMovie = false;
          movieFromOMDB.showMessage = true;
        }
        console.log(response);
      });
    }
  };

}]);
