var io = require('engine.io-client');

var _addr = window.location.protocol + '//' + window.location.host + ':' + window.location.port;

var socket;

function connect() {
	socket = new io.Socket(_addr, {
	    transports: ['polling']
	});

	socket.on('close', function() {
		console.log('Socket to server was closed.');
	})
}

function subscribe(eventName, callback) {
	var registerEvent = {
		eventName: '_registerEvent',
		data: eventName
	};

	socket.send(JSON.stringify(registerEvent));

	socket.on('message', function(data) {
		var dataObject = JSON.parse(data);

		if (dataObject.eventName == eventName) {
			callback.call(null, dataObject.data);
		}
	})
}

function send(eventName, data) {

}

module.exports.connect = connect;
module.exports.subscribe = subscribe;
module.exports.send = send;

