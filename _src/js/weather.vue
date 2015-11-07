<style>

  @font-face {
      font-family: 'weathertimeregular';
      src: url('css/weathertime-webfont.eot');
      src: url('css/weathertime-webfont.eot?#iefix') format('embedded-opentype'),
           url('css/weathertime-webfont.woff2') format('woff2'),
           url('css/weathertime-webfont.woff') format('woff'),
           url('css/weathertime-webfont.ttf') format('truetype'),
           url('css/weathertime-webfont.svg#weathertimeregular') format('svg');
      font-weight: normal;
      font-style: normal;
  }

  .weather {
    display: inline-block;
    margin: 0;
    font-size: 4em;
    line-height: 50px;
    width: 120px;
  }

  .icon {
    font-family: 'weathertimeregular';
    display: inline-block;
  }

  .temperature {
    width: 62px;
    display: inline-block;
  }

  .description {
    display: block;
    font-size: 0.3em;
  }
</style>

<template>
  <div class="weather">
    <div class="icon">{{ icon }}</div>
    <div class="temperature">{{ temperature }}</div>
  </div>
</template>

<script>

  var Vue = require('vue');

  module.exports = Vue.extend({

    ready: function(){
      this.interval = setInterval(this.getWeather.bind(this), 300000);
      this.getWeather();
    },

    data: function(){
      return {
        icons: {
          '01d': 'A',
          '02d': 'C',
          '03d': 'D',
          '04d': 'D',
          '09d': 'F',
          '10d': 'F',
          '11d': 'U',
          '13d': 'o',
          '50d': 'N',
          '01n': 'I',
          '02n': 'J',
          '03n': 'J',
          '04n': 'J',
          '09n': 'K',
          '10n': 'K',
          '11n': 'U',
          '13n': 'o',
          '50n': 'N'
        },
        weather: {
          "list": [
            {
              "main": {
                "temp": undefined
              },
              "weather": [
                {
                  "description": "scattered clouds",
                  "icon": "03n"
                }
              ]
            }
          ]
        }
      }
    },

    computed: {
      temperature: function(){
        var temp = this.weather.list[0].main.temp;
        if(typeof(temp) == 'undefined'){
          return;
        } else {
          return parseInt(temp) + '°';
        }
      },
      icon: function(){
        return this.icons[this.weather.list[0].weather[0].icon];
      },
      description: function(){
        return this.weather.list[0].weather[0].description;
      }
    },

    methods: {

      jsonp: function(url, callback) {
          var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
          window[callbackName] = function(data) {
              delete window[callbackName];
              document.body.removeChild(script);
              callback(data);
          };

          var script = document.createElement('script');
          script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
          document.body.appendChild(script);
      },

      getWeather: function(){
        var api_key = "f0b007379b26039149c9e4957236fdb1";
        this.jsonp("http://api.openweathermap.org/data/2.5/find?q=Barcelona,es&units=metric&appid="+api_key, (function(data) {
           this.weather = data;
        }).bind(this));

      }
    }

  });

</script>
