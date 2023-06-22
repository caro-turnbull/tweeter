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
    tweets.forEach(tweet => {
      const $tweetElement = createTweetElement(tweet);
      $('.allTheTweets').prepend($tweetElement);
      console.log("is it rendering?", $tweetElement)
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
  //loadTweets()
  

  //listener for button
  $('#tweet-form').on("submit", function (event) {
    event.preventDefault();
    
    const tweetContent = document.getElementById("tweet-text")
    const tweetText = tweetContent.value;  
    
    if (!tweetText){        
      alert("Your tweet is empty.")
      return
    }
    if(tweetText.length > 140) {       
      alert("Your tweet is too long.")
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
          loadTweets();
        },
        error: function() {
          console.error("Error submitting data");
        }
      });
  })
  


})