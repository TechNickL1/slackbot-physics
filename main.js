var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app); //init server
var io = require('socket.io')(http); //init socket.io

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());

app.post('/', function (req, res) {
  //const msg=req.body.Body
  //var regex = /[0-9]+ *ft|feet|foot|in|inch|yard|yd|mi|mile|pound|lb|ton|psi|atm/ig;
  console.log(req.body.challenge)
  res.send(req.body.challenge)
})

http.listen(app.get('port'), function(){
  console.log('listening on *:', app.get('port'));
});
