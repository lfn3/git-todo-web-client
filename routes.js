gitTodoWeb.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when("/", {
			controller: "RepoListController",
			templateUrl: "repos/list.html"
		})
		.when("/repos", {
			controller: "RepoListController",
			templateUrl: "repos/list.html"
		})
		.when("/repos/:repoName", {
			controller: "ListController",
			templateUrl: "List/list.html"
		});

	$locationProvider.html5Mode(true);
})