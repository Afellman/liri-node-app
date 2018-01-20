
// Not sure...
require("dotenv").config();
// Required packages and JSON
const keys = require('./keys.js');
const twitterReq = require('twitter');
const spotifyReq = require('node-spotify-api');
const request = require('request');
const inquirer = require('inquirer');
const fs = require('fs');
// Creating a new instance of the api keys
const spotify = new spotifyReq(keys.spotify);
const client = new twitterReq(keys.twitter);
const omdb_api = "10a078a4";
// Storing commands from terminal
const command = process.argv[2];
const input = process.argv[3];


// ----------------Checking for api choice-----------------------
function checkInput(command, input){
  if (command == "spotify-this-song"){
    // Checking if song is provided
    if (!input == undefined){
      spotifyFunc("I Saw The Sign");
    } else {
      spotifyFunc(input)

    }

  } else if (command == "my-tweets") {
    twitterFunc(input)

  } else if (command == 'movie-this') {
    // Checking if movie is provided
    if(input == undefined){
      omdbFunc("Mr. Nobody")
    } else {
      omdbFunc(input)
    }
    
  } else if (command == 'do-what-it-says') {
    doWhatFunc(input)

  } else {
    console.log("The is not a correct choice")

  };
};
// ----------------------------------------------------

// ----------------Spotify Function--------------------
function spotifyFunc(songInput) {
  spotify.search({ type: 'track', query: songInput, limit: 10 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
      songData = {
        title: data.tracks.items[0].name,
        artist: data.tracks.items[0].artists[0].name,
        link: data.tracks.items[0].preview_url,
        album: data.tracks.items[0].album.name
        };

        // **** Need to make this work with Inquirer so the user can choose the correct song ****
          
  
    // console.log(songData)
    console.log("Title: " + songData.title + "\n" + "Artist: " + songData.artist +  "\n" + "Album: " + songData.album + "\n" + "Preview Link: " + songData.link);
  });

};
// -----------------------------------------------------

// -----------------Twitter Function--------------------

function twitterFunc() {
  let params = {screen_name: 'fellman_andrew'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  let tweetArray = [];
  if (!error) {
    // **** Need to iterate 20 times, not .length ****
    for (let i = 1; i < tweets.length; i++) {
      tweetArray.push("Tweet " + i + ": " + tweets[i].text)
      tweetArray.push("Sent on: " + tweets[i].created_at + "\n --");
    }
    console.log(tweetArray.join("\n"));
  }
});
};
// -------------------------------------------------------

// -------------------OMDB Function-----------------------

function omdbFunc(movie) {
  request('http://www.omdbapi.com/?apikey=trilogy&t=' + movie, function (error, response, body) {
		let data = JSON.parse(body)
		let movie_data = []
		if (error) {
			console.log('error:', error); 	
		} else {
				movie_data.push(
				"Title: " +  data.Title,
				"Year: " + data.Year,
				"IMDB Rating: " + data.imdbRating,
				"Rotten Tomatoes Rating: " + data.Ratings[1].Value,
				"Country: " + data.Country,
				"Language: " + data.Language,
				"Plot: " + data.Plot,
				"Actors: " + data.Actors
			);
			console.log (movie_data.join('\n'));
		}
	});
};


// -------------------Do What Function-----------------------

function doWhatFunc(command) {
  fs.readFile("random.txt", "utf8", function(error, data) {
    var data_split = data.split(",");
    checkInput(data_split[0], data_split[1]);
  });
};

// -------------------------------------------------------
checkInput(command, input);
