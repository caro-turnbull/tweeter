/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//const { response } = require("express");


const tweetData = 
  [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1687196906305
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1687283306305
    }
  ]


$(document).ready(function(){


  const createTweetElement = function(tweet) {
    let time = timeago.format(Date.now())       //<--- 
    console.log("testing testing", tweet.user.avatars)
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
        <p>${tweet.content.text}</p>
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
  //renderTweets(tweetData), '.allTheTweets';  //param??? loadTweets()
  
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
  

  //listener 
  $('#tweet-form').on("submit", function (event) {
    event.preventDefault();
    console.log("button pushed!")
    
    const formData = $('#tweet-form').serialize();
    console.log("data is", formData)
    if (formData.text === ""){        //<--- 
      alert("Your tweet is empty.")
      return
    }
    if(formData.length > 140) {       //<--- 
      alert("Your tweet is too long.")
      return
    } 
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