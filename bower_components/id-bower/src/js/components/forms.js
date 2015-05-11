Identity.style_selects = function($select_element) { //expects a jquery object
  $select_element.each(function(){
      $(this).selectmenu({
      icons: { button: "fa-sort-desc" },
      width: '100%',
      appendTo: $(this).parent(),
      select: function(event, ui) {
        $(this).parent().find('.ui-selectmenu-text').addClass('ui-selectmenu-text--selected');
      },
      change: function(){
        $(document).trigger("select:changed", $(this));
      }
    });

    $(this).attr('tabindex', -1);
  });
};

$(function(){

  // check if the input has a value and if so make sure the fake placeholder
  // moves to the top of the input field
   $(document).on("input:checkForValue", function(e, label){
    _.each(label, function(el){
      if (!_.isEmpty($(el).val())){
        $(el).siblings('.textfield-label').addClass('textfield-label--is_active');
      }
    });
  });

  // checks an entire form for input values
  $(document).on("form:checkForValues", function(e, form){
    var label = form.find('.textfield input, .textfield textarea');

    _.each(label, function(el){
      if (!_.isEmpty($(el).val())){
        $(el).siblings('.textfield-label').addClass('textfield-label--is_active');
      }
    });
  });

  $(document).on('focus', '.textfield input, .textfield textarea', function() {
    $(this).parent().find('.textfield-label').addClass('textfield-label--is_active');
  });

  $(document).on('focusout', '.textfield input, .textfield textarea', function() {
    if(_.isEmpty($(this).val())){
      $(this).parent().find('.textfield-label').removeClass('textfield-label--is_active');
    }
  });

  // this is a little bit greedy, but it's the easiest way to
  // handle when a form is completed with autocomplete
  $(document).on('change', '.textfield input, .textfield textarea', function() {
    $(document).trigger("form:checkForValues", [$(this).parents('form')]);
  });

  Identity.style_selects($('select'));

});