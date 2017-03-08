var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    time: 10000000,
    summary: 'Partly Cloudy',
    icon: 'partly-cloudy-day',
    temperature: 70,
    apparentTemperature: 75.1,
    precipProbability: 0.30,
    humidity: 0.61,
    location: 'Gainesville, FL',
    latitude: 29.1,
    longitude: -81.4,
    windSpeed: 10
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    },
    getWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
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
    updateLocation: function(address){
      var url = `/location/${address}`;
      axios.get(url)
           .then(function(response){
             var loc = response.data.results[0].geometry.location;
             var newAddress = response.data.results[0].formatted_address;
             this.latitude = loc.lat;
             this.longitude = loc.lng;
             this.getWeather(this.latitude, this.longitude);
             this.location = newAddress;
             minutelyWidget.location = newAddress;
             hourlyWidget.location = newAddress;
             dailyWidget.location = newAddress;
             minutelyWidget.getMinutelyWeather(this.latitude, this.longitude);
             hourlyWidget.getHourlyWeather(this.latitude, this.longitude);
             dailyWidget.getDailyWeather(this.latitude, this.longitude);
           }.bind(this))
           .catch(function(error){
             console.log(error);
           });

    },
    getDate: function(seconds){
      var date = new Date(seconds * 1000);
      var weekday = date.getDay();
      var day = date.getDate();
      var month = date.getMonth();
      var dayOfTheWeek = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var monthOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var aOrP = ['a.m.', 'p.m.']
      return `${dayOfTheWeek[weekday]}, ${monthOfTheYear[month]} ${day} at ${(hour === 0 || hour === 12) ? 12 : hour % 12}:${minutes < 10 ? '0' + minutes : minutes} ${hour < 12 ? aOrP[0]: aOrP[1]}`;
    },
    formatPercents: function(percent){
      return percent * 100;
    },
  },
  created: function(){
    this.getWeather(this.latitude, this.longitude);
  }
});

var hourlyWidget = new Vue({
  el: '#hourly',
  data: {
    summary: "it's gonna rain!",
    icon: "rain",
    location: "Gainesville, FL",
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
      var day = date.getDay();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var dayOfTheWeek = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var monthOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      var aOrP = ['a.m.', 'p.m.']
      return `${monthOfTheYear[month]} ${day}, ${(hour === 0 || hour === 12) ? 12 : hour % 12}:0${minutes} ${hour < 12 ? aOrP[0]: aOrP[1]}`;
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
    time: 100000,
    location: 'Gainesville, FL',
    days: []
  },
  methods: {
    getDailyIcon: function(iconString){
      return `/images/${iconString}.png`;
    },
    getDailyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url) //gets data and updates the state
           .then(function(response){
             var dailyData = response.data.daily;
             Object.keys(dailyData).forEach(function(dataLabel){
               dailyWidget[dataLabel] = dailyData[dataLabel];
             })
             this.days = dailyData.data;
           }.bind(this))
           .catch(function(error){
             console.log(error);
           });
    },
    updateWeather: function(){
      this.getDailyWeather(this.latitude,this.longitude);

    },
    getDate: function(seconds){
      var date = new Date(seconds * 1000);
      var weekday = date.getDay();
      var day = date.getDate();
      var month = date.getMonth();
      var dayOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var monthOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return `${dayOfTheWeek[weekday]}, ${monthOfTheYear[month]} ${day}`;
    }
  },
  created: function(){
    this.getDailyWeather(29.1, -81.4);
    this.getDate(this.time);
  }
});

var minutelyWidget = new Vue({
  el: '#minutely',
  data: {
    summary: 'Partly Cloudy',
    icon: 'partly-cloudy-day',
    location: 'Gainesville, FL',
    precipProbability: 5,
    precipIntensity: 5,
    minutes: []
  },
  methods: {
    getIcon: function(){
      return `/images/${this.icon}.png`;
      console.log(iconString);
    },
    getMinutelyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
           .then(function(response){
             var minutelyData = response.data.minutely;
             Object.keys(minutelyData).forEach(function(property){
               minutelyWidget[property] = minutelyData[property];
             })
             this.minutes = minutelyData.data;
           }.bind(this))
           .catch(function(error){
             console.log(error);
           });
    },
    updateWeather: function(){
      this.getMinutelyWeather(this.latitude, this.longitude)
    },
    getDate: function(seconds){
      var date = new Date(seconds * 1000);
      var hour = date.getHours();
      var minutes = date.getMinutes();
      return `${hour % 12}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
  },
  created: function(){
    this.getMinutelyWeather(29.1,-81.4);
  }
});
