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