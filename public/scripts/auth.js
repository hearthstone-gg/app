(function($, amplify, window, undefined){
	var $login;

	function init() {
		getElements();
		amplify.subscribe('ready', updateLink);
		amplify.subscribe('app:user', loadUser);
	}

	function getElements() {
		$login = $('[login]');
	}

	function updateLink() {
		$login.attr('href', '//' + __hsggServices.auth.domain + '/auth/bnet');
	}

	function loadUser(user) {
		var str = JSON.stringify(user);
		$login.replaceWith('<strong>Logged In</strong><pre>' + str + '</pre>');
	}

	$(init);
}(jQuery, amplify, window));