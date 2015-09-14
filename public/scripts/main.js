/*
loads the server config and exposes on __hsggServices
proxies desktop app events to amplify events

publishes
	ready
*/
(function($, window, undefined){
	var user;
	
	//publishes an amplify event when getting a postMessage event from the desktop app
	function receiveMessage(event) {
		amplify.publish('app:'+event.data.type, event.data.data || null);
	}

	function init() {
		//load the service config then publish the ready event
		$.get('/services.json', function(config){
			window.__hsggServices = JSON.parse(config);
			amplify.publish('ready');
			amplify.subscribe('app:game-over', findWinner);
		});

		window.addEventListener("message", receiveMessage, false);
	}

	$(init);
	amplify.subscribe('app:user', function(d){user = d;});

	window.__hsggFormat = function(str) {
		return str.toLowerCase().replace(' ', '-').replace('\'', '-');
	};

	window.__hsggHeroToClass = function(hero) {
		switch(hero) {
			case 'medivh':
			case 'jaina-proudmoore':
				return 'mage';
			case 'thrall':
				return 'shaman';
			case 'magni-bronzebeard':
			case 'garrosh-hellscream':
				return 'warrior';
			case 'valeera-sanguinar':
				return 'rogue';
			case 'uther-lightbringer':
				return 'paladin';
			case 'rexxar':
			case 'alleria-windrunner':
				return 'hunter';
			case 'malfurion-stormrage':
				return 'druid';
			case 'gul-dan':
				return 'warlock';
			case 'anduin-wrynn':
				return 'priest';
		}
	};

	function findWinner(data) {
		var oppName;
		var status;
		data.forEach(function(d) {
			if (d.status === 'WON') {
				if (__hsggFormat(d.name) === __hsggFormat(user.displayName)) {
					status = 'WIN';
				} else {
					oppName = __hsggFormat(d.name);
				}
			} else {
				if (__hsggFormat(d.name) === __hsggFormat(user.displayName)) {
					status = 'LOSS';
				} else {
					oppName = __hsggFormat(d.name);
				}
			}
		});
		if (!status) { return; }
		amplify.publish('app:game-results', {
			status: status,
			name: __hsggFormat(user.displayName),
			opponentName: oppName
		});
	}
}(jQuery, window));