var express = require('express');
var server = express();
var port = process.env.PORT || 8080;
var axios = require('axios');
var darkskyAPIKey = process.env.DARKSKY_API || require('./secrets').darkskyAPIKey;
var geocodeAPIKey = process.env.GEOCODE_API || require('./secrets').geocodeAPIKey;

server.use(express.static(__dirname + '/public'));

server.get('/', function(request, response){
  response.sendFile('index.html', {root: __dirname + '/public/html/'});
});

server.get('/weather/:lat,:lon', function(req, res){
  var latitude = req.params.lat;
  var longitude = req.params.lon;
  var url = `https://api.darksky.net/forecast/${darkskyAPIKey}/${latitude},${longitude}`;
  axios.get(url)
       .then(function(response){
          res.send(response.data);
       })
       .catch(function(err){
          res.send(err);
       });
});

server.get('/location/:address', function(req, res){
  var address = req.params.address;
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocodeAPIKey}`
  axios.get(url)
     .then(function(response){
        res.send(response.data);
     })
     .catch(function(err){
        res.send(err);
     });
});

server.listen(port, function(){
  console.log('Now listening on port...', port);
});
