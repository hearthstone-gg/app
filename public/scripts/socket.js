(function($, amplify, window, undefined){
	var socket;
	var user;

	function init() {
		getElements();
		bindDOM();
		amplify.subscribe('authed', onAuth);
		amplify.subscribe('ready', checkCreate);
	}

	function getElements() {

	}

	function bindDOM() {

	}
	function onAuth(u) {
		user = u;
		checkCreate();
	}
	function checkCreate() {
		//make sure the user has been authed and the server config have been loaded
		if (user && window.__hsggServices) {
			createSocket();
		}
	}

	//load socket.io
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

	//bind it the socket stuff
	function bindSocket() {
		socket.on('connect', function() {
			$('div[socket-log]').append('Connected to socket server<br />');
		});
		socket.emit('authed', user.token);
		socket.on('disconnect', function() {
			$('div[socket-log]').append('Disconnected from socket server<br />');
		});
		socket.on('ping', function() {
			$('div[socket-log]').append('Ping from socket server to token room<br />');
		});
	}


	$(init);
}(jQuery, amplify, window));