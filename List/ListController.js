List.controller("ListController", ["$scope", "$resource", function($scope, $resource){
	var Repo = $resource("http://localhost:3000")
	$scope.repos = Repo.query()
}]);