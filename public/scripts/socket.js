/*
when the user has been authed, connects to the socket server
proxies scoket events to amplify events
notifys the socket server of the user's token for subscribing to updates

publishes
	socket:connect
*/
(function($, amplify, window, undefined){
	var socket;
	var user;

	function init() {
		getElements();
		bindDOM();
		amplify.subscribe('app:user', onAuth);
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
			proxySocket();
		};
		script.async = true;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	var proxyEvents = ['disconnect', 'ping'];

	//bind it the socket stuff
	function proxySocket() {
		proxyEvents.forEach(function(event){
			socket.on(event, function(data) {
				amplify.publish('socket:'+event, data || null);
			});
		});
		socket.on('connect', function() {
			socket.emit('subscribe', user.token);
			amplify.publish('socket:connect');
		});
	
	}


	$(init);
}(jQuery, amplify, window));