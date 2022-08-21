/**
 @name Header
 @function Handle dark/light mode
 @function initial dropdown menu
 @function initial side navigation for mobile
 */

var darkMode = 'false';
if (typeof Storage !== 'undefined') { // eslint-disable-line
  darkMode = localStorage.getItem('luxiDarkMode') || 'false';
}

var $header = $('#header'),
    $menu = $('#mobile_menu'),
    $slideMenu = $('.mobile-nav')
    isOpen = false;

$(document).ready(function(){
  // Dark and Light mode config
  if(darkMode === 'true') {
    $('#app').removeClass('theme--light');
    $('#app').addClass('theme--dark');
    $('#theme_switcher').prop('checked', true);
  }
  $('#theme_switcher').change(function() {
    if($(this).is(':checked')) {
      // dark
      localStorage.setItem('luxiDarkMode', "true");
      $('#app').removeClass('theme--light');
      $('#app').addClass('theme--dark');
    } else {
      // light
      localStorage.setItem('luxiDarkMode', "false");
      $('#app').removeClass('theme--dark');
      $('#app').addClass('theme--light');
    }
  });

  // initial dropdown
  $('.dropdown-trigger').dropdown({
    closeOnClick: false,
    alignment: "left"
  });
  
  // Hamburger menu
  function openMenu() {
    $('#main_menu').fadeIn();
    $header.addClass('open-drawer');
    $menu.addClass('is-active');
    $slideMenu.addClass('menu-open');
  }
  function closeMenu() {
    $('#main_menu').fadeOut();
    $header.removeClass('open-drawer');
    $menu.removeClass('is-active');
    $slideMenu.removeClass('menu-open');
    
  }
  $('#mobile_menu').click(function() {
    isOpen = !isOpen;
    if(isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  });
  
  $('#main_menu a').click(function() {
    closeMenu();
    isOpen = false;
  })
})

/******** END Common JS ********/