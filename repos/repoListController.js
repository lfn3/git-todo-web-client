Repos.controller("RepoListController", ["$scope", "repositories", function($scope, repositories){
	$scope.repos = repositories.all('repo').getList().$object;
}]);