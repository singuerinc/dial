<style>
  .clock {
    position: relative;
    font-size: 3.5rem;
    display: inline-block;
    padding: 0 20px;
    vertical-align: top;
    line-height: 4rem;
    cursor: pointer;
  }

  .clock:hover {
    color: grey;
  }

  .clock .time {
    display: inline-block;
  }
</style>

<template>
  <div class="clock" v-on:click="openConf()">
    <div class="time">{{ time }}</div>
  </div>
  <configure-clock v-ref:configurator v-bind:config.sync="config"></configure-clock>
</template>

<script>

var Vue = require('vue');
var ConfigureClock = require('./configure-clock.vue');

module.exports = Vue.extend({

  props: ["config"],

  components: {
    'configure-clock': ConfigureClock
  },

  ready: function(){
    this.timerId = setInterval(this.updateTimer.bind(this), 1000);
  },

  data: function(){
    return {
      now: new Date()
    };
  },

  methods: {
    updateTimer: function(){
      this.now = new Date()
    },

    openConf: function(){
      this.$refs.configurator.open();
    }
  },

  computed: {
    time: function(){
      var minutes = this.now.getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var hours = this.now.getHours();
      var pmam_str = hours < 12 ? ' am' : ' pm';
      hours = this.config.clock.format == 12 ? hours % 12 : hours;
      return hours + ':' + minutes + (this.config.clock.format == 12 ? pmam_str : '');
    }
  }

});

</script>
