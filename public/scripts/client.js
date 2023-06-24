/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function(){
  
  //escape function prevents cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  
  const createTweetElement = function(tweet) {
    let time = timeago.format(new Date(tweet.created_at)) 
    const $tweet = $(`
      <article >
        <header>
          <div class="user">
            <span>
              <img src=${tweet.user.avatars}>
            </span>
            <span>
              <h3 class="userName">${tweet.user.name}</h3>
            </span>
          </div>
          <div class="handle">${tweet.user.handle}</div>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <hr>
        <footer>
          <div class="days-ago">${time}</div>     
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `)
    return $tweet;
  }
  
  const renderTweets = function(tweets) {
    $('.allTheTweets').empty();
    tweets.forEach(tweet => {
      const $tweetElement = createTweetElement(tweet);
      $('.allTheTweets').prepend($tweetElement);
    })
  }
  
  const loadTweets = function(){
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: 'json',
      success: function(res) {
      console.log("Data loaded successfully", res);
      renderTweets(res)
    },
      error: function() {
      console.error("Error loading data");
    }
    })
   }
  loadTweets()                   
  

  //listener for submit button
  $('#tweet-form').on("submit", function (event) {
    event.preventDefault();
    
    const tweetContent = document.getElementById("tweet-text")
    const tweetText = tweetContent.value;  
    if (!tweetText){        
      $(".error-message").text(" ❗ Your tweet is empty. ❗ ").slideDown();
      return
    }
    if(tweetText.length > 140) {       
      $(".error-message").text(" ❗ Your tweet is too long. ❗ ").slideDown();
      return
    }
  

    //post happens inside the listener
    const formData = $('#tweet-form').serialize();
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
        success: function() {
          console.log("Data submitted successfully");
          $("#tweet-text").val("")
          $('#counter').val("140")
          loadTweets();           
        },
        error: function() {
          console.error("Error submitting data");
        }
      });

  })
  
  //listener for write button, which is actually a div
  const writeBtn = document.querySelector('.write-tweet');
  const writeForm = document.querySelector('.new-tweet');
    writeBtn.addEventListener('click', function() {
      console.log('Div was clicked!');
      if (writeForm.style.display !== "none") {
        writeForm.style.display = "none";
      } else {
        writeForm.style.display = "flex"
      }
      })
    
    
})