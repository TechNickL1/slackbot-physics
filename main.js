var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var convert = require('convert-units')
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', function (req, res) {
  console.log("Incoming POST request:")
  console.log(req.body)
  res.set("Content-type", "application/json")
  if(req.body.command==="/convert"){
    var msg=req.body.text;
    var regex = /.*[0-9]+\.*[0-9]* .+/ig;
    var params = msg.split(" ");
    if(params[0] === "help"){
      res.send({"response_type":"ephemeral", "text":"Usage: /convert [value] [units from] [units to (optional)]\nPlease use spaces :)"});
    }else if(regex.test(msg)){
      res.send({"response_type":"ephemeral", "text":"Oops! Something went wrong. Try \"/convert help\" for help."});
    }else if(!(convert().possibilities().indexOf(params[1]) >= 0)){
      res.send({"response_type":"ephemeral", "text":"Invalid units. Please use one of the following: " + convert().possibilities()});
    }else if(params[2] !== null && convert().possibilities().indexOf(params[2]) >= 0){
      var ans = convert(params[0]).from(params[1]).to(params[2]);
      res.send({"response_type":"in_channel", "text":params[0] + " " + params[1] + " = " + ans + " " + params[2]});
    }else if(params[2] !== null && !(convert().possibilities().indexOf(params[2]) >= 0)){
      res.send({"response_type":"ephemeral", "text":"Invalid units. Please use one of the following: " + convert().possibilities()});
    }else if(!$.inArray(params[2], convert().possibilities())){
      res.send({"response_type":"ephemeral", "text":"Invalid units. Please use one of the following: " + convert().possibilities()});
    }else{
      var ans = convert(params[0]).from(params[1]).toBest()
      res.send({"response_type":"in_channel", "text":params[0] + " " + params[1] + " = " + ans});
    }
  }else if(req.body.command==="/help"){
    res.send({"response_type":"ephemeral", "text":"Commands:\n/convert"});
  }
})

http.listen(app.get('port'), function(){
  console.log('listening on *:', app.get('port'));
});
