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