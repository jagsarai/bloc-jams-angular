(function () {
	function FormCtrl($scope, $state){
		$scope.submit = function(){
			if($scope.username === 'username' && $scope.password === 'password'){
				console.log($scope.username +" "+ $scope.password);
				$state.go('collection');
			}
			else{
				alert("Please enter a valid username and password");
			}
		}
	}
	angular
		.module('blocJams')
		.controller('FormCtrl', ['$scope', '$state', FormCtrl]);
})();