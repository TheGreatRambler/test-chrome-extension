var timesincelastpost = 0;
setInterval(function() {
    timesincelastpost++;
    console.log(timesincelastpost);
}, 1000);

//Needed for first installation
chrome.runtime.onInstalled.addListener(function(dataobject) {
    if (dataobject.reason === 'install') {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage(startofextension);
        } else {
            chrome.tabs.create({
                url: chrome.runtime.getURL('options.html')
            }, startofextension);
        }
        function startofextension() {
            console.log("Options Page Open");
        }
    }
});
// end

var docontinue = true;
chrome.storage.sync.get(["timebetweenupdates", "chosensubreddit", "numofpoststoreturn", "timetokeepup"], function(items) {
    var timebetweenupdates = items[0]; // in seconds
    var chosensubreddit = items[1];
    var numofpoststoreturn = items[2];
    var timeofpostsappear = items[3];

    function returnredditurl(subreddit, n) {
        return "reddit.com/r/" + subreddit + "/new.json?sort=new&limit=" + n;
    }

    function checkforredditposts() {
        if (docontinue && chosensubreddit) {
            $.ajax({
                crossDomain: true,
                dataType: "text",
                url: returnredditurl(chosensubreddit, numofpoststoreturn)
            }).done(function(data) {
                timesincelastpost = 0;
                chrome.tabs.getSelected(null, function(tab) {
                    chrome.tabs.executeScript(tab.id, {
                        file: "displaypost.js?data=" + data + "&timetokeepup=" + timeofpostsappear
                    }, function(response) {});
                });
                window.setTimeout(checkforredditposts, timebetweenupdates * 1000);
            });
        }
    }
});
