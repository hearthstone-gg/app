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
				'guldan',
				'anduin-wrynn'
			];
			var $els = $(selector);
			classes.forEach(function(className) {
				$els.removeClass(className);
			});
		}

		function format(str) {
			return str.toLowerCase().replace(' ', '-').replace('\'', '-')
		}

		amplify.subscribe('app:friendly-hero', function(data) {
			gameEvent();
			$('[game-log]').append('friendly-hero ' + JSON.stringify(data) + '<br />');
			removeClasses('[player-class]');
			$('[player-class]').addClass(format(data.cardName));
			$('.class-icons').removeClass('victory').removeClass('defeat');
			$('.class-icons').addClass('started');
		});
		amplify.subscribe('app:opposing-hero', function(data) {
			gameEvent();
			$('[game-log]').append('opposing-hero ' + JSON.stringify(data) + '<br />');
			removeClasses('[opponent-class]');
			$('[opponent-class]').addClass(format(data.cardName));
			$('.class-icons').removeClass('victory').removeClass('defeat');
		});
		amplify.subscribe('app:game-start', function(data) {
			gameEvent();
			$('[game-log]').append('game-start ' + JSON.stringify(data) + '<br />');
		});
		amplify.subscribe('app:game-over', function(data) {
			gameEvent();
			$('[game-log]').append('game-over ' + JSON.stringify(data) + '<br />');
			$('.class-icons').removeClass('started');
			data.forEach(function(d) {
				if (d.status === 'WON') {
					if (format(d.name) === format(user.displayName)) {
						$('.class-icons').addClass('victory');
					}
				} else {
					if (format(d.name) === format(user.displayName)) {
						$('.class-icons').addClass('defeat');
					}
				}
			});
		});

		amplify.subscribe('app:user', function(u){
			user = u;
		});
	}

	$(init);
}(jQuery, amplify));