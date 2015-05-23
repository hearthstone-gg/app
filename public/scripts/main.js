(function($, window, undefined){
	function init() {
		$.get('/services.json', function(config){
			window.__hsggServices = JSON.parse(config);
			amplify.publish('ready');
		});
	}

	$(init);
}(jQuery, window));