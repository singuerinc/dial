<style>

  .weather {
    display: inline-block;
    margin: 0;
    font-size: 3.5rem;
    line-height: 3rem;
    cursor: default;
  }

  .icon {
    font-family: 'weathericons';
    display: inline-block;
  }

  .icon i {
    font-style: normal;
  }

  .temperature {
    vertical-align: text-top;
    line-height: 4rem;
    display: inline-block;
  }

  .description {
    display: inline-block;
    font-size: 2rem;
    line-height: 4rem;
    vertical-align: top;
  }

  .icon-config {
    opacity: 0.1;
    width: 22px;
    height: 22px;
    display: none;
    background: url(../img/ic_settings.svg);
    background-size: 100%;
    cursor: pointer;
  }

  .icon-config:hover {
    opacity: 1;
  }

  .weather:hover .icon-config {
    display: inline-block;
  }
</style>

<template>
  <div class="weather">
    <div class="icon">
      <i v-bind:class="icon"></i>
    </div>
    <div class="temperature">{{ temperature }}</div>
    <div class="description">{{ description }}</div>
    <configure-weather v-bind:config.sync="config"></configure-weather>
  </div>
</template>

<script>

  var Vue = require('vue');
  var ConfigureWeather = require('./configure-weather.vue');
  Vue.config.debug = true;

  module.exports = Vue.extend({

    props: ["config"],

    components: {
      'configure-weather': ConfigureWeather
    },

    ready: function(){
      this.interval = setInterval(this.getWeather.bind(this), 6000);
      this.getWeather();

      this.$watch('config.unit + config.city + config.country', (function(){
        this.getWeather();
      }).bind(this));
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

        var city, country, unit;

        city = this.config.city.toLowerCase();
        country = this.config.country.toLowerCase();
        unit = this.config.unit.toLowerCase();


        this.jsonp("https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+", "+country+"') and u='"+unit+"'&format=json&u=c", (function(data) {
//        this.jsonp("https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid = 753692 and u='c'&format=json&u=c", (function(data) {
           this.weather = data.query.results.channel.item.condition;
        }).bind(this));

      }
    }

  });

</script>
