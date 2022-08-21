/**
 * @name _common
 * @function handle scroling
 * @function initial parallax, tooltip, carousel, etc
 */


var $header = $("#header");
var $pageNav = $("#page_nav");
var sticky = 0;

// Sticky header
if($("#header").length > 0) {
  sticky = header.offsetTop + 80;
}

function fixedNav() {
  if (window.pageYOffset > sticky) {
    $header.addClass("fixed");
  } else {
    $header.removeClass("fixed");
  }
}

// Bottom right navigation,
function fixedFabNav() {
  if (window.pageYOffset > 500) {
    $pageNav.addClass("show");
  } else {
    $pageNav.removeClass("show");
  }
}

/**
 * @name Timeline
 * @function handle progress on scroll window
 */

var progressOffset = 0;

var $progress = $('#progress').offset();
if($("#progress").length > 0) {
  progressOffset = $progress.top - 300;
}

function playProgress() {
  if (window.pageYOffset > progressOffset) {
    $('#progress').removeClass('zero');
  }
}

setTimeout(function() {
  window.onscroll = function() {
    playProgress();
  };
}, 500)

// Scroll fixed
setTimeout(function() {
  window.onscroll = function() {
    if (window.innerWidth > 1279) {
      fixedNav();
    }
    fixedFabNav();
    playProgress();
  };
}, 500)

$(document).ready(function(){
  // Preloader
  $('#preloader').delay(1000).fadeOut('fast');
  // Page transition
  $('.transition-page').addClass('page-fadeUp-transition-enter').delay(1000).queue(function(){
    $(this)
    .removeClass('page-fadeUp-transition-enter')
    .addClass('page-fadeUp-transition-enter-active')
    .dequeue()
    .delay(500).queue(function(){
      $(this)
      .removeClass('page-fadeUp-transition-enter-active')
      .addClass('page-fadeUp-transition-exit')
      .dequeue();
    })
  });
  
  // Open Page scroll navigation
  $('.scrollnav').navScroll({
    scrollSpy: true,
    activeParent: true,
    activeClassName: 'current'
  });
  
  // initial wow
  new WOW().init();

  // initial parallax
  $('#feature_parallax').enllax();

  // Select
  $('.select').formSelect();

  // Tooltip initial
  $('.tooltipped').tooltip();
  
  // Validate form
  var toastHTML = '<span>Message Sent</span><button onclick="M.Toast.dismissAll()" class="btn-icon waves-effect toast-action"><i class="material-icons">close</i></button>';
  $.validate({
    form: "#contact_form",
    onSuccess: function(form) {
      M.toast({html: toastHTML});
      return false;
    }
  })
});
/******** END Common JS ********/
