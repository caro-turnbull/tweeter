/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
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



const createTweetElement = function(tweet) {
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
        <div class="days-ago">howmanydaysago</div>
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
    $('.allTheTweets').append($tweetElement);
  })
}



$(document).ready(function(){
  //const $tweet = $(`<article class="allTheTweets">Hello world</article>`);
  //const $tweet = createTweetElement(tweetData);
  //console.log($tweet); // to see what it looks like
  //$('.allTheTweets').append($tweet);
  renderTweets(tweetData);
})