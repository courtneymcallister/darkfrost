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
    icon: 'partly-cloudy',
    apparentTemperature: 75.1,
    precipProbability: 0.30,
    humidity: 0.61,
    location: 'Gainesville, FL'
  }
});
