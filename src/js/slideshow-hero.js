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