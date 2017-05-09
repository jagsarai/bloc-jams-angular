(function () {
	function LogInCtrl(Fixtures, SongPlayer){
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
	}
	
	angular
		.module('blocJams')
		.controller('LogInCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();