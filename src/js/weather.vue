<style>

  .weather {
    display: inline-block;
    margin: 0;
    font-size: 4em;
    line-height: 50px;
    width: 135px;
  }

  .icon {
    font-family: 'weathericons';
    display: inline-block;
  }

  .icon i {
    font-style: normal;
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
    <div class="icon">
      <i v-bind:class="icon"></i>
    </div>
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
        weather: {
          code: '',
          date: '',
          temp: '',
          text: ''
        }
      }
    },

    computed: {
      temperature: function(){
        var temp = this.weather.temp;
        return temp == '' ? '' : (parseInt(temp) + '°');
      },
      icon: function(){
        return 'wi-yahoo-' + this.weather.code;
      },
      description: function(){
        return this.weather.text;
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

        var city = "barcelona";
        var country = "es";
        this.jsonp("https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+", "+country+"') and u='c'&format=json&u=c", (function(data) {
//        this.jsonp("https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid = 753692 and u='c'&format=json&u=c", (function(data) {
           this.weather = data.query.results.channel.item.condition;
        }).bind(this));

      }
    }

  });

</script>
