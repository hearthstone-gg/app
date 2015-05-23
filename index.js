require('pmx').init();
var argv = require('yargs').argv;

var config = require('hs.gg-config').get(argv.env || 'local').services.app;
var express = require('express');
var app = express();

app.use(express.static('public'));

var server = app.listen(config.port, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('App sserver listening at http://%s:%s', host, port);

});