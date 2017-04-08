$(document).ready(function() {

    /*debounce*/

    function debounce(func, wait = 20, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    /*hamburger menu */

    var hamburgerMenu = $('.hamburger'),
    header = $('.page-header'),
    menu = $('.menu');

    function showMobileMenu(event) {
        menu.toggleClass('nav-opened');
        homepage.addClass('color-bg');

    /*hide mobile menu*/

        $(document).on('click', function(event){
            if (!$(event.target).closest(header).length) {
                menu.removeClass('nav-opened');
            }
        });
    }

    /*sticky menu*/

    var homepage = header.find('.homepage'),
    homepageTop = homepage.offset().top,
    homepageWrapper = homepage.find('.homepage-wrapper');

    function stickyMenu(event) {
        var scroll = $(this).scrollTop();
        if (scroll > homepageTop) {
            homepage.addClass('sticky');
            homepageWrapper.addClass('main-wrapper');
            homepage.addClass('color-bg');
        } else {
            homepage.removeClass('sticky');
            homepage.removeClass('color-bg');
        }
    }

    /*main slider*/

    var slider = $('.main-slider'),
    slides = slider.find('.slides'),
    slide = slides.find('.slide'),
    animationSpeed = 1000,
    pause = 5000,
    currentSlide = 1,
    myInterval;

    /* start slider */

    function startSlider(event) {
        var width = $(window).width();
        slide.css('width', width);
        slides.css('width', 6*width).css("margin-left", (currentSlide) * (-1) * width );

        clearInterval(myInterval);
        myInterval = setInterval(function(){
           slides.animate({'margin-left': '-=' + width}, animationSpeed, function(){
               currentSlide++;
               if (currentSlide === slide.length - 1) {
                   currentSlide = 1;
                   slides.css('margin-left',  (currentSlide) * (-1) * width);
               }
           });
       }, pause);
   }

    /* stop slider */

    function stopSlider(event){
        clearInterval(myInterval);
    }

    /* show animation */

    function showAnimation(event){
        var slideInElements = $('.slide-in');
        var slideInAt = ($(window).scrollTop() + $(window).innerHeight()) - slideInElements.height() / 2;

        if (slideInAt > slideInElements.offset().top) {
                slideInElements.addClass('active-element');
        }
    }

    /* carousel */
    // Activate Carousel
    $("#myCarousel").carousel();

    // Enable Carousel Indicators
    $(".item").click(function(){
        $("#myCarousel").carousel(1);
    });

    // Enable Carousel Controls
    $(".left").click(function(){
        $("#myCarousel").carousel("prev");
    });

    $(window).on("scroll", debounce(stickyMenu, 10));
    $(window).on("scroll", debounce(showAnimation));
    slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
    $(window).on("resize", startSlider);
    hamburgerMenu.on('click', showMobileMenu);
    startSlider();
});
