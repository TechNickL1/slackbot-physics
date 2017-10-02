var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app); //init server
var io = require('socket.io')(http); //init socket.io

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log("Incoming POST request:")
  console.log("type = "+req.body.event.type)
  console.log("content = "+req.body.event.text)
  if(req.body.event.type="message"){
    var msg=req.body.event.text
    var regex = /.*[0-9]+ *ft|feet|foot|in|inch|yard|yd|mi|mile|pound|lb|ton|psi|atm.*/ig;
    if(msg === regex){
      console.log("unit found")
    }
  }
})

http.listen(app.get('port'), function(){
  console.log('listening on *:', app.get('port'));
});
