gitTodoWeb.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when("/", {
			controller: List.ListController,
			templateUrl: "list/list.html"
		});

	$locationProvider.html5Mode(true);
})