var ttn = require('ttn');

var binstruct = require('binstruct');
var messagedef = binstruct.def().int32le('id').int32le('counter').floatle('value1').floatle('value2').floatle('value3').floatle('value4').floatle('value5').uint32le('crc');

var express = require('express');
var pug = require('pug');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(express.static('public'));

var region = 'eu';
var appId = 'teensy_gps_temp';
var accessKey = 'ttn-account-v2.I1jULo27eRddHRSf5zh1nNURZltzJ3fk5F08h2SBZRY';

var client = new ttn.Client(region, appId, accessKey);

client.on('connect', function(connack) {
    console.log('[DEBUG]', 'Connect:', connack);
});

client.on('error', function(err) {
    console.error('[ERROR]', err.message);
});

client.on('activation', function(deviceId, data) {
    console.log('[INFO] ', 'Activation:', deviceId, data);
});

client.on('message', function(deviceId, data) {
  // console.info('[INFO] ', 'Message:', deviceId, JSON.stringify(data, null, 2));
  // console.log('[LOG] ', data.payload_raw);
  message = messagedef.read(data.payload_raw);

  // console.log(message.id);
  // console.log(message.counter);
  // console.log(message.value1);
  // console.log(message.value2);
  // console.log(message.value3);
  // console.log(message.value4);
  // console.log(message.value5);
  // console.log(message.crc);
});


var server = app.listen(3007, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

app.get("/", function(req, res) {
  res.render('index');
});
