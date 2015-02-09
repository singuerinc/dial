// var style = document.createElement('style');
// var head = document.querySelector('head');
// var r = function(){ return Math.floor(Math.random() * 255) };
// style.textContent = '#clock { color: rgb('+r()+', '+r()+', '+r()+') }';
// head.appendChild(style);


(function(){

    var Dial = function(){

    };

    Dial.prototype.init = function(){

        this.body = $('body');
        this.wrapper = $('.wrapper');

        this._construct(data);

        var theme = localStorage.getItem('theme');
        if(typeof(theme) != 'undefined'){
            this.changeTheme(theme);
        }

        var pckry = new Packery( '.wrapper', {
            itemSelector: 'section',
            gutter: 0
        });

        this._update_time();
        setInterval(this._update_time, 1000);

        this._light_theme_btn = $('#theme-light');
        this._dark_theme_btn = $('#theme-dark');

        this._light_theme_btn.on('click', this._changeThemeToLight.bind(this));
        this._dark_theme_btn.on('click', this._changeThemeToDark.bind(this));

        return this;
    };

    Dial.prototype._construct = function(data){

        for(var i=0; i<data.length; i++){
            var className = data[i].title.toLowerCase().replace(/\s/ig, '_');
            var section = $('<section class="'+className+'"><h1>'+data[i].title+'</h1></section>');

            var level2 = data[i].links;
            var ul = $('<ul></ul>');
            for(var j=0; j<level2.length; j++){
                var item = level2[j];
                var li = $('<li><a href="'+item.href+'">'+item.label+'</a></li>');
                li.appendTo(ul);
            }
            ul.appendTo(section);
            section.appendTo(this.wrapper);
        }
    };

    Dial.prototype._changeThemeToLight = function(){
        this.changeTheme('theme_light');
    };

    Dial.prototype._changeThemeToDark = function(){
        this.changeTheme('theme_dark');
    };

    Dial.prototype.changeTheme = function(theme){
        this.body.attr('class', '');
        this.body.addClass(theme);
        localStorage.setItem('theme', theme);
        return this;
    };

    Dial.prototype._update_time = function(){
        var today=new Date();
        var d = today.getDate();
        var M = today.getMonth()+1;
        var YYYY = today.getFullYear();
        var h=today.getHours();
        var m=today.getMinutes();
        m = m < 10 ? '0'+m : m;
        // document.getElementById('clock').innerHTML = h+":"+m+" <small>"+d+"-"+M+"-"+YYYY+"</small> ";
        document.getElementById('clock').innerHTML = h+":"+m;

    };

    var dial = new Dial()
        .init();

})();