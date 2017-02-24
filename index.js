var express = require('express');
var server = express();
var port = process.env.PORT || 8080;

var axios = require('axios');
var apiKey = require('./secrets').darkskyAPIKey;

server.get('/weather/:lat,:lon', function(req, res){
  var latitude = req.params.lat;
  var longitude = req.params.lon;
  var url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;

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