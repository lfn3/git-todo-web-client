Repos = angular.module("Repos", ["restangular", "ngSanitize"]);

Repos.config(["RestangularProvider", function(RestangularProvider){
	RestangularProvider.setBaseUrl("http://localhost:3000");
}]);
