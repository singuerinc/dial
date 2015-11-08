<style>

  .configure-window .weather_units .weather_unit {
    font-size: 3rem;
    float: left;
    display: inline-block;
  }

  .configure-window .weather_units .unit_c {
    margin-left: 20px;
  }
</style>

<template>
  <div v-el:modal class="configure-modal modal">
    <div class="configure-window window">
      <div class="close-btn" v-on:click="close()"></div>
      <h1 class="title">WEATHER</h1>
      <hr>
      <div class="row">
        <label for="config_country">YOUR COUNTRY</label>
        <select name="config_country" id="config_country" v-model="configTmp.country">
          <option v-for="country in config.weather.countries" value="{{country.code}}">{{country.name}}</option>
        </select>
      </div>
      <div class="row">
        <label for="config_city">YOUR CITY</label>
        <input id="config_city" type="text" v-model="configTmp.city">
      </div>
      <div class="row weather_units">
        <label for="config_city">UNIT</label>
        <span class="weather_unit unit_f">°F</span>
        <input type="radio" id="unit_f" value="f" v-model="configTmp.unit">
        <span class="weather_unit unit_c">°C</span>
        <input type="radio" id="unit_c" value="c" v-model="configTmp.unit">
      </div>
      <div class="row save">
        <button class="btn config_save" v-on:click="save()">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>

var Vue = require('vue');

module.exports = Vue.extend({

props: ["config"],

data: function(){
  return {
    configTmp: {
      unit: this.config.weather.unit,
      country: this.config.weather.country,
      city: this.config.weather.city
    }
  };
},

methods: {
  open: function(){
    this.$els.modal.classList.add('on');
  },
  save: function(){
    this.config.weather.unit = this.configTmp.unit;
    this.config.weather.country = this.configTmp.country;
    this.config.weather.city = this.configTmp.city;
    this.close();
  },
  close: function(){
    this.configTmp.unit = this.config.weather.unit;
    this.configTmp.country = this.config.weather.country;
    this.configTmp.city = this.config.weather.city;
    this.$els.modal.classList.remove('on');
  }
},

computed: {
}

});

</script>
