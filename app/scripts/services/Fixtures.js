(function(){
	function Fixtures(){
		var Fixtures = {};
		
		var albumPicasso = {
			title: 'The Colors',
			artist: 'Pablo Picasso',
			label: 'Spanish Records',
			year: '1909',
			albumArtUrl: '/assets/images/album_covers/01.png',
			songs: [
             { title: 'Blue', duration: '161.71', audioUrl: 'app/assets/music/blue' },
             { title: 'Green', duration: '103.96', audioUrl: 'app/assets/music/green' },
             { title: 'Red', duration: '268.45', audioUrl: 'app/assets/music/red' },
             { title: 'Pink', duration: '153.14', audioUrl: 'app/assets/music/pink' },
             { title: 'Magenta', duration: '374.22', audioUrl: 'app/assets/music/magenta' }
         ]
		};

		var albumMarconi = {
			title: 'The Telephone',
			artist: 'Guglielo Marconi',
			label: 'EM',
			year: '1990',
			albumArtUrl: '/assets/images/album_covers/02.png',
			songs:[
				{title: 'Hello, Operator?', duration: '1:01'},
				{title: 'Ring, ring, ring', duration: '5:01'},
				{title: 'Fits in you pocket', duration: '3:21'},
				{title: 'Can you hear me now?', duration: '3:14'},
				{title: 'Wrong phone number', duration: '2:15'}
			]
		};
		
		Fixtures.getAlbum = function(){
			return albumPicasso;
		};
		
		Fixtures.getCollection = function(numberOfAlbums){
			var albums = [];
			for(var i=0; i<numberOfAlbums; i++){
				albums.push(albumPicasso);
			}
			return albums;
		}
		
		return Fixtures;
	}
	
	angular
		.module('blocJams')
		.factory('Fixtures', Fixtures);
})();