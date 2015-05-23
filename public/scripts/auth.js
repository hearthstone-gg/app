(function($, amplify, window, undefined){
	function init() {
		amplify.subscribe('ready', updateLink);
	}

	function updateLink() {
		$('[login]').attr('href', '//' + __hsggServices.auth.domain + '/auth/bnet');
	}

	$(init);
}(jQuery, amplify, window));