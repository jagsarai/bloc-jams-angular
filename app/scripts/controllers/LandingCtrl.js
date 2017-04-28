(function(){
	function LandingCtrl(){
		this.heroTitle = "Turn the Msuic Up!";
	}
	
	angular
		.module('blocJams')
		.controller('LandingCtrl', LandingCtrl);
})();