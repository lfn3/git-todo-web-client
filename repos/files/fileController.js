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

	repositories.one("repo", $routeParams.repoName).one("file", $routeParams.fileName).one("history").get().then(function(fileHistory){
		file.history = fileHistory;
		if ($routeParams.commitSha){
			for (var i = file.history.length - 1; i >= 0; i--) {
				if ($routeParams.commitSha == file.history[i][0].Sha){
					file.history[i][0].selected = true;
					break;
				}
			};
		} else {
			file.history[0][0].selected = true;
		}
	});
	$scope.repoName = $routeParams.repoName;
	$scope.file = file;
}]);