(function($, amplify, window, undefined) {
	var user;
	var playerClass;
	var opponentClass;

	function init() {
		bindDOM();
		amplify.subscribe('ready', pingApi);
		amplify.subscribe('app:game-results', submitGame);
		amplify.subscribe('app:user', function(d){ user = d; });
		amplify.subscribe('app:friendly-hero', function(data) {
			playerClass = __hsggHeroToClass(__hsggFormat(data.cardName));
		});
		amplify.subscribe('app:opposing-hero', function(data) {
			opponentClass = __hsggHeroToClass(__hsggFormat(data.cardName));
		});
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
				opponentName: data.opponentName,
				playerClass: playerClass,
				opponentClass: opponentClass 
			};		
		} else {
			toSend = {
				reporterId: user._id,
				status: 'LOSS',
				name: data.name,
				opponentName: data.opponentName,
				playerClass: playerClass,
				opponentClass: opponentClass 
			};
		}
		$.post('//' + __hsggServices.api.domain + '/game', toSend)
		.done(function(data) {
			amplify.publish('app:submitted', data);
		});
	}



	$(init);
}(jQuery, amplify, window));