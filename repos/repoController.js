Repos.controller("RepoController", ["$scope", "Restangular", function($scope, Restangular){
	$scope.repos = Restangular.all('repo').getList().$object;
})