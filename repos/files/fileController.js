Repos.controller("FileController", [
	"$scope", "$routeParams", "repositories", 
	function($scope, $routeParams, repositories){
	file = {
		fileName: $routeParams.fileName
	};
	var fileReq = repositories.one("repo", $routeParams.repoName).one("file", $routeParams.fileName);

	fileReq.get().then(function(fileContents){
		file.contents = fileContents;
	});

	fileReq.one("history").get().then(function(fileHistory){
		file.history = fileHistory;
	});
	$scope.repoName = $routeParams.repoName;
	$scope.file = file;
}]);