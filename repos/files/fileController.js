Repos.controller("FileController", [
	"$scope", "$routeParams", "repositories", "$location",
	function($scope, $routeParams, repositories, $location){
	$scope.renderMarkdown = true;
	file = {
		fileName: $routeParams.fileName
	};

	var repoReq = repositories.one("repo", $routeParams.repoName);

	if ($routeParams.commitSha) {
		var fileReq = repoReq.one("commit", $routeParams.commitSha).one("file", $routeParams.fileName);
	} else {
		var fileReq = repoReq.one("file", $routeParams.fileName);
	}

	fileReq.get().then(function(fileContents){
		file.contents = fileContents;
	});

	repoReq.one("file", $routeParams.fileName).one("history").get().then(function(fileHistory){
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

	if ($routeParams.compareTo){
		file.compareTo = $routeParams.compareTo;
		repoReq.one("commit", file.compareTo).one("file", $routeParams.fileName).get().then(function(fileContent){
			file.compareToContent = fileContent;
		})
	}

	$scope.repoName = $routeParams.repoName;
	$scope.file = file;

	$scope.$watch("file.compareTo",function(newValue, oldValue){
		if (newValue != oldValue){
			if (newValue == ""){
				$location.search("compareTo", null);
			} else {
				$location.search("compareTo", newValue);
			}
		} 
	});
}]);