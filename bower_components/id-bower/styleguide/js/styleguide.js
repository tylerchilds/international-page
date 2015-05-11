$(function(){
  $('.example-code').each(function(){
      var example = $(this).children('.prettyprint').not('.no-copy').html();
      $(this).prev('.example-demo').html(example);
  });

  $(document).on('click', '.example-toggle', function(){
    $(this)
      .toggleClass('is-active')
      .prev()
        .slideToggle(200);
  });

  $('.color-cube').each(function(){
    var bgc = $(this).attr('class').split(" ")[1];
    $(this).append("<span>"+ bgc + "</span>");
  });

  $(function(){
    $("form").on('submit', function(e){
      e.preventDefault();
    });
  });

});