// var style = document.createElement('style');
// var head = document.querySelector('head');
// var r = function(){ return Math.floor(Math.random() * 255) };
// style.textContent = '#clock { color: rgb('+r()+', '+r()+', '+r()+') }';
// head.appendChild(style);

var pckry = new Packery( '.wrapper', {
  itemSelector: 'section',
  gutter: 0
});

function time() {
    var today=new Date();
    var d = today.getDate();
    var M = today.getMonth()+1;
    var YYYY = today.getFullYear();
    var h=today.getHours();
    var m=today.getMinutes();
    m = m < 10 ? '0'+m : m;
    // document.getElementById('clock').innerHTML = h+":"+m+" <small>"+d+"-"+M+"-"+YYYY+"</small> ";
    document.getElementById('clock').innerHTML = h+":"+m;
    setTimeout(function(){time()}, 1000);
}

time();
