
$(function() {
  'use strict';

  /*
  ---------------------------------------------
  Init
  ---------------------------------------------
   */
  var initContactForm, initCounter, initGrain, initNav, initScroll, initServicesCarousel, initSlideshow, initSubscribeForm, initTeamCarousel, initTrianglify, initVideoBg, isMobile, testMobile;
  $(document).on('ready', function() {
    initCounter();
    initSubscribeForm();
    initContactForm();
    initTeamCarousel();
    initServicesCarousel();
    initGrain();
    initNav();
    initSlideshow();
    initTrianglify();
    initVideoBg();
  });

  /*
  ---------------------------------------------
  Preloader
  ---------------------------------------------
   */
  $(window).on('load', function() {
    setTimeout((function() {
      $('body').addClass('loaded');
      initScroll();
    }), 200);
  });

  /*
  ---------------------------------------------
  Test Device
  ---------------------------------------------
   */
  isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
  };
  testMobile = isMobile.any();

  /*
  ---------------------------------------------
  Grain Effect
  ---------------------------------------------
   */
  initGrain = function() {
    if (typeof grained !== "undefined" && grained !== null) {
      grained('#overlay', {
        animate: false,
        patternWidth: 200,
        patternHeight: 200,
        grainOpacity: 0.03,
        grainDensity: 1,
        grainWidth: 1,
        grainHeight: 1
      });
    }
  };

  /*
  ---------------------------------------------
  Navigation
  ---------------------------------------------
   */
  initNav = function() {
    var hBg, mNav;
    mNav = $('#main-nav');
    hBg = $('#home').css('background');
    mNav.append('<span class="mobile-nav-close"><i class="mdi mdi-close"/></span>');
    $('#header .wrapper').append('<span class="mobile-nav-icon"><i class="mdi mdi-menu"/></span>');
    $('#home').css('background-color', 'transparent');
    $('#overlay').css('background', 'linear-gradient(45deg, #434343, #000000)');
    $('a', mNav).each(function(i, e) {
      $(e).after('<span>' + e.text + '</span>');
      $(e).on('click touchend', function(c) {
        var target;
        c.preventDefault();
        target = $(this).attr('href');
        $('a', mNav).removeClass('active');
        $(this).addClass('active');
        if (target === '#home') {
          $('#page').removeClass('home-inactive');
        } else {
          $('#page').addClass('home-inactive');
        }
        $('#page section').removeClass('active');
        $(target).addClass('active');
        initScroll();
      });
    });
    $('.mobile-nav-icon,.mobile-nav-close').on('click touchend', function(c) {
      c.preventDefault();
      $('#page').toggleClass('mobile-nav-on');
    });
  };

  /*
  ---------------------------------------------
  Content Scrolling
  ---------------------------------------------
   */
  initScroll = function() {
    var showScroll;
    showScroll = function() {
      var ch, page, vh;
      page = $('#page');
      vh = $(window).height();
      ch = $('section.active .container-inner', page).outerHeight();
      if (ch > vh) {
        page.addClass('scroll-on');
        if ($('#page.slideshow').length && $.fn.backstretch) {
          $('#page.slideshow').backstretch('resize');
        }
      } else {
        page.removeClass('scroll-on');
      }
    };
    showScroll();
    $(window).on('resize', function() {
      showScroll();
    });
  };

  /*
  ---------------------------------------------
  Services Carousel
  ---------------------------------------------
   */
  initServicesCarousel = function() {
    var $owl1, $owl1Opts, initOwl1;
    if ($('#about .services-list').length && $('#about .services-list').hasClass('owl-carousel') && $.fn.owlCarousel) {
      $owl1 = $('#about .services-list');
      $owl1Opts = {
        margin: 30,
        nav: true,
        dots: false,
        mouseDrag: false,
        navText: ['<i class="mdi mdi-chevron-left"></i>', '<i class="mdi mdi-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
          1024: {
            items: 3
          },
          1200: {
            items: 4
          }
        }
      };
      initOwl1 = function() {
        if ($(window).width() > 1024) {
          $owl1.addClass('owl-carousel');
          $owl1.owlCarousel($owl1Opts);
        } else {
          $owl1.trigger('destroy.owl.carousel');
          $owl1.removeClass('owl-carousel');
        }
      };
      initOwl1();
      $(window).on('resize', function() {
        initOwl1();
      });
    }
  };

  /*
  ---------------------------------------------
  Team Carousel
  ---------------------------------------------
   */
  initTeamCarousel = function() {
    if ($('#our-team .team-list').length && $('#our-team .team-list').hasClass('owl-carousel') && $.fn.owlCarousel) {
      $('#our-team .team-list').owlCarousel({
        margin: 30,
        nav: true,
        dots: false,
        mouseDrag: false,
        navText: ['<i class="mdi mdi-chevron-left"></i>', '<i class="mdi mdi-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          640: {
            items: 2
          },
          1024: {
            items: 3
          },
          1200: {
            items: 4
          }
        }
      });
    }
  };

  /*
  ---------------------------------------------
  Counter
  ---------------------------------------------
   */
  initCounter = function() {
    if ($('#counter').length && $.fn.countdown) {
      $('#counter').countdown($('#counter').data('date')).on('update.countdown', function(event) {
        var $this;
        $this = $(this).html(event.strftime("<span id=\"counter-days\">%D <span>Days</span></span>\n<span id=\"counter-hours\">%H <span>Hours</span></span>\n<span id=\"counter-minutes\">%M <span>Minutes</span></span>\n<span id=\"counter-seconds\">%S <span>Seconds</span></span>"));
      });
    }
  };

  /*
  ---------------------------------------------
  Slideshow Background
  ---------------------------------------------
   */
  initSlideshow = function() {
    var i, list, selector, slides;
    if ($('#page.slideshow').length && $.fn.backstretch) {
      selector = $('#page.slideshow');
      if (selector.data('slides' != null)) {
        slides = selector.data('slides').split(',');
        if (slides.length > 1) {
          list = new Array;
          i = 0;
          while (i < slides.length) {
            list.push(slides[i]);
            ++i;
          }
          selector.backstretch(list, {
            duration: selector.data('delay') != null ? selector.data('delay') : 3000,
            fade: 750
          });
        } else {
          selector.backstretch(slides);
        }
      }
    }
  };

  /*
  ---------------------------------------------
  Triangle Background
  ---------------------------------------------
   */
  initTrianglify = function() {
    var selector, t;
    if ($('#page.triangle').length && (typeof Trianglify !== "undefined" && Trianglify !== null)) {
      selector = $('#page.triangle');
      selector.append('<div class="triangles"/>');
      t = new Trianglify({
        width: window.innerWidth,
        height: window.innerHeight,
        cell_size: 90,
        variance: 1,
        x_colors: selector.data('colors') != null ? selector.data('colors') : 'random'
      });
      $('.triangles', selector).css({
        'background-image': 'url(' + t.png() + ')'
      });
    }
  };

  /*
  ---------------------------------------------
  Video Background
  ---------------------------------------------
   */
  initVideoBg = function() {
    var selector;
    if ($('#page.video').length && $.fn.YTPlayer) {
      selector = $('#page.video');
      if (testMobile != null) {
        selector.prepend('<div class="mbYTP_wrapper" style="position: absolute; z-index: 0; width: 100%; height: 100%; left: 0; top: 0; background-image:url(' + selector.data('image') + ');"></div>');
      } else {
        selector.YTPlayer({
          videoURL: selector.data('video'),
          containment: 'self',
          loop: true,
          vol: 100,
          showControls: false,
          showYTLogo: false,
          addRaster: true,
          stopMovieOnBlur: false,
          gaTrack: false
        });
        $('.video-controls a', selector).on('click touchend', function(e) {
          e.preventDefault();
          if ($(this).hasClass('play-btn')) {
            if ($(this).hasClass('pause-on')) {
              selector.YTPPlay();
              $(this).toggleClass('pause-on');
              $('i', this).attr('class', 'mdi mdi-pause');
            } else {
              selector.YTPPause();
              $(this).toggleClass('pause-on');
              $('i', this).attr('class', 'mdi mdi-play');
            }
          }
          if ($(this).hasClass('vol-btn')) {
            if ($(this).hasClass('sound-off')) {
              selector.YTPUnmute();
              $(this).toggleClass('sound-off');
              $('i', this).attr('class', 'mdi mdi-volume-high');
            } else {
              selector.YTPMute();
              $(this).toggleClass('sound-off');
              $('i', this).attr('class', 'mdi mdi-volume-off');
            }
          }
        });
      }
    }
  };

  /*
  ---------------------------------------------
  CHECK Form
  ---------------------------------------------
   */
  initSubscribeForm = function() {
    var email, form, message;
    form = $('#subscribe-form');
    message = $('.subscribe-form-info');
    email = $('#subscribe-form-email');
    /*message.html('<p class="bg-success"><i class="mdi mdi-checkbox-marked-circle-outline"></i> ЗАЛУПА</p>')
      output = '<p class="bg-success"><i class="mdi mdi-checkbox-marked-circle-outline"></i> ' + data.text + '</p>';
      output = '<p class="bg-danger"><i class="mdi mdi-close-circle-outline"></i> ' + data.text + '</p>';
    */
      isUrlValid(message.val());
function isUrlValid(userInput) {
    var res = userInput.match(/(http[s]?:\/\/)?([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2}(\/([-~%\.\(\)\w\d]*\/*)*(#[-\w\d]+)*?)/g);
    if(res == null){
        return false;
         email.parent().addClass('has-error');
        console.log('ХУЙ');
    }else{
        email.parent().hasClass('has-error')
        return true;
        console.log('НОРМ');
        }

      }

  };

  /*
  ---------------------------------------------
  Contact Form
  ---------------------------------------------
   */
  initContactForm = function() {
    var email, form, info, message, name;
    form = $('#contact-form');
    info = $('.contact-form-info');
    name = $('#contact-form-name');
    email = $('#contact-form-email');
    message = $('#contact-form-message');
    form.on('submit', function(e) {
      var action, post_data, validateEmail;
      e.preventDefault();
      action = $(this).attr('action');
      validateEmail = function(email) {
        var exp;
        exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return exp.test(email);
      };
      if (!validateEmail(email.val())) {
        email.parent().addClass('has-error');
      }
      if (name.val() === '') {
        name.parent().addClass('has-error');
      }
      if (message.val() === '') {
        message.parent().addClass('has-error');
      }
      if (!email.parent().hasClass('has-error') && !name.parent().hasClass('has-error') && !message.parent().hasClass('has-error')) {
        post_data = {
          'userName': name.val(),
          'userEmail': email.val(),
          'userMessage': message.val()
        };
        $.post(action, post_data, (function(data) {
          var output;
          if (data.type === 'error') {
            output = '<p class="bg-danger"><i class="mdi mdi-close-circle-outline"></i> ' + data.text + '</p>';
          } else {
            output = '<p class="bg-success"><i class="mdi mdi-checkbox-marked-circle-outline"></i> ' + data.text + '</p>';
            email.val('');
            name.val('');
            message.val('');
          }
          info.html(output).fadeIn(200);
        }), 'json');
      }
    });
    $('input,textarea', form).on('keyup', function() {
      $(this).parent().removeClass('has-error');
      if (!$('input, textarea', form).parent().hasClass('has-error')) {
        info.fadeOut(200);
      }
    });
  };
});
