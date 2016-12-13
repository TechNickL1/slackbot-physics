var socket = io(); //connect
$('form').submit(function(){
  socket.emit("submission", $('#m').val());
  $('#m').val('');
    return false;
});
socket.on("submission", function(usr, msg){
  $('#messages').append($('<li>').html("<name>"+usr+": </name>" + msg));
});
socket.on("server message", function(msg){
  $('#messages').append($('<li class="svrmsg">').text(msg));
});
socket.on("name set", function(){
  $('#m').attr("placeholder", "Say something!");
});
