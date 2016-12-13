var express = require('express'); //init express
var app = require('express')(); //init app
var http = require('http').Server(app); //init server
var io = require('socket.io')(http); //init socket.io

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));

app.get('/', function(req, res){
  console.log('http req recieved');
  res.sendFile(__dirname + '/chatbox.html', global=__dirname);
});

io.on('connection', function(socket){
  console.log("user connected");
  io.emit("server message", 'Please enter your username')
  var usr;
  socket.on('submission', function(msg){
    if(usr===undefined){
      usr = msg;
      socket.emit("server message", "Welcome " + usr + "!");
      socket.broadcast.emit("server message", "User "  + usr + " connected.");
      console.log("user chose name " + usr);
    }else{
      io.emit('submission', usr + ": "+ msg);
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
