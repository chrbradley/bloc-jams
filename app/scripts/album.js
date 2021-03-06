// Example Albums
var albumPicasso = {
	name: 'The colors',
	artist: 'Pablo Picasso',
	label: 'Cubeism',
	year: '1881',
	albumArtUrl: '/images/album-placeholder.png',
	songs: [
		{ name: 'Blue', length: '4:26 '},
		{ name: 'Green', length: '3:14' },
		{ name: 'Red', length: '5:01' },
    { name: 'Pink', length: '3:21'},
    { name: 'Magenta', length: '2:15'}
	]
};

var albumMarconi = {
   name: 'The Telephone',
   artist: 'Guglielmo Marconi',
   label: 'EM',
   year: '1909',
   albumArtUrl: '/images/album-placeholder.png',
   songs: [
       { name: 'Hello, Operator?', length: '1:01' },
       { name: 'Ring, ring, ring', length: '5:01' },
       { name: 'Fits in your pocket', length: '3:21'},
       { name: 'Can you hear me now?', length: '3:14' },
       { name: 'Wrong phone number', length: '2:15'}
     ]
 };

var currentlyPlayingSong = null;

var createSongRow = function(songNumber, songName, songLength) {
  var template =
      '<tr>'
    + ' <td class="song-number col-md-1" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + ' <td class="col-md-9">' + songName + '</td>'
    + ' <td class="col-md-2">' + songLength + '</td>'
    + '</tr>'
    ;

  // Attach hover functionality to row
  var $row = $(template);

  // Change from a spng number to play button when the song isn't playing and we hover over the row
  var onHover = function(event) {
  	songNumberCell = $(this).find('.song-number');
    songNumber = songNumberCell.data('song-number');
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
    }
  };

  // Change from a play button to a song number when the song isn't playing and we hover off the row
  var offHover = function(event) {
  	songNumberCell = $(this).find('.song-number');
    songNumber = songNumberCell.data('song-number');
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(songNumber);
    }
  };

  // Toggle the play, pause and song number based on the button clicked.
  var clickHandler = function(event) {
  	songNumber = $(this).data('song-number');

  	if ( currentlyPlayingSong !== null ) {
  		// Revert to song number for currently playing song because user started playing an new song
  		currentlyPlayingCell = $('.song-number[data-song-numbr="' + currentlyPlayingSong + '"]');
  		currentlyPlayingCell.html(currentlyPlayingSong);
  	}

  	if ( currentlyPlayingSong !== songNumber ) {
  		// Siwtch from play to puase to indicate new song is playing.
  		// set the current song to the one clicked
  		$(this).html('<a class="album-song-button"><i class="fa fa-pause"></i></a>');
  		currentlyPlayingSong = songNumber;
  	}
  	else if ( currentlyPlayingSong === songNumber ) {
  		// switch from pause to play for current song to indicate pausing.
  		// Set the current song to null
  		$(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
  		currentlyPlayingSong = null;
  	}
  };

  $row.find('.song-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};


var changeAlbumView = function(album) {
	// Update the album title
	var $albumTitle = $('.album-title');
	$albumTitle.text(album.name);

	// Update the album artist
	var $albumArtist = $('.album-artist');
	$albumArtist.text(album.artist);

	// Update the album neta information
	var $albumMeta = $('.album-meta-info');
	$albumMeta.text(album.year + " on " + album.label);

	// Update the album image
	var $albumImage = $('.album-image img');
	$albumImage.attr('src', album.albumArtUrl);

	// Update the song list
	var $songList = $('.album-song-listing');
	$songList.empty();

	var songs = album.songs;
	for (var i=0; i < songs.length; i++) {
		var songData = songs[i];
		var $newRow = createSongRow(i+1, songData.name, songData.length);
		$songList.append($newRow);

	}
};
// This 'if' condition is used to prevent the jQuery modifications
// from happening on non-Album view pages.
//  - Use a regex to validate that the url has "/album" in its path.
if (document.URL.match(/\/album.html/)) {

	// Wait until html is processed
	$(document).ready(function() {

		changeAlbumView(albumPicasso);
	});
	
}
