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
/**
 * @name news and event carousel
 * @function handle carousel tag
 */

$(function() {
  var $carousel = $('#news_carousel');
  if (window.innerWidth > 1279 && $("html").attr("dir") === "rtl") {
    var lastSlide = Math.floor($carousel.data('length') - 2)
    setTimeout(function() {
      $carousel.slick('slickGoTo', lastSlide);
    }, 100)
  }
  // Handle carousel tag
  $carousel.slick({
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    arrows: false,
    pauseOnHover: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  // Handle slick navigation
  $('#prev_blog').click(function() {
    $carousel.slick('slickPrev');
  });
  $('#next_blog').click(function() {
    $carousel.slick('slickNext');
  });
});
// Counter Scroll
(function ($) {
  $(window).on("load", function () {
    $(document).scrollzipInit();
    $(document).rollerInit();
  });
  $(window).on("load scroll resize", function () {
    $('.numscroller').scrollzip({
      showFunction: function () {
        numberRoller($(this).attr('data-slno'));
      },
      wholeVisible: false,
    });
  });
  $.fn.scrollzipInit = function () {
    $('body').prepend("<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>");
  };
  $.fn.rollerInit = function () {
    var i = 0;
    $('.numscroller').each(function () {
      i++;
      $(this).attr('data-slno', i);
      $(this).addClass("roller-title-number-" + i);
    });
  };
  $.fn.scrollzip = function (options) {
    var settings = $.extend({
      showFunction: null,
      hideFunction: null,
      showShift: 0,
      wholeVisible: false,
      hideShift: 0,
    }, options);
    return this.each(function (i, obj) {
      $(this).addClass('scrollzip');
      if ($.isFunction(settings.showFunction) && $('#scrollzipPoint').length > 0) {
        if (!$(this).hasClass('isShown') &&
          ($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.showShift) > ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) &&
          ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) < ($(this).outerHeight() + $(this).offset().top - settings.showShift)
        ) {
          $(this).addClass('isShown');
          settings.showFunction.call(this);
        }
      }
      if ($.isFunction(settings.hideFunction)) {
        if (
          $(this).hasClass('isShown') &&
          (($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.hideShift) < ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) ||
            ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) > ($(this).outerHeight() + $(this).offset().top - settings.hideShift))
        ) {
          $(this).removeClass('isShown');
          settings.hideFunction.call(this);
        }
      }
      return this;
    });
  };

  function numberRoller(slno) {
    var min = $('.roller-title-number-' + slno).attr('data-min');
    var max = $('.roller-title-number-' + slno).attr('data-max');
    var timediff = $('.roller-title-number-' + slno).attr('data-delay');
    var increment = $('.roller-title-number-' + slno).attr('data-increment');
    var numdiff = max - min;
    var timeout = (timediff * 1000) / numdiff;
    numberRoll(slno, min, max, increment, timeout);
  }

  function numberRoll(slno, min, max, increment, timeout) { //alert(slno+"="+min+"="+max+"="+increment+"="+timeout);
    if (min <= max) {
      $('.roller-title-number-' + slno).html(min);
      min = parseInt(min) + parseInt(increment);
      setTimeout(function () {
        numberRoll(eval(slno), eval(min), eval(max), eval(increment), eval(timeout))
      }, timeout);
    } else {
      $('.roller-title-number-' + slno).html(max);
    }
  }
})(jQuery);
/**
 * @name gallery carousel
 * @function handle carousel gallery
 */

