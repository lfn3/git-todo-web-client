gitTodoWeb.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when("/", {
			controller: gitTodoWeb.List.ListController,
			template: "listTemplate"
		});

	$locationProvider.html5Mode(true);
})