var app = new Vue({
  el: '#app',
  data: {
    message: 'vue is still working'
  }
});

var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    time: 10000000,
    summary: 'Partly Cloudy',
    icon: 'partly-cloudy-day',
    apparentTemperature: 75.1,
    precipProbability: 0.30,
    humidity: 0.61,
    location: 'Gainesville, FL',
    latitude: 29.1,
    longitude: -81.4
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    },
    getWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url) //gets data and updates the state
           .then(function(response){
             var data = response.data.currently;
             Object.keys(data).forEach(function(dataLabel){
               currentlyWidget[dataLabel] = data[dataLabel];
             })
           })
           .catch(function(error){
             console.log(error);
           });
    },
    updateWeather: function(){
      this.getWeather(this.latitude,this.longitude);
    },

  },
  created: function(){
    this.getWeather(29.1, -81.4);
  }
});

var hourlyWidget = new Vue({
  el: '#hourly',
  data: {
    summary: "it's gonna rain!",
    icon: "rain",
    hours: []

  },
  methods: {
    getMainIcon: function(){
      return `/images/${this.icon}.png`;
    },
    getHourlyWeather: function(lat, lon){
      var url = `weather/${lat},${lon}`;
      axios.get(url)
           .then(function(response){
             var hourlyData = response.data.hourly;
             this.summary = hourlyData.summary;
             this.icon = hourlyData.icon;
             this.hours = hourlyData.data;
           }.bind(this))
           .catch(function(error){
             console.log(error);
           });
    },
    getHourlyIcon: function(iconString){
      return `/images/${iconString}.png`;
    },
    getDate: function(seconds){
      var date = new Date(seconds * 1000);
      var month = date.getMonth();
      var year = date.getFullYear();
      var day = date.getDay();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      return `${month + 1}/${day}/${year} ${hour}:0${minutes}`;
    }
  },
  created: function(){
    this.getHourlyWeather(29.1, -81.4);
  }
});

var dailyWidget = new Vue({
  el: '#daily',
  data: {
    summary: 'Partly Cloudy',
    icon: 'partly-cloudy-day',
    location: 'Gainesville, FL'
  },
  methods: {
    iconUrl: function(iconString){
      return `images/${iconString}.png`;
    },
    getWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url) //gets data and updates the state
           .then(function(response){
             var data = response.data.daily;
             Object.keys(data).forEach(function(dataLabel){
               dailyWidget[dataLabel] = data[dataLabel];
             })
           })
           .catch(function(error){
             console.log(error);
           });
    },
    updateWeather: function(){
      this.getWeather(this.latitude,this.longitude);
    }


  },
  created: function(){
    this.getWeather(29.1, -81.4);
  }
});
