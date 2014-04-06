gitTodoWeb.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when("/", {
			controller: "RepoListController",
			templateUrl: "repos/list.html"
		})
		.when("/repo", {
			controller: "RepoListController",
			templateUrl: "repos/list.html"
		})
		.when("/repo/:repoName", {
			controller: "ListController",
			templateUrl: "repos/list.html"
		})
		.when("/repo/:repoName/file/:fileName", {
			controller: "FileController",
			templateUrl: "repos/files/file.html"
		})
		.when("/repo/:repoName/commit/:commitSha/file/:fileName", {
			controller: "FileController",
			templateUrl: "repos/files/file.html"
		});

	$locationProvider.html5Mode(true);
})