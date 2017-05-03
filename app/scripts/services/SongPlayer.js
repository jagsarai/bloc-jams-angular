(function(){
	function SongPlayer($rootScope, Fixtures){
		var SongPlayer= {};
		
		
		/**
		* @desc Current Album from Albums Array
		* @type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();
		
		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;
		
		/**
		* @function playSong
		* @desc Plays the audio file and set song is playing in view.
		* @param {Object} song
		*/
		var playSong = function(song){
			currentBuzzObject.play();
			song.playing = true;
		};
		
		/** funstopSong 
		@desc Stops the currrently playing song
		*/
		var stopSong = function(song){
			currentBuzzObject.stop();
			song.playing = null;
		}
		 /**
 		* @function setSong
 		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
 		* @param {Object} song
 		*/
		var setSong = function(song){
			if(currentBuzzObject){
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}
				
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				format:  ['mp3'],
				preload: true
			});
			
			currentBuzzObject.bind('timeupdate', function(){
				$rootScope.$apply(function(){
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});
			
			SongPlayer.currentSong = song;
		};
		
		/**
		@desc Active song object from list of songs
		@type {Object}
		*/
		SongPlayer.currentSong = null;
		
		/**
		* @desc Current playback time(in seconds) of currently playing song
		* @type {Number}
		*/
		SongPlayer.currentTime = null;
		
		/**
		@function getSongIndex
		@desc Gets the current index of the song
		@param {Object} song
		*/
		var getSongIndex = function(song){
			return currentAlbum.songs.indexOf(song);
		};
		
		
		SongPlayer.play = function(song){
			song = song || SongPlayer.currentSong;
			if(SongPlayer.currentSong !== song){
				setSong(song);
				console.log(currentBuzzObject);
				console.log(buzz.isSupported());
				playSong(song);	
				console.log(song);
			}
			else if(SongPlayer.currentSong === song){
				if(currentBuzzObject.isPaused()){
					playSong(song);
				}
			}
		};
		
		SongPlayer.pause = function(song){
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		
		/**
		@desc Previous song objet form the list of songs in Album
		@type {Object}
		*/
		SongPlayer.previous = function(){
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if(currentSongIndex < 0){
				stopSong(SongPlayer.currentSong);
			}
			else{
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		}
		
		SongPlayer.next = function(){
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			
			if(currentSongIndex > currentAlbum.songs.length - 1){
				stopSong(SongPlayer.currentSong);
			}
			else{
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		}
		
		SongPlayer.setCurrentTime = function(time){
			if(currentBuzzObject){
				currentBuzzObject.setTime(time);
			}
		};
		
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope','Fixtures', SongPlayer]);
})();