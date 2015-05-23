(function($, amplify, window, undefined){
	
	function init() {
		bindDOM();
		amplify.subscribe('ready', pingApi);
	}

	function bindDOM() {
		$('button[ping-api]').click(pingApi);
	}

	function pingApi() {
		$.ajax({
			url: '//' + __hsggServices.api.domain + '/ping'
		}).done(function(data) {
			$('div[api-log]').append(JSON.stringify(data));
		});
	}



	$(init);
}(jQuery, amplify, window));