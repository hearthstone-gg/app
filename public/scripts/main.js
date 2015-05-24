/*
loads the server config and exposes on __hsggServices
proxies desktop app events to amplify events

publishes
	ready
*/
(function($, window, undefined){
	
	//publishes an amplify event when getting a postMessage event from the desktop app
	function receiveMessage(event) {
		amplify.publish('app:'+event.data.type, event.data.data || null);
	}

	function init() {
		//load the service config then publish the ready event
		$.get('/services.json', function(config){
			window.__hsggServices = JSON.parse(config);
			amplify.publish('ready');
		});

		window.addEventListener("message", receiveMessage, false);
	}

	$(init);
}(jQuery, window));