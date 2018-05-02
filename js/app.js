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
        //toggle class by clicking on hamburger menu
        menu.toggleClass('nav-opened');
        /*hide mobile menu*/
        $(document).on('click', function(event){
            event.stopPropagation();
            // close menu on click outside the header
            if (!$(event.target).closest(header).length) {
                menu.removeClass('nav-opened');
            }
        });
    }

    /*sticky menu & scrollUp button*/

    var headerTop = header.offset().top;

    function stickyMenu(event) {
        scroll = $(this).scrollTop();
        // sticky menu
        if (scroll > headerTop) {
            header.css({
                'position' : 'fixed' ,
                'background-color' : '#09052f' ,
                'z-index' : '9999' ,
                'transition' : 'all 0.3s ease'
            });
        } else {
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
            $('html,body').animate({
                scrollTop: targetTop + 'px'
            }, 700);
        }
    }

    /*scrollUp*/

    function backToTop(event){
        $('html,body').animate({
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
        dots.removeClass('active-dot');
        stopSlider();
        currentSlide = $(this).data('number');
        $(this).addClass('active-dot');
        startSlider();
        return currentSlide;
    });

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
               });
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

    /*show animation slide-in*/

    function showAnimationSlideIn(event){
        var slideInElImg = $('.animation-about-img'),
              slideInElPar = $('.animation-about-text'),
              slideInElForm = $('.animation-contact-form'),
              slideInElLogos = $('.animation-contact-logos'),
              slideInElTitle = $('.animation-work-title'),
              slideInElLink = $('.animation-work-link'),
              //bottom of window
              slideInElAboutAt = ($(window).scrollTop() + $(window).innerHeight()) - slideInElImg.height() / 2,
              slideInElContactAt = ($(window).scrollTop() + $(window).innerHeight()) - slideInElForm.height() / 2,
              slideInElWorkAt =  ($(window).scrollTop() + $(window).innerHeight()) - slideInElTitle.height() / 2;

        if (slideInElAboutAt > slideInElImg.offset().top) {
            slideInElImg.addClass('active-element');
            slideInElPar.addClass('active-element');
        }
        if (slideInElContactAt > slideInElForm.offset().top) {
            slideInElForm.addClass('active-element');
            slideInElLogos.addClass('active-element');
        }
        if (slideInElWorkAt > slideInElTitle.offset().top) {
            slideInElTitle.addClass('active-element');
            slideInElLink.addClass('active-element');
        }
    }

    /*form validation*/

    function checkForm(){
        event.preventDefault();
        function checkEmail(){
            var emailInput = $('fieldset input[name="email"]'),
                  emailRegEx = /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/,
                  emailValue = emailInput.val();
            return emailValue.match(emailRegEx) !== null ? true : false;
        }
        if (checkEmail()) {
                console.log('correct');
            } else {
            console.log('wrong email');
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
        }
        $(this).on('focusout', function() {
            $(this).css('border', '1px solid #e5e5e5');
        });
    }

    $(window).on('scroll', debounce(stickyMenu, 10));
    $(window).on('scroll', debounce(showAnimationSlideIn));
    slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
    $(window).on('resize', startSlider);
    hamburgerMenu.on('click', showMobileMenu);
    startSlider();
    $('fieldset a.submit').on('click', checkForm);
    $('.newsletter .newsletter-email').on('keyup', checkEmail);
    $('ul.navigation a').on('click', showSection);
    $('.scrollUp').on('click', backToTop);
    $(window).on('resize', mobileMenu);
});
