<style media="screen">
@font-face {
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  src: local("Raleway"),
    url(css/QAUlVt1jXOgQavlW5wEfxQLUuEpTyoUstqEm5AMlJo4.woff2) format("woff2");
  unicode-range: U + 0000-00ff, U + 0131, U + 0152-0153, U + 02c6, U + 02da,
    U + 02dc, U + 2000-206f, U + 2074, U + 20ac, U + 2212, U + 2215, U + E0FF,
    U + EFFD, U + F000;
}

* {
  outline: none;
  box-sizing: border-box;
}

html,
body {
  font-family: "Raleway";
  -webkit-font-smoothing: antialiased;
  background-color: #111;
  color: #777;
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

.result-list,
.category-list {
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
  color: #25ffb4;
}

.link.on a {
  color: white;
}

.go-to-url {
  color: #0094ff;
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
  background: rgba(0, 0, 0, 0.3);
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
  box-shadow: 0 0 80px #000;
  padding: 50px;
}

.window input[type="text"],
.window select {
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
  content: "";
  clear: both;
}

.configure-window hr {
  border: 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}

.configure-window .save {
  margin-top: 20px;
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

.configure-window .config_save {
  float: right;
}

.configure-window input[type="radio"] {
  font-size: 3rem;
  float: left;
  display: inline-block;
  height: 27px;
  width: 27px;
  margin: 5px 5px 0;
  -webkit-appearance: none;
  border: 1px solid #eee;
  cursor: pointer;
  opacity: 1;
  position: relative;
}

.configure-window input[type="radio"]:after {
  position: absolute;
  top: 0;
  left: 0;
  width: 27px;
  height: 27px;
  content: "";
  display: block;
  background: url(../img/ic_clear_black_48px.svg);
  background-size: 100%;
  background-position: -1px -1px;
  opacity: 0;
}

.configure-window input[type="radio"]:checked:after {
  opacity: 1;
}

.configure-window input[type="radio"]:not(:checked):hover:after {
  opacity: 0.3;
}
</style>

<template>

    <header>
      <search-bar :search.sync="search" :selidx.sync="selectedIndex" :filtered.sync="filteredItems"></search-bar>
      <profile v-bind:config.sync="config"></profile>
      <clock v-bind:config.sync="config"></clock>
      <weather v-bind:config.sync="config"></weather>
    </header>

    <div class="result-list" v-if="search != '' && filteredItems.length > 0">
      <h1 class="category-title">SEARCH</h1>
      <ul class="links-list">
        <li class="link" v-for="link in filteredItems" data-index="{{$index}}" v-bind:key="{link}" v-bind:class="{on: $index == selectedIndex}">
          <a v-bind:href="link.href" target="_blank">{{link.label}}</a>
        </li>
      </ul>
    </div>

    <div class="result-list" v-if="filteredItems.length == 0">
      <h1 class="category-title">GO TO</h1>
      <h2 class="go-to-url">{{{ go_to_url }}}</h2>
    </div>

    <ul v-if="search == ''" class="category-list">
      <li v-for="category in items">
        <h1 class="category-title">{{category.title|uppercase}}</h1>
        <ul class="links">
          <li class="link" v-for="link in category.links">
            <a v-bind:href="link.href" target="_blank">{{link.label}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
var Vue = require("vue");
var SearchBar = require("./search-bar.vue");
var Weather = require("./weather.vue");
var Profile = require("./profile.vue");
var Clock = require("./clock.vue");
var urlRegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

// var data = require('../data.json');
// console.log(data);
// chrome.storage.sync.set({'singuerinc__dial_data': data
// }, (function(){
// }).bind(this));

var App = Vue.extend({
  ready: function() {
    var self, loadFunc;

    if (typeof chrome.storage != "undefined") {
      self = chrome.storage.sync;
      loadFunc = chrome.storage.sync.get;
    } else {
      self = this;
      loadFunc = function(label, callback) {
        var payload = {
          singuerinc__dial_data: require("../../data.json")
        };
        callback(payload);
      };
    }

    loadFunc.apply(self, [
      "singuerinc__dial_data",
      function(data) {
        this.items = data.singuerinc__dial_data;

        for (var i = 0; i < this.items.length; i++) {
          this.onlyItems = this.onlyItems.concat(this.items[i].links);
        }
      }.bind(this)
    ]);

    // document.body.addEventListener('click', function(){
    //   document.getElementsByClassName('search-bar')[0].focus();
    // });
  },

  data: function() {
    return {
      search: "",
      selectedIndex: 0,
      items: [],
      onlyItems: [],
      config: {
        user: {
          image: "./user.jpeg"
        },
        weather: {
          countries: require("../countries.json"),
          city: "Stockholm",
          country: "SE",
          unit: "c"
        },
        clock: {
          format: 24
        }
      }
    };
  },

  computed: {
    filteredItems: function() {
      var filterBy = Vue.filter("filterBy");
      var orderBy = Vue.filter("orderBy");
      return orderBy(filterBy(this.onlyItems, this.search, "label"), "label");
    },

    go_to_url: function() {
      if (this.search.match(/http[s]?:\/\//)) {
        return this.search;
      } else {
        if (this.search.match(urlRegExp) != null) {
          return this.search;
        } else {
          return this.search + "<small> - Google search</small>";
        }
      }
    }
  },

  components: {
    "search-bar": SearchBar,
    clock: Clock,
    weather: Weather,
    profile: Profile
  },

  events: {
    "link-selected": function(sIdx) {
      var obj = this.filteredItems[sIdx];
      var url;
      if (typeof obj == "undefined") {
        if (this.search.match(urlRegExp) != null) {
          url = "//" + this.search;
        } else {
          url = "https://www.google.com/search?q=" + this.search;
        }

        this.search = "";
      } else {
        url = obj.href;
      }

      if (typeof chrome.tabs == "undefined") {
        window.open(url);
      } else {
        chrome.tabs.create({ url: url });
      }
    }
  }
});

module.exports = App;
</script>
