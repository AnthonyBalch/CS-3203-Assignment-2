var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');					// added for read file



var PORT = process.env.PORT || 3000;


app.use(express.static(__dirname));
app.use(bodyParser.json());



var tweet_creation_time = []; 	// used for user_id
var tweet_text = [];			// user for user_id

var user_id = [];				// /user_id page
var tweet_combo = [];			// /tweet_combo page
var tweet_combo2 = [];			// /tweet_combo2 page [same as first but this includes ids]
var update_name_combo = [];		// /update_name_combo page


// read JSON objects from file
fs.readFile('favs.json', 'utf-8', (err, data) => {
	if (err) {
		throw err;
	}

	// parse JSON objects into 1 array called tweet
	const tweet = JSON.parse(data);
	tweet_length = tweet.length;

	// store respective objects into arrays for later manipulation
	// console.log("JSON file succesfully read.")
	for (var i = 0; i < tweet.length; i++) {	//i starts at 0
		var name = JSON.stringify(tweet[i].user.name);
		var screen_name = JSON.stringify(tweet[i].user.screen_name);
		user_id[i] = tweet[i].id_str;
		tweet_text[i] = tweet[i].text; 
		tweet_creation_time[i] = tweet[i].created_at;

		tweet_combo[ ( 2 * i ) ] = tweet[i].created_at;
		tweet_combo[ ( 2 * i ) + 1 ] = tweet[i].text;

		tweet_combo2[ ( 3 * i )] = tweet[i].created_at;
		tweet_combo2[ ( 3 * i ) + 1 ] = tweet[i].text;
		tweet_combo2[ ( 3 * i ) + 2 ] = tweet[i].id_str;


		update_name_combo[ ( 2 * i ) ] = tweet[i].name;
		update_name_combo[ ( 2 * i ) + 1 ] = tweet[i].screen_name;

		update_name_combo[ ( 2 * i ) ] = JSON.stringify(tweet[i].user.name);
		update_name_combo[ ( 2 * i ) + 1 ] = JSON.stringify(tweet[i].user.screen_name);




	}


});

// Now the server needs the 4 basic commands.

// GET/READ
app.get('/user_id', function(req, res)  {
	//console.log('GET MESSAGE [ids]!');
	res.send({ user_id: user_id });
});

app.get('/tweet_combo', function(req, res)  {
	//console.log('GET MESSAGE! [tweet text & creation time]');
	res.send({ tweet_combo: tweet_combo });
});

app.get('/tweet_combo2', function(req, res)  {
	//console.log('GET MESSAGE! [tweet text & creation time#2]');
	res.send({ tweet_combo2: tweet_combo2 });
});


// POST/CREATE
app.post('/tweet_combo2', function(req, res) {
	//console.log('POST MESSAGE! [tweet_combo2]');
	res.send('Tweet Posted!');

});


// BELOW IDK

// PUT/UPDATE

// this is needed to create page that will be updated.
//needed for the /update_name_combo web extension
app.get('/update_name_combo', function(req, res)  {
	//console.log('UPDATE MESSAGE! [GET]');
	res.send({ update_name_combo: update_name_combo });
	
});

// Actual put route
app.put('/update_name_combo', function(req, res)  {
	res.send('Username Updated!');

});





// DELETE
app.delete('/tweet_combo2', function(req, res)  {
	console.log('Deleted!');
	res.send('Deleting tweet!');
});



app.listen(PORT, function() {
	console.log('Server listening on ' + PORT);
});