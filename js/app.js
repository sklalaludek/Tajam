$(document).ready(function() {
    /*debounce*/
    // function debounce(func, wait = 20, immediate = true) {
    //   var timeout;
    //   return function() {
    //     var context = this, args = arguments;
    //     var later = function() {
    //       timeout = null;
    //       if (!immediate) func.apply(context, args);
    //     };
    //     var callNow = immediate && !timeout;
    //     clearTimeout(timeout);
    //     timeout = setTimeout(later, wait);
    //     if (callNow) func.apply(context, args);
    //   };
    // };
    /*hamburger menu */

    var hamburgerMenu = $('.hamburger'),
    header = $('.page-header'),
    menu = $('.menu');

    hamburgerMenu.on('click', function(event){
        menu.toggleClass('nav-opened');

    });

    $(document).on('click', function(event){
        if (!$(event.target).closest(header).length) {
            menu.removeClass('nav-opened');
        }
    });

    /*sticky menu*/

    var header = $('.page-header');
    var headerOffset = header.offset();
    console.log(headerOffset);
    var menu = header.find('.menu');
    var menuOffset = menu.offset();
    var homepage = header.find('.homepage');
    var  homepageTop = homepage.offset().top;

    $(window).on('scroll', function(){
        var scroll = $(this).scrollTop();
        console.log(scroll);
        if (scroll > homepageTop) {
            homepage.addClass('sticky');
        } else {
            homepage.removeClass('sticky');
        }
    });

    /*main slider*/

    var slider = $('.main-slider'),
    slides = slider.find('.slides'),
    slide = slides.find('.slide'),
    animationSpeed = 1000,
    pause = 5000,
    currentSlide = 1,
    myInterval;



    function startSlider() {
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
    function stopSlider(){
        clearInterval(myInterval);
    }
    slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
    $(window).on("resize", startSlider);
    startSlider();
});
