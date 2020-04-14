require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var spotifys = require('node-spotify-api');
var defaultMovie = "Independence Day";

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "concert-this":
        getBands(value)
        break;
    case "spotify-this-song":
        getSongs(value)
        break;
    case "movie-this":
        if (value == "") {
            value = defaultMovie;
        }
        getMovies(value)
        break;
    case "dow-what-it-says":
        doWhatItSays()
        break;
    default:
        break;
}