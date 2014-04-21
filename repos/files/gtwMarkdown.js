//Todo: this could be made smarter by only updating changed portions of text.
//Todo: get rid of that callback soup. It's balls
//Todo: bind directly to a source (gtw-markdown="scope.whatever")
//Todo: run through html sanitizer
Repos.directive("gtwMarkdown", function(){
	var regex = /\{\{(.*?)\}\}/;
	var originalText = "";

	var setWatchers = function(text, scope, callback, callbackCallback){
		var results = text.match(regex);
		
		if(results) {
			var seenList = [];
			for (var i = 1; i < results.length; i++){
				var seen = false;
				for (var j = 0; j < seenList.length; j++){
					if (results[i] === seenList[j]){
						seen = true;
						break;
					}
				}

				if (seen === true) continue;

				scope.$watch(results[i], function(newVal, oldVal, scope){
					callback(scope, callbackCallback);
				});
			}
		}
		callback(scope, callbackCallback)
	}

	var expandText = function(scope, callback, text){
		if (!text){
			text = originalText;
		}
		var results = text.match(regex);
		if (!results){
			callback(text)
		} else {
			var value = scope.$eval(results[1]);
			var replaceKey = new RegExp("{{" + results[1] + "}}","g");
			text = text.replace(replaceKey, value)
			return expandText(scope, callback, text)
		}
	}

	return {
		restrict: "AE",
		replace: true,
		scope: true,
		link: function (scope, element) {
			originalText = element.text();
			setWatchers(element.text(), scope, expandText, function(text){
				element.html(marked(text));
			})
		}
	}
});