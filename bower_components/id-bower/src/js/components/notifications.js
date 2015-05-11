$(function(){

  function buildNotification(event, options) {

    var $message,
        settings = {},
        defaults = {
          type:       'success',
          content:    'Something generic has occurred and this message is informative.',
          selector:   '#notifications',
          permanent:  false
        };

    if(options.type == "error"){
      defaults.permanent = true;
    }

    // Create our settings object out of our defaults and options
    _.extend(settings, defaults, options);

    // create the notice
    $message = $("<div />")
      .attr({ role: 'notice' })
      .addClass( 'notification' + ' ' + 'notification--' + settings.type)
      .append('<div class="notification-content"> '+ settings.content + '</div>' + '<div class="notification-dismiss"></div>');

    // append the notice to the appropriate container
    $( settings.selector ).append($message);

    $message.slideDown(200);

    if( ! settings.permanent){
      if (_.isNumber(settings.timeout)){
        _.delay(function(){
          $message.slideUp(200, function(){
            $(this).remove();
          });
        }, settings.timeout);
      }
      else {
        _.delay(function(){
          $message.slideUp(200, function(){
            $(this).remove();
          });
        }, delayConfig());
      }
    }

    function delayConfig(){
      if (settings.type == "neutral")
        return 10000;
      if (settings.type == "success")
        return 7000;
    }
  }

  function removeNotification(el){
    var $notification = el.parents('.notification');
    $notification.slideUp(100, function(){
      $notification.remove();
    });
  }

// ***** global event listeners ***** //

  // stick messages to top on scroll
  $(window).scroll(function(e){
    var header_height = $("header").innerHeight(),
                  $el = $('#notifications');

    if ($(this).scrollTop() > header_height){
      $el.css({'position': 'fixed'});

      if($("header").is('.header--static')){
        $el.css({'top': '0'});
      }
    } else if ($(this).scrollTop() <= header_height){
      $el.css({'position': 'absolute'});
      $el.css({'top': header_height});
    }
  });

  $(document).on("window:message", function(event, options){
    buildNotification(event, options);
  });

  // when the dismiss button is clicked on the notice, hide it
  $(document).on('click', '.notification-dismiss', function(){
    removeNotification($(this));
  });
});


