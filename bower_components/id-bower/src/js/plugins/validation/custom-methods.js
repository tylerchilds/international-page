/*

Custom Validation methods

We want to inherit the canonical additional-methods
from the jquery-validate.js plugin. This allows us
to do that.

*/
(function( factory ) {
  if ( typeof define === "function" && define.amd ) {
    define( ["jquery", "./jquery.validate"], factory );
  } else {
    factory( jQuery );
  }
}(function( $ ) {


  // this one doesn't check for non spaces
  $.validator.addMethod("ascii_only_email", function(value, element) {
    return this.optional(element) || /^[\x00-\x7F]*@.*$/.test(value);
  }, "Please enter only valid characters");

  // this one doesn't check for non spaces
  $.validator.addMethod("ascii_only", function(value, element) {
    return this.optional(element) || isAsciiOnly(value);
  }, "Please enter only valid characters");

  function isAsciiOnly(text) {
    return /^[\x00-\x7F]*$/.test(text);
  };

  $.validator.addMethod("letterswithbasicpunc", function(value, element) {
    return this.optional(element) || /^[a-z\-.,()'"\s]+$/i.test(value);
  }, "Letters or punctuation only please");

  // this one is good for full name and non-latin characters - two words minimum
  $.validator.addMethod("fullName", function(value, element) {
    return this.optional(element) || /^[^\s]+?\s+[^\s]+?.*?$/.test(value);
  }, "Please enter atleast a first and last name");

  $.validator.addMethod("vanityslug", function(value, element) {
    if (!/[\$\&\+,\/\:;\=\?@\s\<>\#\%\|\{\}\\\^\~\[\]\`]/i.test(value)) {
      return true;
    }
    return false;
  }, "Please enter a valid vanity slug");

  $.validator.addMethod("excludespecial", function(value, element) {
    if (!/[\d\_\$\&\+,\/\:;\=\?@\<>\#\%\|\{\}\\\^\~\[\]]/i.test(value)) {
      return true;
    }
    return false;
  }, "Please remove any special characters");

  $.validator.addMethod("alphanumericandspace", function(value, element) {
    return this.optional(element) || /^[\w\-\.\s]+$/i.test(value);
  }, "Letters, numbers or spaces only");

  $.validator.addMethod("alphaspaces", function(value, element) {
      return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
  }, "Please only enter a name");

  $.validator.addMethod("alphaspacesdash", function(value, element) {
      return this.optional(element) || /^[a-zA-Z\-\s]+$/i.test(value);
  }, "Please letters, spaces and dashes only");

  // Credit card month/year validation, MM/YYYY prior to today's date are not accepted
  function isDateExpired(date) {
    if(date > new Date()){
      $(document).trigger('expirationValid');
      return true;
    }

    return false;
  };

  // Year validation (credit card)
  $.validator.addMethod("actualYear", function(value, element) {
    var year = parseInt(value),
        monthEl = document.getElementById("exp-month"),
        month = parseInt(monthEl.options[monthEl.selectedIndex].value) || 1,
        check = isDateExpired(new Date(year, month , 0));
    return this.optional(element) || check;
  }, "Card has exprired");

  // Month validation (credit card)
  $.validator.addMethod("actualMonth", function(value, element) {
    var yearEl = document.getElementById("exp-year"),
        year = parseInt(yearEl.options[yearEl.selectedIndex].value) || 1,
        month = parseInt(value),
        check = isDateExpired(new Date(year, month, 0));
    if (!_.isNull($('.js-exp-year').val())){
      return this.optional(element) || check;
    } else {
      return true;
    }
  }, "Card has exprired");

  // Age validation (user must be older than 13)
  window.isAgeAllowed = function (birth) {
    var rubicon = new Date();
        rubicon.setYear(rubicon.getFullYear() - 13);
    birth = new Date(birth);
    var check = birth <= rubicon;
    // we have to unify error notification system for custom selects, this is temporary solution, but it works
    if (check) $("#age_month, #age_day, #age_year").parents(".custom-select-field-border").removeClass("field-error");
    return check;
  };

  window.checkAge = function () {
    var month = parseInt($("#age_month").val()) || 1,
        day = parseInt($("#age_day").val()) || 1,
        year = parseInt($("#age_year").val()) || new Date().getFullYear() - 13;
    return isAgeAllowed(+new Date(year, month - 1, day));
  };

  $.validator.addMethod("bDate", function(value, element) {
    return this.optional(element) || checkAge();
  }, "You have to be older than 13");


  $.validator.addMethod("luhn", function(value, element) {
    // this requires the common-charge.js library to be included
    // -> it is provided by the storm team
    // -> they are using http://jquerycreditcardvalidator.com/
    return $(element).validateCreditCard().valid;
  }, "Invalid Credit Card Type");

}));