var timesincelastpost = 0;
setInterval(function() {
    timesincelastpost++;
    console.log("Time since last post: ", timesincelastpost);
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
    console.log("accessed variables");
    var timebetweenupdates = items[0]; // in seconds
    var chosensubreddit = items[1];
    var numofpoststoreturn = items[2];
    var timeofpostsappear = items[3];

    function returnredditurl(subreddit, n) {
        return "reddit.com/r/" + subreddit + "/new.json?sort=new&limit=" + n;
    }

    function checkforredditposts() {
        console.log("should I open post?");
        if (docontinue && chosensubreddit) {
            console.log("yes...");
            console.log("starting process");
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
            });
        } else {
            console.log("no.");
        }
        console.log("time to next check: " + timebetweenupdates + " secomds");
        createtimeout();
    }
    
    function createtimeout() {
        chrome.alarms.create("update", {
            when: (Date.now() + (timebetweenupdates * 1000)) || (Date.now() + 30000)
        });
    }
    
    createtimeout();
    
    chrome.alarms.onAlarm.addListener(function (alarm){
        if (alarm.name === "update") {
            checkforredditposts();
        }
    });
});
