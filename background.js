var continue = true;
var timebetweenupdates = 30; // in seconds
var chosensubreddit = "";
var numofpoststoreturn = 1;

function returnredditurl(subreddit, maxnumofupvotes) {
  return "reddit.com/r/" + subreddit + "/new.json?sort=new&limit=" + numofpoststoreturn;
}

function checkforredditposts() {
  if (continue && chosensubreddit) {
    $.ajax({
      crossDomain: true,
      dataType: "json",
      url: 
    }).done(function(data) {
      console.log(data);
      window.setTimeout(checkforredditposts, timebetweenupdates * 1000);
    });
  }
}
