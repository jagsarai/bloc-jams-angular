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
		* @desc current volume of audio file 
		* @type Number
		*/
		var currentVolume = null;
		
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
				formats: ['mp3'],
				preload: true
			});
			
			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
				if(currentBuzzObject.isEnded()){ 
					SongPlayer.next();
				}
			});
			SongPlayer.currentSong = song;
		};
		
		/**
		@function getSongIndex
		@desc Gets the current index of the song
		@param {Object} song
		*/
		var getSongIndex = function(song){
			return currentAlbum.songs.indexOf(song);
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
		* @desc Current playback volume of currently playing song(default at 80)
		* @type {Number}
		*/
		SongPlayer.volume = 80;
		
		
		SongPlayer.play = function(song){
			song = song || SongPlayer.currentSong;
			if(SongPlayer.currentSong !== song){
				setSong(song);
				playSong(song);
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
		
		/**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
		SongPlayer.setCurrentTime = function(time){
			if(currentBuzzObject){
				currentBuzzObject.setTime(time);
			}									  
		}
		
		/**
        * @function setVolume
        * @desc Set volume for songs
        * @param {Number} volume
        */
		SongPlayer.setVolume = function(volume){
			if(currentBuzzObject){
				currentBuzzObject.setVolume(volume);
			}
			SongPlayer.volume = volume;
		}
		
		
		/**
        * @function mute
        * @desc Toggles the mute on currently playing song
        */
		SongPlayer.toggleMute = function(){
			if(currentBuzzObject && !currentBuzzObject.isMuted()){
				currentVolume = SongPlayer.volume;
				currentBuzzObject.mute();
				SongPlayer.setVolume(0);
			}
			else if(currentBuzzObject && currentBuzzObject.isMuted()){
				currentBuzzObject.unmute();
				SongPlayer.setVolume(currentVolume);
			}
		}
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope','Fixtures', SongPlayer]);
})();