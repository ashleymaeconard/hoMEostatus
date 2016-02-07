app.controller('MainController', function($scope, $firebaseArray) {

	// create new firebase reference
	var ref = new Firebase("https://hab16-projecty.firebaseio.com/");
	$scope.database = $firebaseArray(ref);
});