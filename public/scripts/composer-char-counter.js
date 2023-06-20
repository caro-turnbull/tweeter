console.log("working?")

// $(document).ready(function() {
//   $(".new-tweet textarea").on("keypress", function() {
//     let enteredLength = 
//     console.log("typing")
//   })
// });

$(document).ready(function(){
    $('.new-tweet textarea').on('keyup',function() {
      console.log("typing")
      $('#counter').html(140 - ($(this).val().length));
      if($(this).val().length > 140) {
        $('#counter').css("color", "red");
      }
    });
  });
  