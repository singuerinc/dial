<style media="screen">

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  src: local('Raleway'), url(css/QAUlVt1jXOgQavlW5wEfxQLUuEpTyoUstqEm5AMlJo4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

* {
  outline: none;
}

html, body {
  font-family: 'Raleway';
  background-color: #222;
  color: #444;
}

body {
  font-size: 10px;
  font-family: Raleway;
}

.app {
  width: 90vw;
  margin: 0 5vw;
  position: absolute;
  top: 50px;
}

a {
  font-size: 1.4em;
  text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.category-list {
    overflow: hidden;
    width: 100%;
    column-fill: auto;
    column-count: 1;
    column-gap: 0;
}

@media (min-width: 320px) {
  .category-list {
      column-count: 2;
  }
}

@media (min-width: 768px) {
  .category-list {
      column-count: 3;
  }
}

@media (min-width: 1200px) {
  .category-list {
      column-count: 4;
  }
}

@media (min-width: 1440px) {
  .category-list {
      column-count: 5;
  }
}

header, footer {
  width: 100%;
}

.result-list, .category-list {
  margin: 40px 0;
}

.category-title {
  margin-top: 0;
}

.links {
  margin-bottom: 30px;
}

.link a {
  line-height: 1.6em;
  font-size: 1.6em;
  color: #888;
}

.link a:hover {
  color: #25FFB4;
}

.link.on a {
  color: white;
}

.go-to-url {
  color: #0094FF;
  font-size: 5em;
  font-weight: 300;
  margin-top: 10px;
}
</style>

<template>

    <header>
      <search-bar :search.sync="search" :selidx.sync="selectedIndex" :filtered.sync="filteredItems"></search-bar>
      <profile></profile>
      <clock></clock>
      <weather></weather>
    </header>

    <div class="result-list" v-if="search != '' && filteredItems.length > 0">
      <h1 class="category-title">SEARCH</h1>
      <ul class="links-list">
        <li class="link" v-for="link in filteredItems" data-id="{{link.id}}" data-index="{{$index}}" v-bind:class="{on: $index == selectedIndex}">
          <a v-bind:href="link.href" target="_blank">{{link.label}}</a>
        </li>
      </ul>
    </div>

    <div class="result-list" v-if="filteredItems.length == 0">
      <h1 class="category-title">GO TO</h1>
      <h2 class="go-to-url">{{ go_to_url }}</h2>
    </div>

    <ul v-if="search == ''" class="category-list">
      <li v-for="category in items" data-id="{{category.id}}">
        <h1 class="category-title">{{category.title|uppercase}}</h1>
        <ul class="links">
          <li class="link" v-for="link in category.links" data-id="{{link.id}}">
            <a v-bind:href="link.href" target="_blank">{{link.label}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>

  <footer>

  </footer>

</template>

<script>

  var Vue = require('vue');
  var SearchBar = require('./search-bar.vue');
  var Weather = require('./weather.vue');
  var Profile = require('./profile.vue');
  var Clock = require('./clock.vue');
  //var data = require('../data.json');

  // chrome.storage.sync.set({'singuerinc__dial_data': []
  // }, (function(){
  //
  // }).bind(this));

  var App = Vue.extend({

    ready: function(){

        var self, loadFunc;

        if(typeof(chrome.storage) != 'undefined'){
          self = chrome.storage.sync;
          loadFunc = chrome.storage.sync.get;
          console.log('from chrome storage');
        } else {
          self = this;
          loadFunc = function(label, callback){
            var payload = {
              singuerinc__dial_data: require('../data.json')
            };
            callback(payload);
          }
          console.log('from data.json');
        }

        loadFunc.apply(self, ['singuerinc__dial_data', (function(data){

          this.items = data.singuerinc__dial_data;

          for(var i=0; i<this.items.length; i++){
            this.onlyItems = this.onlyItems.concat(this.items[i].links);
          }

        }).bind(this)]);

    },

    data : function(){
      return {
        search: '',
        selectedIndex: 0,
        items: [],
        onlyItems: []
      }
    },

    computed: {
      filteredItems: function () {
        var filterBy = Vue.filter('filterBy');
        var orderBy = Vue.filter('orderBy');
        return orderBy(filterBy(this.onlyItems, this.search, 'label'), 'label');
      },

      go_to_url: function(){
        if(this.search.match(/http[s]?:\/\//)){
          return this.search;
        } else {
          return 'http://' + this.search;
        }
      }
    },

    components: {
      'search-bar': SearchBar,
      'clock': Clock,
      'weather': Weather,
      'profile': Profile
    },

    events: {
      'link-selected': function(sIdx){
        var obj = this.filteredItems[sIdx];
        if(typeof(obj) == 'undefined'){
          window.open('//' + this.search);
          this.search = '';
        } else {
          window.open(obj.href);
        }
      }
    }
  });

  module.exports = App;

</script>
