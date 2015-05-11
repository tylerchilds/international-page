validRules = {
  first_name: {required: true },
  last_name: {required: true},
  email: {email: true, required: true, ascii_only_email: true},
  zip_code: { zipcodeUS: true, required: true },
  address: { minlength: 4, required: true, alphanumericandspace: true },
  required: {required: true },
  not_required: {required: false},

  password: { minlength: 6, required: true  },
  password_again: { required: true, equalTo: '#password' },

  credit_card_name: { minlength: 4, required: true },
  credit_card: { creditcard: true, required: true},
  cvc: { minlength: 3, maxlength: 4, digits: true,  required: true},
  zip_us_required: { zipcodeUS: true, required: true },
  zip_us_optional: { zipcodeUS: true, required: false },
  select_month: { required: true, actualMonth: true},
  select_year: { required: true, actualYear: true},
  select: { required: true },
  checkbox: { required: true },
  birth_year: {bDate: true },
  optional_year: {required: false},
  credit_card_plus:{required: true, luhn: true},
  city_state_optional: { minlength: 4, required: false, letterswithbasicpunc: true}
};

function setup_validations(inputs){
  $.each(inputs, function(i,el){
    var iDRules = validRules[$(el).attr("validation")];
    // tell validator plugin to set this rule on the input
    $(el).rules("add", iDRules);
  });
}

function run_validations(selector) {
  $.each(selector, function(i,el){
    // if a form has inputs with validations then apply them
    var input_validations = $(el).find("input[validation], select[validation], textarea[validation]");
    if(input_validations.length > 0){
      $(el).validate();
      setup_validations(input_validations);
    }
  });
}

function custom_require_year(error, element){
  error.insertBefore(element.parent()).wrap('<label class="error"></label>');
}

function find_error_placement($label){

  // label does not have custom validation placement, just return
  if($label.data('validation-placement') == undefined){
    return $label;
  }

  // return the id of the custom placement element
  return $('#'+ $label.data('validation-placement'));
}

$(function(){

  $.validator.setDefaults({ //override library defaults

    debug: false,

    errorElement: 'span',
    errorClass: 'validation-label',

    errorPlacement: function(error, element) {
      var $el = $(element);
      var $label = $el.parents('label');
      var $placement = find_error_placement($label);

      // don't process input fields that we aren't validating
      if($el.attr("validation") === undefined) return;

      // if we have an error with the same id, remove it
      if ($placement.has(error[0].id)) {
        $placement.find(error[0].id).parent().remove();
      }

      error.appendTo($placement).wrap('<div class="validation validation--error"></div>');
    },

    highlight: function(element){
      var $el = $(element);
      var $label = $el.parents('label');
      var $placement = find_error_placement($label);

      // don't process input fields that we aren't validating
      if($el.attr("validation") === undefined) return;

      // add highlighting to element
      $label.addClass('error');

      $placement
        .find("#"+ $el[0].name +"-error")
          .parent()
            .addClass("validation--error")
            .removeClass("validation--success");
    },

    unhighlight: function(element, error){
      var $el = $(element);
      var $label = $el.parents('label');
      var $placement = find_error_placement($label);

      // don't process input fields that we aren't validating
      if($el.attr("validation") === undefined) return;

      // remove highlighting from element
      $label.removeClass('error');

      $placement
        .find("#"+ $el[0].name +"-error")
          .parent()
            .removeClass("validation--error")
            .addClass("validation--success");
    }

  });
  run_validations($("form"));
});

$(document).on("runValidator", function(e,data){
  run_validations(data);
});

$(document).on("select:changed", function(e,data){
  $(data).valid();
});