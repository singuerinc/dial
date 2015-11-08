<style>

  .configure-window .clock_formats .clock_format {
    font-size: 3rem;
    float: left;
    display: inline-block;
  }

  .configure-window .clock_formats .format24 {
    margin-left: 20px;
  }


</style>

<template>
  <div v-el:modal class="configure-modal modal">
    <div class="configure-window window">
      <div class="close-btn" v-on:click="close()"></div>
      <h1 class="title">CLOCK</h1>
      <hr>
      <div class="row clock_formats">
        <label for="clock_format">FORMAT</label>
        <span class="clock_format format12">12h</span>
        <input type="radio" id="format12" value="12" v-model="configTmp.clock.format">
        <span class="clock_format format24">24h</span>
        <input type="radio" id="format24" value="24" v-model="configTmp.clock.format">
      </div>
      <div class="row save">
        <button class="btn config_save" v-on:click="save()">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>

var Vue = require('vue');
Vue.config.debug = true;

module.exports = Vue.extend({

props: ["config"],

data: function(){
  return {
    configTmp: {
      clock: {
        format: this.config.clock.format
      }
    }
  };
},

methods: {
  open: function(){
    this.$els.modal.classList.add('on');
  },
  save: function(){
    this.config.clock.format = this.configTmp.clock.format;
    this.close();
  },
  close: function(){
    this.configTmp.clock.format = this.config.clock.format;
    this.$els.modal.classList.remove('on');
  }
},

computed: {
}

});

</script>
