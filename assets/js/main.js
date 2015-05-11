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
