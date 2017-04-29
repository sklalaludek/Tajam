$(document).ready(function() {

    /*debounce*/

    function debounce(func, wait) {
      var timeout,
      immediate = true,
      wait = arguments[1] !== (void 0) ? arguments[1] : 20;

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
    }

    /*hamburger menu on click*/

    var hamburgerMenu = $('.hamburger'),
    header = $('.page-header'),
    menu = $('.menu');

    function showMobileMenu(event) {
        menu.toggleClass('nav-opened');

    /*hide mobile menu*/

        $(document).on('click', function(event){
            if (!$(event.target).closest(header).length) {
                menu.removeClass('nav-opened');
            }
        });
    }

    /*sticky menu & scrollUp button*/

    var header = $('.page-header'),
    headerTop = header.offset().top,
    homepage = header.find('.homepage'),
    homepageTop = homepage.offset().top;
    // homepageWrapper = homepage.find('.homepage-wrapper');

    function stickyMenu(event) {
        var scroll = $(this).scrollTop();
        // console.log(homepageTop);
        // console.log(headerTop);
        // console.log(scroll);

        // sticky menu
        if (scroll > headerTop) {
            header.css({
                'position' : 'fixed' ,
                'background-color' : '#09052f' ,
                'z-index' : '9999' ,
                'transition' : 'all 0.3s ease'
            });
            // header.addClass('sticky');
            // homepageWrapper.addClass('main-wrapper');
            // header.addClass('color-bg');
        } else {
            // homepage.removeClass('sticky');
            // homepage.removeClass('color-bg');
            header.css({
                'position' : 'absolute' ,
                'background-color' : 'transparent'
            });
        }

        //scroll up button
        if (scroll > 530) {
            $('.scrollUp').fadeIn();
        } else {
            $('.scrollUp').fadeOut();
        }
    }

    /*main navigation*/

    function showSection(event) {
        if ($('ul.navigation a').attr('href')[0] === '#') {
            event.preventDefault();
            var targetId = $(this).attr('href'),
            targetTop = $(targetId).offset().top - 70;
            $('body, html').animate({
                scrollTop: targetTop + 'px'
            }, 700);
        }
    }

    /*scrollUp*/

    function backToTop(event){
        event.preventDefault();
        $('body', 'html').animate({
            scrollTop: $('#home').offset().top + 'px'
        }, 1000);
    }

    /*main slider*/

    var slider = $('.main-slider'),
    slides = slider.find('.slides'),
    slide = slides.find('.slide'),
    dots = $('.dots > a'),
    animationSpeed = 1000,
    pause = 5000,
    currentSlide = 1,
    myInterval;

    /*bullets navigation to slider*/

    dots.on('click', function(){
        $(this).addClass('active-dot');
        stopSlider();
        currentSlide = $(this).data('number');
        startSlider();
        return currentSlide;
    })

    /*start slider*/

    function startSlider() {
        var width = $(window).width();
        slide.css('width', width);
        slides.css('width', 6*width).css("margin-left", (currentSlide) * (-1) * width );
        clearInterval(myInterval);

        myInterval = setInterval(function(){
           slides.animate({'margin-left': '-=' + width}, animationSpeed, function(){
               currentSlide++;
               /*dots*/
               dots.each(function(index, el){
                  if ($(el).data('number') === currentSlide) {
                      $(el).addClass('active-dot');
                  } else {
                      $(el).removeClass('active-dot');
                  }
               })
               if (currentSlide === slide.length - 1) {
                   currentSlide = 1;
                   slides.css('margin-left',  (currentSlide) * (-1) * width);
               }
           });
       }, pause);
   }

    /*stop slider*/

    function stopSlider(event){
        clearInterval(myInterval);
    }

    /*mobile*/

    function mobileMenu(event){
        if (window.innerWidth > 768) {
        menu.removeClass('nav-opened');
        }
    }

    /*show animation*/

    function showAnimation(event){
        var slideInElements = $('.slide-in');
        var slideInAt = ($(window).scrollTop() + $(window).innerHeight()) - slideInElements.height() / 2;

        if (slideInAt > slideInElements.offset().top) {
                slideInElements.addClass('active-element');
        }
    }

    /*newsletter*/

    function checkEmail(event){
        var newsletterInput = $('.newsletter .newsletter-email'),
        text = newsletterInput.val(),
        atPosition = text.indexOf('@'),
        dotPosition = text.lastIndexOf('.');
        if (atPosition < 1 || dotPosition < atPosition + 2) {
            newsletterInput.css('border', '1px solid red');
        } else {
            newsletterInput.css('border', '1px solid #e5e5e5');
            console.log('email is ok');
        }
        $(this).on('focusout', function() {
            $(this).css('border', '1px solid #e5e5e5');
        });
    }

    $(window).on('scroll', debounce(stickyMenu, 10));
    $(window).on('scroll', debounce(showAnimation));
    slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
    $(window).on('resize', startSlider);
    hamburgerMenu.on('click', showMobileMenu);
    startSlider();
    $('.newsletter .newsletter-email').on('keyup', checkEmail);
    $('ul.navigation a').on('click', showSection);
    $('.scrollUp').on('click', backToTop);
    $(window).on('resize', mobileMenu);
});
