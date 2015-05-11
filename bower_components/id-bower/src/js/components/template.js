Identity.initialize_template_events = function(){
  $(document).on('click', '.js-toggle-mobile_nav', function(){
    $('.js-sub_nav').toggleClass('sub_nav--is_active');

    if( $(this).is(".nav-toggle--signed_out")) return;

    $(this).toggleClass('fa-caret-down fa-caret-up');
    $('.js-content, .js-footer').toggleClass('u-hidden--mobile');
  });

  $(document).on('scroll', function() {
    if ($(document).scrollTop() >= 240) {
      $('.js-scroll_to_top').addClass('scroll_to_top--is_active');
    } else {
      $('.js-scroll_to_top').removeClass('scroll_to_top--is_active');
    }
  });

  $(document).on('click', '.js-scroll_to_top', function() {
    $("html, body").animate({ scrollTop: 0 }, 0);
  });

  $(window).on('load resize', function(){
    if($(window).width() > 768){
      $('body').css('padding-top', $('.header').not('u-static').outerHeight() + 'px');
      $('.header').addClass('u-fixed');
    } else {
      $('body').css('padding-top', 0);
      $('.header').removeClass('u-fixed');
    }

    $('body').css('padding-bottom', $('.footer').outerHeight() + 'px');
    $('.footer').addClass('u-absolute');
  });
  console.log('what');
};

Identity.initialize_template_events();