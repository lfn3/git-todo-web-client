gitTodoWeb.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when("/", {
			controller: List.ListController,
			templateUrl: "List/list.html"
		});

	$locationProvider.html5Mode(true);
})