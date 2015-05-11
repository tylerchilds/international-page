var international_view = {

  // animating active classes on ids features titles
  resetIDSText: function(e){
    $(".feature").removeClass('active');
    $('.circle-with-icon').removeClass('active');
  },

  // swaping ids feature images
  animateIDSImages: function(image){
    $('.browser-wrapper').fadeTo("slow", 0, function(){
      $('#js-feature-img').attr('src', image);
    }).velocity("transition.slideUpIn");
  },

  clickIDSText: function(e){
    var self = $(e.currentTarget);
    clicked = true;

    //for everything not clicked
    international_view.resetIDSText();

    //for clicked item, add bold and make teal icon
    self.find('.circle-with-icon').addClass('active');
    self.addClass('active');
    var image = self.data('img');
    international_view.animateIDSImages(image);
  },

  animateFaq: function(e){
    var self = $(e.currentTarget);
    self.toggleClass("active");
    self.find('.fa-chevron-up, .fa-chevron-down').toggleClass("fa-chevron-up fa-chevron-down");
    self.next(".faq-answer").stop().slideToggle("200");
  },

};

$(document).on('click', ".feature", international_view.clickIDSText );
$(document).on('click', ".faq-question", international_view.animateFaq );

$(function(){
  $("form#subscribe").on("submit", function(e){
    e.preventDefault();
    if($(this).valid()){
      $.ajax({
        url:"subscribe/international",
        method:"POST",
        data: {
          email: $("#int-email").val(),
          country: $("#origin_country").val()
        },
        success: function(response){
          $(".success-overlay").addClass("active");
          $(".thankyou-msg").append(response.message);
        },
        error: function(response){
          $(document).trigger("window:message", {type: "error", content: "Sorry that is an invalid email list", timeout: 5000});
        }
      });
    }
  });
});
