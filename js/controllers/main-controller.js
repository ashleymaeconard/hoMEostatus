app.controller('MainController', function($scope, $firebaseArray) {

	// create new firebase reference
	var ref = new Firebase("https://hab16-projectz.firebaseio.com/");
	$scope.database = $firebaseArray(ref);



});