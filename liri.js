require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
});
var fs = require("fs");
var defaultMovie = "Mr. Nobody";

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");

switch (action) {
    case "concert-this":
        getBands(value)
        break;
    case "spotify-this-song":
        getSongs(value)
        break;
    case "movie-this":
        if (value === "") {
            value = defaultMovie;
        }
        getMovies(value)
        break;
    case "do-what-it-says":
        doWhatItSays()
        break;
    default:
        break;
}

function getBands(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response) {
        console.log(`Name of the venue:`, response.data[0].venue.name);
        console.log(`Venue location:`, response.data[0].venue.city);
        var eventDate = moment(response.data[0].datetime).format("MM/DD/YYYY");
        console.log(`Event date:`, eventDate);
    }).catch(function(error) {
        console.log(error);
    })
}

function getSongs(songName) {
    spotify.search({
        type: 'track',
        query: songName
    }, function(err, data) {
        if (err) {
            return console.log("Error: " + err);
        }
    
        console.log("Artist:", data.tracks.items[0].album.artists[0].name);
        console.log("Link: ", data.tracks.items[0].external_urls);
        console.log("Album:", data.tracks.items[0].album.name);
    })
}

function getMovies(movie) {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie).then(function(data) {
        var results = `Title of the movie: ${data.data.Title}
        Year the movie came out: ${data.data.Year}
        IMDB rating: ${data.data.Rated}
        Rotten Tomatoes rating: ${data.data.Ratings[1].Value}
        Country where the movie was produced: ${data.data.Country}
        Language: ${data.data.Language}
        Plot: ${data.data.Plot}
        Actors: ${data.data.Actors}`;
        console.log(results);
    }).catch(function(err) {
        console.log(err);
    })

    if (movie === "Mr. Nobody") {
        console.log('If you haven\'t watched Mr. Nobody then you should: http://www.imdb.com/title/tt0485947/');
        console.log('It\'s on Netflix!');
    }
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        data = data.split(",");
        var action = data[0]
        var value = data[1]

        switch (action) {
            case "concert-this":
                getBands(value)
                break;
            case "spotify-this-song":
                getSongs(value)
                break;
            case "movie-this":
                getMovies(value)
                break;
            default:
                break;
        }
    });
}