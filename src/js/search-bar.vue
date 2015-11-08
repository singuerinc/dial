<style>
  .search-bar {
    display: block;
    font-family: "Raleway";
    font-weight: 100;
    margin: 0 0 40px 0;
    font-size: 5rem;
    background: transparent;
    border: 0;
    color: #25FFB4;
    width: 50%;
    vertical-align: top;
  }

  ::-webkit-input-placeholder {
   color: white;
   opacity: 0.04;
   font-family: "Raleway";
   font-weight: 100;
  }
</style>

<template>
  <input id="search-bar-input" placeholder="Search" autofocus class="search-bar" type="text" v-el:searchinput v-model="search" v-on:keydown="key($event)">
</template>

<script>

  var Vue = require('vue');

  module.exports = Vue.extend({

    props: ['selidx', 'search', 'filtered'],

    ready: function(){

      Vue.nextTick((function () {
        this.$els.searchinput.focus();
      }).bind(this));
    },

    methods: {

      key: function($event){

        if($event.keyCode == 38){
          this.selidx--;
          this.selidx = Math.max(0, this.selidx);
          $event.preventDefault();
        }
        else if($event.keyCode == 40){
          this.selidx++;
          this.selidx = Math.min(this.filtered.length-1, this.selidx);
          $event.preventDefault();
        }
        else if($event.keyCode == 13){
          this.$dispatch('link-selected', this.selidx);
          $event.preventDefault();
        }
        else {
          this.selidx = 0;
        }
      }
    }

  });

</script>
