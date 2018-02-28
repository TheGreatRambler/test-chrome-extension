//Needed for first installation
chrome.runtime.onInstalled.addListener(function (dataobject) {
  if (dataobject.reason === 'install') {
    chrome.tabs.create({
      url: chrome.extension.getURL('startpage.html')
    }, function (tab) {});
  }
});
// end

var continue = true;
var timebetweenupdates = 30; // in seconds
var chosensubreddit = "";
var numofpoststoreturn = 1;

function returnredditurl(subreddit, n) {
  return "reddit.com/r/" + subreddit + "/new.json?sort=new&limit=" + n;
}

function checkforredditposts() {
  if (continue && chosensubreddit) {
    $.ajax({
      crossDomain: true,
      dataType: "text",
      url: returnredditurl(chosensubreddit, numofpoststoreturn)
    }).done(function(data) {
    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.executeScript(tab.id, {
        file: "displaypost.js?data=" + data
      }, function(response) {});
    });
    window.setTimeout(checkforredditposts, timebetweenupdates * 1000);
    });
  }
}
