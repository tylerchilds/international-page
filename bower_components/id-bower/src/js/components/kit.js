$(function(){

  /*

  Kit show modal

  */

  Identity.show_modal = function(options){
    var settings = {
      modal: '.overlay'
    };

    _.extend(settings, options);

    $(settings.modal).addClass('overlay--is_active');

    $('body').addClass('u-no-scroll');

    $(document).trigger( "modal-opened", { $elem: $(settings.modal) } );
  };

  // event for showing modal
  $( document ).on('click', '.js-show-modal', function(){
      var modal = '#'+ $(this).data('id');

      Identity.show_modal({modal: modal});
  });

  /*

  Kit close modal

  */

  Identity.close_modal = function(options){
    var settings = {
      modal: '.overlay'
    };

    _.extend(settings, options);

    $(settings.modal).removeClass('overlay--is_active');

    $('body').removeClass('u-no-scroll');

    $(document).trigger( "modal-closed", { $elem: $(settings.modal) } );
  };

  // event for closing modal
  $( document ).on('click', '.js-close-modal', function(){
      var modal = '#'+ $(this).data('id');

      Identity.close_modal({modal: modal});
  });

  // event for closing modal on overlay click
  $( document ).on('click', '.overlay', function(event){
      if($(event.target).is('.modal') || $(event.target).parents('.modal').length > 0){
        event.stopPropagation();
        return true;
      }

      var modal = '#'+ $(this).attr('id');

      Identity.close_modal({modal: modal});
  });

  /*

  Kit toggle tab

  */
  $( document ).on('click', '.js-toggle-tab', function(){
      var tab = $(this).data('id');
      var $tabs = $(this).parents('.tabs');
      var group = $tabs.attr('id');

      $tabs.find('.js-toggle-tab').removeClass('tabs-toggle--is_active');
      $('.'+ group).find('.js-tabs-content').removeClass('tabs-content--is_active');

      $(this).addClass('tabs-toggle--is_active');
      $('#'+ tab).addClass('tabs-content--is_active');

      $(document).trigger( "tab-toggled", { $elem: $('#'+ tab) } );
  });

  /*

  Kit toggle accordion

  */
  $( document ).on('click', '.js-toggle-accordion', function(){
      var accordion = $(this).data('id');

      $(this).toggleClass('accordion--is_active');
      $('#'+ accordion).slideToggle(200);

      $(document).trigger( "accordion-toggled", { $elem: $('#'+ accordion) } );
  });

  /*

  Kit show_popover

  */

  Identity.show_popover = function(options){
    var settings = {
      popover: null
    };

    _.extend(settings, options);

    $(settings.popover).addClass('popover--is_active');
    $('body').addClass('js-popover--is_active');

    $(document).trigger( "popover-shown", { $elem: $(settings.popover) } );
  };

  /*

  Kit hide_popover

  */

  Identity.hide_popover = function(options){
    var settings = {
      popover: null
    };

    _.extend(settings, options);

    $(settings.popover).removeClass('popover--is_active');
    $('body').removeClass('js-popover--is_active');

    $(document).trigger( "popover-hidden", { $elem: $(settings.popover) } );
  };

  /*

  Kit hover popover

  */
  $( document )
    .on('mouseenter', '.js-hover-popover', function(){
      var popover = '#'+ $(this).data('id');

      Identity.show_popover({popover: popover});

  }).on('mouseleave', '.js-hover-popover', function(){
      var popover = '#'+ $(this).data('id');

      Identity.hide_popover({popover: popover});
  });

  /*

  Kit click popover

  */
  $( document ).on('click', '.js-click-popover', function(){
    var popover = '#'+ $(this).data('id');

    Identity.show_popover({popover: popover});
  });

  $( document ).on('click', '.js-popover--is_active', function(){
    if($(event.target).is('.popover') || $(event.target).parents('.popover').length > 0){
      event.stopPropagation();
      return true;
    }

    var popover = '#'+ $('.popover--is_active').attr('id');

    Identity.hide_popover({popover: popover});
  });
});