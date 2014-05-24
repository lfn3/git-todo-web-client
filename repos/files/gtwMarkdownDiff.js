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

			//TODO: Replace this with a watch on attr.gtwMarkdownDiff
			window.setTimeout(function(){
				var compareTo = scope.$eval(attr.gtwMarkdownDiff);

				setWatchers(elem.text(), scope, expandText, function(text){
					var html = marked(text);
					elem.html(html);

					var strippedText = stripHtmlTags(html);
					var strippedCompareTo = stripHtmlTags(marked(compareTo));

					var diff = dmp.diff_main(strippedText, strippedCompareTo);
					dmp.diff_cleanupSemantic(diff);

					var searchLoc = strippedText.length;
					for (var i = diff.length - 1; i >= 0; i--){
						if (diff[i][1].match('\\w+')) continue;
						switch (diff[i][0]){
							case -1:
								var removedStartTag = "<span class=\"removed\">";
								var removedEndTag = "</span>";

								var currentSearchLoc = searchLoc - (Math.floor(diff[i][1].length / 2));
								var match = dmp.match_main(elem.html(), diff[i][1].slice(0, 32), currentSearchLoc);

								if (match === -1) continue; //TODO: Figure out what to do in this case.

								//Match should be inside a bit of text rather than an html node...
								//TODO: Check and fix this assumption
								html = html.slice(0, match) + removedStartTag + html.slice(match);

								var insertedTagLengths = removedStartTag.length;
								var tagCharCount = 0;
								var insideTagDepth = 0;
								for(var j = 0; j < diff[i][1].length + tagCharCount + insertedTagLengths; j++){
									if (j > html.length) break;
									var currentPos = match + insertedTagLengths + j;
									var currentChar = html.charAt(currentPos);
									if(currentChar == '<'){
										if (insideTagDepth === 0) {
											html = html.slice(0, currentPos) + removedEndTag + html.slice(currentPos);
											insertedTagLengths += removedEndTag.length;
										}
										insideTagDepth += 1;
									} else if (insideTagDepth > 0 && currentChar == '>') {
										insideTagDepth -= 1;
										if (insideTagDepth === 0) {
											html = html.slice(0, currentPos + 1) + removedStartTag + html.slice(currentPos + 1);
											insertedTagLengths += removedStartTag.length;
											tagCharCount += 1;
										}
									}
									if (insideTagDepth > 0){
										tagCharCount += 1;
									}
								}
								html = html.slice(0, j) + removedEndTag + html.slice(j);
							break;
							case 0:
								searchLoc -= diff[i][1].length;
							break;
							case 1:
							break;
						}
					}

					elem.html(html);
					console.log(html);
				});
			}, 2000);
		}
	}
});