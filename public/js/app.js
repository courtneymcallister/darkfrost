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
    updateWeather: function(){
      var url = `/weather/${this.latitude},${this.longitude}`;
      axios.get(url)
           .then(function(response){
             var data = response.data.currently;
             currentlyWidget.time = data.time;
             currentlyWidget.summary = data.summary;
             currentlyWidget.icon = data.icon;
             currentlyWidget.apparentTemperature = data.apparentTemperature;
             currentlyWidget.precipProbability = data.precipProbability;
             currentlyWidget.humidity = data.humidity;
           })
           .catch(function(error){
             console.log(error);
           });
    }
  },
  created: function(){
    axios.get('/weather/29.1,-81.4')
         .then(function(response){
           var data = response.data.currently;
           currentlyWidget.time = data.time;
           currentlyWidget.summary = data.summary;
           currentlyWidget.icon = data.icon;
           currentlyWidget.apparentTemperature = data.apparentTemperature;
           currentlyWidget.precipProbability = data.precipProbability;
           currentlyWidget.humidity = data.humidity;
         })
         .catch(function(error){
           console.log(error);
         });
  }
});

var dailyWidget = new Vue({
  el: '#daily',
  data: {
    summary: 'not dynamic',
    icon: 'partly-cloudy-day',
    location: 'Gainesville, FL'
  },
  methods: {
    iconUrl: function(iconString){
      return `images/${iconString}.png`;
    }
  },
  created: function(){
    axios.get('/weather/29.1, -81.4')
         .then(function(response){
           var data = response.data.daily;
           dailyWidget.summary = data.summary;
           dailyWidget.icon = data.icon;

            // Object.keys(dailyWidget._data)
            //       .forEach(function(property){
            //         var data = response.data.daily;
            //         dataKey = eval('dailyWidget.' + property);
            //         dataKey = eval('data.' + property);
            //         console.log(dataKey);
            //       })

         })
         .catch(function(error){
           console.log(error);
         });
  }
});