$(function() {
  var $carousel = $('#gallery_carousel');
  // Handle carousel tag
  $carousel.slick({
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    arrows: false
  });
  
  $(".filter button").click(function(){
    var name = $(this).data("filter");
    $(".filter button").removeClass("selected");
    $(this).addClass("selected");
    if($(".massonry .item[data-category="+name+"]").length < 1) {
      $('#no_data').removeClass("hide")
    } else {
      $('#no_data').addClass("hide")
    }

    if (name !== 'all') {
      $(".massonry .item").css({"visibility": "hidden"}).hide();
      setTimeout(function() {
        $(".massonry .item[data-category="+name+"]").css({"visibility": "visible"}).show();
      }, 10)
    } else {
      setTimeout(function() {
        $(".massonry .item").css({"visibility": "visible"}).show();
      }, 10)
    }
    $(".massonry .item").removeClass("loaded");
    setTimeout(function() {
      $(".massonry .item").addClass("loaded");
    }, 700)
  });

  // Handle popup detail
  $('#image_gallery').each(function() { 
    $(this).magnificPopup({
      delegate: '.item a',
      type: 'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });
  $('#gallery_carousel').each(function() { 
    $(this).magnificPopup({
      delegate: '.item-carousel a',
      type: 'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });
});
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
/**
 * @name Language
 * @function redirect to language specified page
 * @function via js through header and footer
 */

$(function(){
  // Language select in Headed
  $('#lang_menu li a').click(function(){
    var url = window.location.toString(),
        path = window.location.pathname.split('/'),
        path_lang = path[path.length - 2],
        file = path[path.length - 1]
    var lang = $(this).data("lang");
    
    window.location = url.replace(path_lang + "/" + file, lang + "/" + file);
  })
  
  // Language select in footer
  $('#lang_select').on('change', function() {
    var lang = $(this).val(); 
    var url = window.location.toString(),
        path = window.location.pathname.split('/'),
        path_lang = path[path.length - 2],
        file = path[path.length - 1]
    
    if(lang) {
      window.location = url.replace(path_lang + "/" + file, lang + "/" + file);
    }
    return false;
  });
});
/**
 * Handle css class by using Media query
 * @description It will append className to element according media width
 * @alias xs, sm, md, lg, xl
 * @class Up css className: mq-sm-up, mq-md-up, mq-lg-up, mq-xl-up
 * @class Down css className: mq-xs-down, mq-sm-down, mq-md-down, mq-lg-down
 * 
 * @example <div class="other-class mq-sm-up" data-class="for-mobile-above">
 * once screen resized on (min-wdth: 600px)
 * it will become <div class="other-class mq-sm-up for-mobile-above" data-class="for-mobile-above">
 */

var mq = {
  smUp: "screen and (min-wdth: 600px)",
  mdUp: "screen and (min-width: 960px)",
  lgUp: "screen and (min-width: 1280px)",
  xlUp: "screen and (min-width: 1920px)",
  xsDown: "screen and (max-width: 599px)",
  smDown: "screen and (max-width: 959px)",
  mdDown: "screen and (max-width: 1279px)",
  lgDown: "screen and (max-width: 1919px)"
}

function mqAddClass(selectors) {
  $(selectors).each(function(){
    var classes = $(this).data('class');
    $(this).addClass(classes)
  })
}

function mqRemoveClass(selectors) {
  $(selectors).each(function(){
    var classes = $(this).data('class');
    $(this).removeClass(classes)
  })
}

// Define handler action
var handler_smUp = {
      match : function() { mqAddClass('.mq-sm-up')},
      unmatch : function() { mqRemoveClass('.mq-sm-up')}
    },
    handler_mdUp = {
      match : function() { mqAddClass('.mq-md-up')},
      unmatch : function() { mqRemoveClass('.mq-md-up')}
    },
    handler_lgUp = {
      match : function() { mqAddClass('.mq-lg-up')},
      unmatch : function() { mqRemoveClass('.mq-lg-up')}
    },
    handler_xlUp = {
      match : function() { mqAddClass('.mq-xl-up')},
      unmatch : function() { mqRemoveClass('.mq-xl-up')}
    },
    handler_xsDown = {
      match : function() { mqAddClass('.mq-xs-down')},
      unmatch : function() { mqRemoveClass('.mq-xs-down')}
    },
    handler_smDown = {
      match : function() { mqAddClass('.mq-sm-down')},
      unmatch : function() { mqRemoveClass('.mq-sm-down')}
    },
    handler_mdDown = {
      match : function() { mqAddClass('.mq-md-down')},
      unmatch : function() { mqRemoveClass('.mq-md-down')}
    },
    handler_lgDown = {
      match : function() { mqAddClass('.mq-lg-down')},
      unmatch : function() { mqRemoveClass('.mq-lg-down')}
    };

// Register to enquire.js
enquire
  .register(mq.smUp, handler_smUp)
  .register(mq.mdUp, handler_mdUp)
  .register(mq.lgUp, handler_lgUp)
  .register(mq.xlUp, handler_xlUp)
  .register(mq.xsDown, handler_xsDown)
  .register(mq.smDown, handler_smDown)
  .register(mq.mdDown, handler_mdDown)
  .register(mq.lgDown, handler_lgDown);

/**
 * @name Banner Animation
 * @function handle canvas animation using particles.js
 */

var particlesEl = document.getElementById('particles_background');
$(function(){
  if (particlesEl === null || particlesEl === undefined) {
    return;
  }
  setTimeout(function() {
    window.particlesJS('particles_background', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }, 1000)
});

/******** END Banner Animation ********/
/**
 * @name services carousel
 * @function handle carousel services
 */

$(function() {
  var $carousel = $('#services_carousel');
  if (window.innerWidth > 1279 && $("html").attr("dir") === "rtl") {
    var lastSlide = Math.floor($carousel.data('length') - 3)
    setTimeout(function() {
      $carousel.slick('slickGoTo', lastSlide);
    }, 100)
  }
  // Handle carousel
  $carousel.slick({
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 3,
    arrows: false,
    variableWidth: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  // Handle slick navigation
  $('#prev_services').click(function() {
    $carousel.slick('slickPrev');
  });
  $('#next_services').click(function() {
    $carousel.slick('slickNext');
  });
});
/**
 * @name slideshow carousel
 * @function handle carousel hero banner
 */

$(function() {
  var $carousel = $('#hero_carousel');
  // Handle carousel
  $carousel.slick({
    dots: false,
    infinite: true,
    speed: 700,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    arrows: false,
    fade: true
  });
});
/**
 * @name testimonial carousel
 * @function handle carousel tag
 */

$(function() {
  var $carousel = $('#testimonial_carousel');
  // Handle carousel tag
  $carousel.slick({
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    arrows: false
  });
  
  // Enables popover
  $("[data-toggle=popover]").popover({
    trigger: "hover focus"
  });
});
/**
 * @name video-banner
 * @function handle youtube video banner
 */

$(function(){
  var $youtubeElm = $('#youtube');
  // Initial youtube config
  $youtubeElm.YTPlayer({
    videoId: '-Ynq7oTcUyI',
    width: 1080,
    repeat: true,
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      origin: 'http://localhost:9000'
    }
  });
});

/******** END Video banner ********/