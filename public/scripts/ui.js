(function($,amplify){
	function init() {
		bindEvents();
	}

	function bindEvents() {
		amplify.subscribe('socket:connect', function() {
			$('div[socket-log]').append('Connected to socket server<br />');
		});
		amplify.subscribe('socket:disconnect', function() {
			$('div[socket-log]').append('Disconnected from socket server<br />');
		});
		amplify.subscribe('socket:ping', function() {
			$('div[socket-log]').append('Ping from socket server to token room<br />');
		});

		amplify.subscribe('app:friendly-hero', function(data) {
			$('div[socket-log]').append('friendly-hero ' + JSON.stringify(data) + '<br />');
		});
		amplify.subscribe('app:opposing-hero', function(data) {
			$('div[socket-log]').append('opposing-hero ' + JSON.stringify(data) + '<br />');
		});
		amplify.subscribe('app:game-start', function(data) {
			$('div[socket-log]').append('game-start ' + JSON.stringify(data) + '<br />');
		});
		amplify.subscribe('app:game-over', function(data) {
			$('div[socket-log]').append('game-over ' + JSON.stringify(data) + '<br />');
		});

	}

	$(init);
}(jQuery,amplify));