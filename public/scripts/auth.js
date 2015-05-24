(function($, amplify, window, undefined){
	var $login;

	function init() {
		getElements();
		amplify.subscribe('ready', updateLink);
		window.addEventListener("message", receiveMessage, false);
	}

	function getElements() {
		$login = $('[login]');
	}

	function updateLink() {
		$login.attr('href', '//' + __hsggServices.auth.domain + '/auth/bnet');
	}

	function receiveMessage(event) {
		var user = JSON.stringify(event.data.data);
		if (event.data.type === 'user') {
			$login.replaceWith('<strong>Logged In</strong><pre>' + user + '</pre>');
			amplify.publish('authed', user);
		}
	}

	$(init);
}(jQuery, amplify, window));