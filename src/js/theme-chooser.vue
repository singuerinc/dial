<style>
.theme-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>

<template>
  <div class="theme-btn" v-on:click="toggle()">
    Toggle theme
  </div>
</template>

<script>
var Vue = require("vue");

module.exports = Vue.extend({
  props: ["config"],
  methods: {
    toggle: function() {
      const theme = this.config.theme === "dark" ? "light" : "dark";
      this.config.theme = theme;
      this.$dispatch("theme-selected", theme);
    }
  }
});
</script>
