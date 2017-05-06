(function(){
	function volume($document){
		return{
			templateUrl: '/templates/directives/volume.html',
			replace: true,
			restrict: 'E',
			scope: { },
			link: function(scope, element, attributes, $document){
				scope.onVolumeClick = function(){
					if(scope.class === 'icon ion-volume-high'){
						scope.class = 'icon ion-volume-mute';
						
					}
					else{
						scope.class = 'icon ion-volume-high';
					}
				}
			} 
		};
	}
	angular
		.module('blocJams')
		.directive('volume',['$document', volume]);
})();