Repos.factory("repositories", ["$resource", function($resource){
	return $resource("http://localhost:3000/repo")
}]);