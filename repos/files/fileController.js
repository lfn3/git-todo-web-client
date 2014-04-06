Repos.controller("FileController", [
	"$scope", "$routeParams", "repositories", 
	function($scope, $routeParams, repositories){
	file = {
		fileName: $routeParams.fileName
	};

	if ($routeParams.commitSha) {
		var fileReq = repositories.one("repo", $routeParams.repoName).one("commit", $routeParams.commitSha).one("file", $routeParams.fileName);
	} else {
		var fileReq = repositories.one("repo", $routeParams.repoName).one("file", $routeParams.fileName);
	}

	fileReq.get().then(function(fileContents){
		file.contents = fileContents;
	});

	fileReq.one("history").get().then(function(fileHistory){
		file.history = fileHistory;
	});
	$scope.repoName = $routeParams.repoName;
	$scope.file = file;
}]);