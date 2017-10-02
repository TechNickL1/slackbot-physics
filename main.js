const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var http = require('http').Server(app); //init server
var io = require('socket.io')(http); //init socket.io

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }))
 
app.post('/', function (req, res) {
  const msg=req.body.Body
  //var regex = /[0-9]+ *ft|feet|foot|in|inch|yard|yd|mi|mile|pound|lb|ton|psi|atm/ig;
  res.set('Content-Type', 'text/plain')
  res.send(req.body.challenge)
})
 
// Tell our app to listen on port 3000
app.listen(3000, function (err) {
  if (err) {
    throw err
}
 
http.listen(app.get('port'), function(){
  console.log('listening on *:', app.get('port'));
});
