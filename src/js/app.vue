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
  box-sizing: border-box;
}

html, body {
  font-family: 'Raleway';
  background-color: #222;
  color: #444;
  font-size: 10px;
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

header {
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
  line-height: 2.6rem;
  font-size: 1.8rem;
  letter-spacing: 0.2px;
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
  font-size: 6rem;
  font-weight: 300;
  margin-top: 2rem;
}

.go-to-url small {
  font-size: 3rem;
  color: white;
}

.modal {
  position: fixed;
  display: none;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  color: #777;
}

.modal.on {
  display: block;
}

.modal .title {
  font-size: 2rem;
}

.window {
  position: absolute;
  display: block;
  width: 500px;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 120px #000;
  padding: 50px;
}

.window input[type="text"], .window select {
  font-size: 3rem;
  padding: 10px;
  width: 100%;
  -webkit-appearance: none;
  border: 1px solid grey;
  border-radius: 0;
}

.window label {
  font-size: 2rem;
  margin: 30px 0 10px;
  display: block;
}

.window .close-btn {
  position: absolute;
  display: block;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: url(../img/ic_clear_black_48px.svg);
  background-size: 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.window .close-btn:hover {
  opacity: 0.4;
}

.window .row:after {
  display: block;
  height: 0;
  width: 100%;
  content: '';
  clear: both;
}

</style>

<template>

    <header>
      <search-bar :search.sync="search" :selidx.sync="selectedIndex" :filtered.sync="filteredItems"></search-bar>
      <profile></profile>
      <clock></clock>
      <weather v-bind:config.sync="config"></weather>
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
      <h2 class="go-to-url">{{{ go_to_url }}}</h2>
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
</template>
<script>

  var Vue = require('vue');
  var SearchBar = require('./search-bar.vue');
  var Weather = require('./weather.vue');
  var Profile = require('./profile.vue');
  var Clock = require('./clock.vue');
  var urlRegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;

  //var data = require('../data.json');
  // chrome.storage.sync.set({'singuerinc__dial_data': []
  // }, (function(){
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

        // document.body.addEventListener('click', function(){
        //   document.getElementsByClassName('search-bar')[0].focus();
        // });

    },

    data : function(){
      return {
        search: '',
        selectedIndex: 0,
        items: [],
        onlyItems: [],
        config: {
          countries: require('../countries.json'),
          city: 'Barcelona',
          country: 'ES',
          unit: 'c',
        }
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
          if(this.search.match(urlRegExp) != null){
            return this.search;
          } else {
            return this.search + '<small> - Google search</small>';
          }
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
        var url;
        if(typeof(obj) == 'undefined'){
          if(this.search.match(urlRegExp) != null){
            url = '//' + this.search;
          } else {
            url = 'https://www.google.com/search?q=' + this.search;
          }

          this.search = '';
        } else {
          url = obj.href;
        }

        if(typeof(chrome.tabs) == 'undefined'){
          window.open(url);
        } else {
          chrome.tabs.create({ url: url });
        }
      }
    }
  });

  module.exports = App;

</script>
