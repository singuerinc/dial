<style>
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 20px;
  }

  .configure-window .weather_units .weather_unit, .configure-window .weather_units input[type="radio"] {
    font-size: 3rem;
    float: left;
    display: inline-block;
  }

  .configure-window .weather_units input[type="radio"] {
    height: 27px;
    width: 27px;
    margin: 1px 5px 0;
    -webkit-appearance: none;
    border: 1px solid #EEE;
    cursor: pointer;
    opacity: 1;
    position: relative;
  }

  .configure-window .weather_units input[type="radio"]:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 27px;
    height: 27px;
    content: '';
    display: block;
    background: url(../img/ic_clear_black_48px.svg);
    background-size: 100%;
    background-position: -1px -1px;
    opacity: 0;
  }

  .configure-window .weather_units input[type="radio"]:checked:after {
    opacity: 1;
  }

  .configure-window .weather_units input[type="radio"]:not(:checked):hover:after {
    opacity: 0.3;
  }

  .configure-window .weather_units .unit_c {
    margin-left: 20px;
  }

  .configure-window hr {
    border: 0;
    border-bottom: 1px solid #EEE;
    margin-bottom: 10px;
  }

  .configure-window .save {
    margin-top: 20px;
  }

  .configure-window #config_save {
    float: right;
  }

  .configure-window .btn {
    display: inline-block;
    padding: 10px 20px;
    border: 1px solid transparent;
    background: black;
    font-size: 2rem;
    color: white;
  }

  .configure-window .btn:hover {
    background: white;
    color: black;
    border: 1px solid black;
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
          <option v-for="country in config.countries" value="{{country.code}}">{{country.name}}</option>
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
        <button id="config_save" class="btn" v-on:click="save()">SAVE</button>
      </div>
    </div>
  </div>
  <div class="icon-config" v-on:click="open()"></div>
</template>

<script>

var Vue = require('vue');

module.exports = Vue.extend({

props: ["config"],

data: function(){
  return {
    configTmp: {
      unit: this.config.unit,
      country: this.config.country,
      city: this.config.city
    }
  };
},

methods: {
  open: function(){
    this.$els.modal.classList.add('on');
  },
  save: function(){
    this.config.unit = this.configTmp.unit;
    this.config.country = this.configTmp.country;
    this.config.city = this.configTmp.city;
    this.close();
  },
  close: function(){
    this.configTmp.unit = this.config.unit;
    this.configTmp.country = this.config.country;
    this.configTmp.city = this.config.city;
    this.$els.modal.classList.remove('on');
  }
},

computed: {
}

});

</script>
