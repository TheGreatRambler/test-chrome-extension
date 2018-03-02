var defaulttime = 30000;

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

function dothestuff() {
    chrome.storage.sync.get(["timebetweenupdates", "chosensubreddit", "numofpoststoreturn", "timetokeepup"], function(items) {
        if (!items.chosensubreddit) {
            dothestuff();
        } else {
            console.log("accessed variables: ", items);
            var timebetweenupdates = items.timebetweenupdates; // in seconds
            var chosensubreddit = items.chosensubreddit;
            var numofpoststoreturn = items.numofpoststoreturn;
            var timeofpostsappear = items.timetokeepup;

            function returnredditurl(subreddit, n) {
                return "https://www.reddit.com/r/" + subreddit + "/new.json?sort=new&limit=" + n;
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
                        chrome.tabs.query({
                            "currentWindow": true,
                            "active": true
                        }, function(tab) {
                            console.log("got the tab: ", tab[0]);
                            chrome.tabs.sendMessage(tab[0].id, {
                                jsondata: data,
                                timetokeepup: timeofpostsappear
                            }, function(response) {
                                console.log("message sent");
                            });
                        });
                    });
                } else {
                    console.log("no.");
                }
                console.log("time to next check: " + (timebetweenupdates || defaulttime) + " seconds");
                timesincelastpost = 0;
                createtimeout();
            }

            function createtimeout() {
                chrome.alarms.create("update", {
                    when: (Date.now() + (timebetweenupdates * 1000)) || (Date.now() + defaulttime)
                });
            }

            createtimeout();

            chrome.alarms.onAlarm.addListener(function(alarm) {
                if (alarm.name === "update") {
                    checkforredditposts();
                }
            });
        }
    });
}

dothestuff();
