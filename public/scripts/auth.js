(function($, amplify, window, undefined){
	var $login;
	var $logout;
	var $unlink;

	function init() {
		getElements();
		amplify.subscribe('ready', bindDOM);
		amplify.subscribe('app:user', loadUser);
	}

	function getElements() {
		$login = $('[login]');
		$logout = $('[logout]');
		$unlink = $('[unlink]');
	}

	function bindDOM() {
		$login.click(function() {
			$login.replaceWith('Redirecting to Battle.Net...');
			window.location = '//' + __hsggServices.auth.domain + '/auth/bnet';
			return false;
		});
		$logout.click(function() {
			window.location = 'http://us.battle.net/en/?logout';
		});
		$unlink.click(function() {
			window.location = '//' + __hsggServices.auth.domain + '/unlink/bnet';
		});
	}

	function loadUser(user) {
		var str = JSON.stringify(user);
		$login.replaceWith('<strong>Logged In</strong><pre>' + str + '</pre>');
		$logout.show();
		$unlink.show();
	}

	$(init);
}(jQuery, amplify, window));