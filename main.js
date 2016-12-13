var express = require('express'); //init express
var app = require('express')(); //init app
var http = require('http').Server(app); //init server
var io = require('socket.io')(http); //init socket.io

app.set('port', (process.env.PORT || 5000));

app.use(express.static("public"));
app.use("/bootstrap/css", express.static("node_modules/bootstrap/dist/css"));
app.use("/bootstrap/js", express.static("node_modules/bootstrap/dist/js"));
app.use("/jq", express.static("node_modules/jquery/dist"));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/chatbox.html");
});

io.on('connection', function(socket){
  socket.emit("server message", "Please enter your username")
  var usr;
  socket.on("submission", function(msg){
    var regex = /(<([^>]+)>)/ig;
    msg = msg.replace(regex, "");
    if(usr===undefined){
      if(msg===""){
        socket.emit("server message", "Invalid username. Please try again.");
      }else{
        usr = msg;
        socket.emit("name set");
        socket.emit("server message", "Welcome " + usr + "!");
        socket.broadcast.emit("server message", "User "  + usr + " connected.");
        console.log("user chose name " + usr);
      }
    }else{
      io.emit("submission", usr, msg);
    }
  });
  socket.on('disconnect', function(){
    io.emit("server message", usr + " has left.")
  })
});

//begin listening
http.listen(app.get('port'), function(){
  console.log('listening on *:', app.get('port'));
});
