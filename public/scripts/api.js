(function($, amplify, window, undefined) {
	var user;
	function init() {
		bindDOM();
		amplify.subscribe('ready', pingApi);
		amplify.subscribe('app:game-results', submitGame);
		amplify.subscribe('app:user', function(d){ user = d; });
	}

	function bindDOM() {
		$('button[ping-api]').click(pingApi);
	}

	function pingApi() {
		$.ajax({
			url: '//' + __hsggServices.api.domain + '/ping'
		}).done(function(data) {
			$('div[api-log]').append(JSON.stringify(data));
		});
	}

	function submitGame(data) {
		var toSend
		if (data.status === 'WIN') {
			toSend = {
				reporterId: user._id,
				status: 'WIN',
				name: data.name,
				opponentName: data.opponentName
			};		
		} else {
			toSend = {
				reporterId: user._id,
				status: 'LOSS',
				name: data.name,
				opponentName: data.opponentName
			};
		}
		$.post('//' + __hsggServices.api.domain + '/game', toSend)
		.done(function(data) {
			amplify.publish('app:submitted', data);
		});
	}



	$(init);
}(jQuery, amplify, window));