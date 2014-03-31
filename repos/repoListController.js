Repos.controller("RepoListController", ["$scope", "repositories", function($scope, repositories){
	$scope.repos = repositories.query()
}]);