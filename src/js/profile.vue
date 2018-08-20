<style>
.profile {
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;
}

.profile .img {
  width: 40px;
  height: 40px;
  display: inline-block;
  background-position: center;
  background-size: 100%;
  border-radius: 50%;
  vertical-align: top;
  opacity: 0.6;
}

.profile .name {
  font-size: 4rem;
  display: inline-block;
  vertical-align: top;
  line-height: 4rem;
}
</style>

<template>
  <div class="profile">
    <div class="img" v-bind:style="'background-image: url('+ img +')'"></div>
  </div>
</template>

<script>
var Vue = require("vue");

module.exports = Vue.extend({
  props: ["config"],

  data: function() {
    return {
      img: this.config.user.image
    };
  },

  methods: {}
});
</script>
