<style>
  .clock {
    font-size: 4em;
    display: inline-block;
    margin: 0 20px;
    width: 120px;
    text-align: center;
    vertical-align: top;
    line-height: 50px;
    border-right: 1px solid #444;
    border-left: 1px solid #444;
  }
</style>

<template>
  <div class="clock">{{ time }}</div>
</template>

<script>

var Vue = require('vue');

module.exports = Vue.extend({

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
  }
},

computed: {
  time: function(){
    var minutes = this.now.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return this.now.getHours() + ':' + minutes;
  }
}

});

</script>
