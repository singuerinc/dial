<style>

  .weather {
    display: inline-block;
    padding: 0 20px;
    font-size: 3.5rem;
    line-height: 3rem;
    cursor: pointer;
  }

  .weather:hover {
    color: grey;
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
</style>

<template>
  <div class="weather" v-on:click="openConf()">
    <div class="icon">
      <i v-bind:class="icon"></i>
    </div>
    <div class="temperature">{{ temperature }}</div>
    <div class="description">{{ description }}</div>
  </div>
  <configure-weather v-ref:configurator v-bind:config.sync="config"></configure-weather>
</template>

<script>

  var Vue = require('vue');
  var ConfigureWeather = require('./configure-weather.vue');

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

      openConf: function(){
        this.$refs.configurator.open();
      },

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

        var city = this.config.weather.city.toLowerCase(),
          country = this.config.weather.country.toLowerCase(),
          unit = this.config.weather.unit.toLowerCase();

        this.jsonp("https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+", "+country+"') and u='"+unit+"'&format=json&u=c", (function(data) {
//        this.jsonp("https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid = 753692 and u='c'&format=json&u=c", (function(data) {
           this.weather = data.query.results.channel.item.condition;
        }).bind(this));

      }
    }

  });

</script>
