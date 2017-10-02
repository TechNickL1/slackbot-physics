var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app); //init server
var io = require('socket.io')(http); //init socket.io

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log(req.body.type)
  console.log(req.body.text)
  if(req.body.type="message"){
    var msg=req.body.text
    var regex = /[0-9]+ *ft|feet|foot|in|inch|yard|yd|mi|mile|pound|lb|ton|psi|atm/ig;
  }
})

http.listen(app.get('port'), function(){
  console.log('listening on *:', app.get('port'));
});
