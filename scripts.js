var getData = [];		// Will be used to manipulate data
var nameData = [];		// Will also be used to manipulate data


$(function () {
	// READ tweet creation time and text
	$('#get-tweet-button').click(function () {
		$.ajax({
			url: '/tweet_combo',
			type: 'GET',
			cache: false,
			success: function(data) {
				console.log('get-tweet-button SUCCESS!');
				//console.log(data);

				$(".created_at_location").empty(); // empties it before each call to prevent build up
				$(".text_location").empty(); // empties it before each call to prevent build up

				$.each(data, function(index,value ) {
					var i = 0;
					var text;
					var time_created;
					while(value[i] != null) {
						getData[i] = value[i];
						if (i == 0 || (i % 2 == 0 )) {
							time_created = getData[i];
							$(".created_at_location").append(time_created + '<br>')
						}
						if (i != 0 && (i % 2 != 0 )) {;
							text = getData[i];
							$(".text_location").append(text + '<br>')
						}
						i++;
					}


				})

			},
			error: function() {
				console.log('FAILURE!');
			},
		});

	});

	// READ user ids
	$('#get-id-button').click(function() {
		//console.log('button pressed');
		$.ajax({
			url: '/user_id',
			type: 'GET',
			cache: false,
			data: JSON.stringify(),
			success: function(data) {
				console.log('get-id-button SUCCESS!');

				$(".user_id_location").empty(); // empties it before each call to prevent build up
				
				$.each(data, function(index, value) {
					var i = 0;
					var newInput;
					while(value[i] != null) {
						getData[i] = value[i];
						newInput = getData[i];
						$(".user_id_location").append(newInput + '<br>')
						i++;
					}
				})
				
			},
			error: function() {
				console.log('FAILURE!');
			},
		});
	});

	//Retrieves text and time of tweet given the ID
	$('#get-tweet-form').on('submit', function(event) {
		event.preventDefault();

		var createInput = $('#get-tweet-input');
		var idInput = JSON.stringify(createInput.val());
		idInput = idInput.substring(1, (idInput.length - 1) );

		$.ajax({
			url: '/tweet_combo2',
			type: 'GET',
			cache: false,
			success: function(data) {
				console.log('get-tweet-form SUCCESS!');

				$(".find_created_at_location").empty(); // empties it before each call to prevent build up
				$(".find_text_location").empty(); // empties it before each call to prevent build up


				$.each(data, function(index, value) {
					var i = 0;
					var text;
					var time_created;
					var trash;
					while(value[i] != null) {
						getData[i] = value[i];

						if (idInput == getData[i]) {
							time_created = getData[i-2];
							text = getData[i-1];
							trash = getData[i];
							$(".find_created_at_location").append(time_created + '<br>')
							$(".find_text_location").append(text + '<br>')
						}
						i++;
					}
				})
	
			},
			error: function() {
				console.log('FAILURE!');
			},
		});
	});

	// Create Tweet
	$('#post-tweet-form').on('submit', function(event) {
		event.preventDefault();

		var createText = $('#post-tweet-input-text');
		createText = JSON.stringify(createText.val());
		createText = createText.substring(1, (createText.length - 1) );
		var createId = $('#post-tweet-input-id');
		createId = JSON.stringify(createId.val());
		createId = createId.substring(1, (createId.length - 1) );

		$.ajax({
			url: '/tweet_combo2',
			type: 'POST',
			//data: createText, createId,
			//contentType: 'application/json',
			//data: JSON.stringify({ text: createText.val(), id: createId.val() }),
			success: function(response) {
				console.log('response: ' + response);
				//here
				var date = Date();
				new Date().toLocaleTimeString([], {weekday: 'short',
					month: '2-digit', day: '2-digit', hour: '2-digit',
					 year: 'numeric', hour12: false});
				
				// Adds new tweet to table
				$(".created_at_location").append(date + '<br>')
				$(".text_location").append(createText + '<br>')

			},
			error: function() {
				console.log('FAILURE!');
			},
		});
	});



	//Get /update_name_combo for following PUT function
	$('#update-username-button').on('click', function() {
		event.preventDefault();

		$.ajax({
			url: '/update_name_combo',
			type: 'GET',
			cache: false,
			success: function(data) {
				//console.log('/update_name_combo GET!');
				//console.log(data);
				$.each(data, function(index, value) {
					var i = 0;
					var oldName;
					var newName;
					while(value[i] != null) {
						nameData[i] = value[i];
					i++;
					}

				})

			},
			error: function() {
				console.log('FAILURE!');
			},
		});
		
		
		// PUT
		var inputName = $('#update-name-input-old');
		inputName = JSON.stringify(inputName.val());
		inputName = inputName.substring(1, (inputName.length - 1) );
		var inputScreenName = $('#update-name-input-new');
		inputScreenName = JSON.stringify(inputScreenName.val());
		inputScreenName = inputScreenName.substring(1, (inputScreenName.length - 1) );

		// New Code
			$.ajax({
			url: '/update_name_combo',
			type: 'PUT',
			cache: false,
			contentType: 'application/json',
			success: function(response) {
				console.log('response: ' + response);
				//console.log('inputName: ' + inputName);
				//console.log('inputScreenName: ' + inputScreenName);

			},
			error: function() {
				console.log('FAILURE!');
			},

		});

		
	});



	// Delete a tweet
	$('#delete-tweet-button').on('submit', function(event) {
		event.preventDefault();

		var deleteTweet = $('#delete-tweet-input');

		console.log('hello?');

		$.ajax({
			url: '/tweet_combo2',
			method: 'DELETE',
			cache: false,
			success: function(data) {
				console.log(getData[0]);

			},
			error: function() {
				console.log('FAILURE!');
			},


		})


	});

	
	
	
});