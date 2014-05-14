Repos.directive("gtwMarkdownDiff", function(){
	var regex = /\{\{(.*?)\}\}/;
	var originalText = "";

	//TODO: Replace this with something less hacky.
	var counter = 0;
	function stripHtmlTags(html){
		var currentCount = counter;
		var dummyElem = window.document.createElement("div");
		dummyElem.id = "stripHtmlDummyElem" + currentCount;
		counter++;

		dummyElem.setAttribute("style", "display: none;");
		dummyElem.innerHTML = html;

		window.document.body.appendChild(dummyElem);

		var wrappedDummy = angular.element(window.document.getElementById("stripHtmlDummyElem" + currentCount));
		var output = wrappedDummy.text();
		wrappedDummy.remove();
		return output;
	}

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
		callback(scope, callbackCallback);
	}

	var expandText = function(scope, callback, text){
		if (!text){
			text = originalText;
		}
		var results = text.match(regex);
		if (!results){
			callback(text);
		} else {
			var value = scope.$eval(results[1]);
			var replaceKey = new RegExp("{{" + results[1] + "}}","g");
			text = text.replace(replaceKey, value);
			return expandText(scope, callback, text);
		}
	}

	return {
		restrict: "A",
		link: function(scope, elem, attr){
			var dmp = new diff_match_patch();
			originalText = elem.text();

			window.setTimeout(function(){
				var compareTo = scope.$eval(attr.gtwMarkdownDiff);

				setWatchers(elem.text(), scope, expandText, function(text){

					var strippedText = stripHtmlTags(marked(text));
					var strippedCompareTo = stripHtmlTags(marked(compareTo));

					console.log(strippedText);
					console.log(strippedCompareTo);

					var diff = dmp.diff_main(strippedText, strippedCompareTo);
					dmp.diff_cleanupSemantic(diff);

					console.log(diff);

					// var text = "";
					// for (var i = diff.length - 1; i >= 0; i--) {
					// 	switch (diff[i][0]){
					// 		case -1:
					// 			text = "<span class=\"removed\">" + diff[i][1] + "</span>" + text;
					// 		break;
					// 		case 0:
					// 			text = diff[i][1] + text;
					// 		break;
					// 		case 1:
					// 			text = "<span class=\"added\">" + diff[i][1] + "</span>" + text;
					// 		break;
					// 	}
					// };
					// elem.html(text);
				});
			}, 5000);

			
		}
	}
});