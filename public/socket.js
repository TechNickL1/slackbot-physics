var socket = io(); //connect
$('form').submit(function(){
  $('#m').attr("placeholder", "Say something!");
  socket.emit('submission', $('#m').val());
  $('#m').val('');
    return false;
});
socket.on('submission', function(msg){
  $('#messages').append($('<li>').text(msg));
});
socket.on('server message', function(msg){
  $('#messages').append($('<li class="svrmsg">').text(msg));
})
