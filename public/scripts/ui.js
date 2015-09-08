(function($, amplify) {
	var user;

	function init() {
		bindEvents();
	}

	function bindEvents() {
		//status icon
		amplify.subscribe('socket:connect', function() {
			$('[status-icon]').addClass('connected');
		});
		amplify.subscribe('socket:disconnect', function() {
			$('[status-icon]').removeClass('connected');
		});
		amplify.subscribe('socket:ping', function() {
			$('[status-icon]').addClass('ping');
			setTimeout(function() {
				$('[status-icon]').removeClass('ping');
			}, 3000);
		});


		function gameEvent() {
			$('[game-status-icon]').addClass('ping');
			setTimeout(function() {
				$('[game-status-icon]').removeClass('ping');
			}, 3000);
		}

		function removeClasses(selector) {
			var classes = [
				'medivh',
				'thrall',
				'magni-bronzebeard',
				'garrosh-hellscream',
				'jaina-proudmoore',
				'valeera-sanguinar',
				'uther-lightbringer',
				'alleria-windrunner',
				'rexxar',
				'malfurion-stormrage',
				'gul-dan',
				'anduin-wrynn'
			];
			var $els = $(selector);
			classes.forEach(function(className) {
				$els.removeClass(className);
			});
		}

	
		amplify.subscribe('app:friendly-hero', function(data) {
			gameEvent();
			$('[game-log]').append('friendly-hero ' + JSON.stringify(data) + '<br />');
			removeClasses('[player-class]');
			$('[player-class]').addClass(__hsggFormat(data.cardName));
			$('.class-icons').removeClass('victory').removeClass('defeat');
			$('.class-icons').addClass('started');
		});
		amplify.subscribe('app:opposing-hero', function(data) {
			gameEvent();
			$('[game-log]').append('opposing-hero ' + JSON.stringify(data) + '<br />');
			removeClasses('[opponent-class]');
			$('[opponent-class]').addClass(__hsggFormat(data.cardName));
			$('.class-icons').removeClass('victory').removeClass('defeat');
		});
		amplify.subscribe('app:game-start', function(data) {
			gameEvent();
			$('[game-log]').append('game-start ' + JSON.stringify(data) + '<br />');
		});
		amplify.subscribe('app:game-results', function(data) {
			gameEvent();
			$('[game-log]').append('game-over ' + JSON.stringify(data) + '<br />');

			$('.class-icons').removeClass('victory').removeClass('defeat');
			$('.class-icons').removeClass('started');
			if (data.status === 'WIN') {
				$('.class-icons').addClass('victory');
			} else {
				$('.class-icons').addClass('defeat');
			}
		});
		amplify.subscribe('app:submitted', function(data){
			$('[submitted]').addClass('active');
			setTimeout(function() {
				$('[submitted]').removeClass('active');
			}, 10000);
		});

		amplify.subscribe('app:user', function(u){
			user = u;
		});
	}

	$(init);
}(jQuery, amplify));