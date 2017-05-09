(function(){
	function SignUpCtrl($scope, $state){
		$scope.users = [];
		$scope.save = function(user){
			users.push(angular.copy(user));
			alert("Thank you for signing up!");
			$state.go('collection');
		};
	}
	angular
		.module('blocJams')
		.controller('SignUpCtrl', ['$scope', '$state', SignUpCtrl])
})();