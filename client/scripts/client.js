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
    show:false
  };

  return {
    movieFromOMDB: movieFromOMDB,
    getOMDB: function(movieFromInput) {
      var movie = angular.copy(movieFromInput);
      var OMDBPath = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
      $http.get(OMDBPath).then(function(response) {
        movieFromOMDB.response = response;
        movieFromOMDB.show = true;
        console.log(response);
      });
    }
  };

}]);
