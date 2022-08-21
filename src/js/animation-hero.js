/**
 * @name Banner Animation
 * @function handle canvas animation using vanta.js
 */

var vantaEl = document.getElementById('vanta_art');
$(function(){
  setTimeout(function() {
    if(vantaEl !== null) {
      window.VANTA.WAVES({
        el: '#vanta_art',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: '#212121',
      })
    }
  }, 1000);
});

/******** END Banner Animation ********/