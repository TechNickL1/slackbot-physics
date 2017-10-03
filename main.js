var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var convert = require('convert-units')
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }));

var units =

app.post('/', function (req, res) {
  console.log("Incoming POST request:")
  console.log(req.body)
  res.set("Content-type", "application/json")
  if(req.body.command==="/convert"){
    var msg=req.body.text;
    var regex = /.*[0-9]+\.*[0-9]* .+/ig;
    var params = msg.split(" ");
    if(params[0] === "help"){
      if(params.length === 1){
        console.log("basic help");
        res.send({"response_type":"ephemeral", "text":"Usage: /convert [value] [units from] [units to (optional)]\nPlease use spaces and lowercase only :)\nFor units with exponents, omit the ^. Only simple exponents (cm2 etc) are valid.\nIf you want to know more about a unit, type \"convert help [unit]\""});
      }else if(convert().possibilities().indexOf(params[1]) >= 0){
          res.send({"response_type":"in_channel", "text":""});
      }
    }else if(!regex.test(msg)){
      console.log("invalid message, failed regex");
      res.send({"response_type":"ephemeral", "text":"Oops! Something went wrong. Try \"/convert help\" for help."});
    }else if(!(convert().possibilities().indexOf(params[1]) >= 0)){
      console.log("first units invalid");
      res.send({"response_type":"ephemeral", "text":"Invalid units. Please use one of the following: " + convert().possibilities()});
    }else if(params.length >= 3 && convert().possibilities().indexOf(params[2]) >= 0){
      console.log("has destination units, and theyre correct");
      try{
        var ans = convert(params[0]).from(params[1]).to(params[2]);
        res.send({"response_type":"in_channel", "text":params[0] + " " + params[1] + " = " + ans + " " + params[2]});
      }catch(err){
          res.send({"response_type":"ephemeral", "text":"Incompatible units, try again."});
      }
    }else if(params.length >= 3 && !(convert().possibilities().indexOf(params[2]) >= 0)){
      console.log("has destination units, and theyre incorrect");
      res.send({"response_type":"ephemeral", "text":"Invalid units. Please use one of the following: " + convert().possibilities()});
    }else{
      var ans = convert(params[0]).from(params[1]).toBest({exclude: ['ha', 'kanna']});
      res.send({"response_type":"in_channel", "text":params[0] + " " + params[1] + " = " + ans.val + " " + ans.unit});
    }
  }else if(req.body.command==="/physbot"){
    var msg=req.body.text;
    var params = msg.split(" ");
    if(params[1]==="help"){
      res.send({"response_type":"ephemeral", "text":"Commands:\n/convert"});
    }else if(params[1]==="admin" && params[2] === "assumingdirectcontrol"){
      msg="";
      for(var i=2; i<params.length; i++){
        msg+=params[i] + " ";
      }
      res.send({"response_type":"in_channel", "text":msg});
    }
  }
})

http.listen(app.get('port'), function(){
  console.log('listening on *:', app.get('port'));
});
