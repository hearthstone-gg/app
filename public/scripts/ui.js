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
	}

	$(init);
}(jQuery,amplify));