(function($, amplify, window, undefined){
	var socket;

	function init() {
		getElements();
		bindDOM();
		amplify.subscribe('ready', createSocket);
	}

	function getElements() {

	}

	function bindDOM() {

	}

	function createSocket() {
		var script = document.createElement('script');
		script.src = '//' + __hsggServices.socket.domain + '/socket.io/socket.io.js';
		script.onload = function() {
			socket = io.connect('//' + __hsggServices.socket.domain);
			bindSocket();
		};
		script.async = true;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	function bindSocket() {
		socket.on('connect', function() {
			$('div[socket-log]').append('Connected to socket server<br />');
		});
		socket.on('disconnect', function() {
			$('div[socket-log]').append('Disconnected from socket server<br />');
		});
		socket.on('ping', function() {
			$('div[socket-log]').append('Ping from socket server<br />');
		});
	}


	$(init);
}(jQuery, amplify, window));