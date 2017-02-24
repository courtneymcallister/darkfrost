var axios = require('axios');
var apiKey = require('./secrets').darkskyAPIKey;
var url = `https://api.darksky.net/forecast/${apiKey}/37.8267,-122.4233`;
// var sample = require('./sampleModule');
// console.log(sample);
// sample.a();

// var promiseOfData = axios.get(url);
// promiseOfData
//     .then(function(response){
//       console.log(response.data);
//     }) // success
//     .catch(function(err){
//       console.log(err);
//     }); // failure or error

axios.get(url)
     .then(function(response){
        return response.data;
     })
     .then(function(data){
       console.log(data);
     })
     .catch(function(err){
        console.log(err);
     });
