Repos = angular.module("Repos", ["restangular"]);

Repos.config(["RestangularProvider", function(RestangularProvider){
	RestangularProvider.setBaseUrl("http://localhost:3000");
}]);
