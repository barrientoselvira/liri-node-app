//VARIABLES
//---------------------------------------------------------------
var fs = require('fs');
require('dotenv').config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var nodeArgs = process.argv;
var request = require("request")
var client = new Twitter(keys.twitter);
var filename = './random.txt';


// console.log(keys);
//node request to require spotify api
var Spotify = require('node-spotify-api');
//node request to require twitter
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
// var parameter = process.argv[3];
var query = '';


//able to call functions in
function switchCase(){

    switch (action) {
        case 'my-tweets':
            showTweets();
            break;
        case 'movie-this':
            showMovie();
            break;
        case 'spotify-this-song':
            showSongs();
            break;
        default:
            console.log('invalid command');
            break;
        case 'do-what-it-says':
            randomTxt();
            break;
    }



function showTweets() {
    var params = { 
        screen_name: 'b0tb0ttest', 
    }; 
        client.get("statuses/user_timeline", params, function(error, tweets, response){
            if(!error){
                for(var i =0; i < tweets.length; i ++){
                console.log(tweets[i].text)
                // console.log(tweets);
                console.log('Created_at:' + tweets[i].created_at.substring(0, 19));
                console.log('')
                console.log('My Last 20 Tweets:');
                console.log('--------------------------');

                }
            } else {
                console.log(error);
            };
            console.log('my-tweets')
    });

}

   // var getMovie;'
   //Spotify
function showSongs(){
    for(var i = 2; i < nodeArgs.length; i++)
    {
        if (i > 3 && i < nodeArgs.length){
            query = process.argv[3] + " " + nodeArgs[i];
        }
        else {
            query = process.argv[3]
        }
    }
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    
      var songInfo = data.tracks.items[0];
      console.log('Artists:' + songInfo.artists[0].name);
      console.log('Songs:' + songInfo.name); 
      console.log('Preview' + songInfo.preview_url); 
      console.log('Album' + songInfo.album.name);
      });
}




   //Movies
function showMovie(){
   for(var i = 2; i < nodeArgs.length; i++)
   {
       if (i > 3 && i < nodeArgs.length)
       {
           query = process.argv[3] + " " + nodeArgs[i];
       }
       else 
       {
           query = process.argv[3]
       }
   }
var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=f47e5a1f";
console.log(queryUrl);
request(queryUrl, function(err, response, body){
  

    if(!err && response.statusCode === 200) {
        console.log ("Title:" + JSON.parse(body).Title);
        console.log("Release Year:" + JSON.parse(body).Year);
        console.log("IMDB Rating:" + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating:" + JSON.parse(body).Ratings[1].Value);
        console.log("Country:" + JSON.parse(body).Country);
        console.log("Language:" + JSON.parse(body).Plot);
        console.log("Actors:" + JSON.parse(body).Actors); 
    }
    
        });




    };
}

function randomTxt() {

    //local file
    fs.readFile("random.txt", "utf-8", function(error, data) {
    
    // This will show error if there are any issues 
    if (error) {
        return console.log(error);
        
    } else {
        var filename = data.trim().split(",");
    
    
    console.log(filename);
        
    }
    
        });
    }

switchCase();  



   




