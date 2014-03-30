List.controller("ListController", ["$scope", function($scope){
	$scope.repos = [
		{ 
			"name": "test1", 
			"files": [
				{
					"name": "File1"
				},
				{
					"name": "File2"
				},
				{
					"name": "File3"
				}
			]
		},
		{
			"name": "repo2",
			"files": [
				{
					"name": "foo"
				},
				{
					"name": "bar"
				},
				{
					"name": "baz"
				}
			]
		}
	];
}});