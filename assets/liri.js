let dotenv = require("dotenv").config();
let keys = require("./keys.js");
//console.log(keys);
let request = require('request');
let Spotify = require('node-spotify-api');
let userInput = process.argv[2];
let searchAction = process.argv[3];

// Logic
switch (userInput) {
    case 'track':
        spot(searchAction);
        break;

    case 'band':
        concertInfo(artist);
        break;

    default: 'movie';
        movieInfo('title');
        break;
}

// Spotify Function
function spot(song) {

    var spotify = new Spotify(keys.spotify);
    var songName = song;

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

         //console.log(data.tracks.items[0].album.name)
        for (var i = 0; i < data.tracks.items.length; i++) {
            var songsInfo = data.tracks.items[i];
            
            console.log(songsInfo);

            console.log("Artist Name: " + songsInfo.album.artists[0].name);
            console.log("Song Name: " + songsInfo.track);
            console.log("Album Name: " + songsInfo.album.name);
            console.log(); 
                    
        }


    });
}

// Movie Function
function movieInfo() {
    let urlOMDB =
        "http://www.omdbapi.com/?t=" + "snatch" + "&y=&plot=full&tomatoes=true&apikey=" + + keys.OMDB.API_KEY;

    request(urlOMDB, function (error, response, body) {

        console.log('error:', error); // Print the error if one occurred

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        console.log('body:', body); // Print the HTML for the Google homepage.
    });
};
// movieInfo();

// Bands in Town Function
function concertInfo() {
    let urlBand =
        "http://rest.bandsintown.com" //apiKey;

    request(urlBand, function (error, response, body) {

        console.log('error:', error); // Print the error if one occurred

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        console.log('body:', body); // Print the HTML for the Google homepage.
    });
};
// concertInfo();

