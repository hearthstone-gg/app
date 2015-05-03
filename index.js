var express = require('express');
var app = express();
var port = 3001;

app.use(express.static('public'));

var server = app.listen(port, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('App sserver listening at http://%s:%s', host, port);

});