Repos.controller("FileController", ["$scope", "$routeParams", "repositories", function($scope, $routeParams, repositories){
	file = {
		fileName: $routeParams.fileName
	}

	repositories.one("repo", $routeParams.repoName).one("file", $routeParams.fileName).get().then(function(fileContents){
		file.contents = fileContents;
	})

	$scope.file = file;
}]);