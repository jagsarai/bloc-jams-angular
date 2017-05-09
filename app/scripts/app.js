(function(){
	function config($stateProvider, $locationProvider){
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
			});
		$stateProvider
			.state('landing', {
				url: '/',
				controller: 'LandingCtrl as landing',
				templateUrl: '/templates/landing.html'
			})
			.state('album', {
				url: '/album',
				controller: 'AlbumCtrl as album',
				templateUrl: '/templates/album.html'
			})
			.state('collection', {
				url: '/collection',
				controller: 'CollectionCtrl as collection',
				templateUrl: '/templates/collection.html'
			})
			.state('log-in', {
				url: '/log-in',
				controller: 'LogInCtrl as logIn',
				controller: 'FormCtrl as form',
				templateUrl: '/templates/log-in.html'
			})
			.state('sign-up',{
				url: '/sign-up',
				controller: 'SignUpCtrl as signUp',
				templateUrl: '/templates/sign-up.html'
			});
	}
	
	angular
	.module('blocJams', ['ui.router'])
	.config(config)
})();

