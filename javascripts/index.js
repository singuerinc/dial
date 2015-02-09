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

        var pckry = new Packery( '.wrapper', {
            itemSelector: 'section',
            gutter: 0
        });

        setInterval(this._update_time, 1000);

        this._light_theme_btn = $('#theme-light');
        this._dark_theme_btn = $('#theme-dark');

        this._light_theme_btn.on('click', this._changeThemeToLight.bind(this));
        this._dark_theme_btn.on('click', this._changeThemeToDark.bind(this));

        return this;
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