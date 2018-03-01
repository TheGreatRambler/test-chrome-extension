function start() {
    function save_options() {
        var subreddit = document.getElementById('subreddit').value;
        var updatetime = document.getElementById('updatetime').value;
        var postsnum = document.getElementById('postsnum').value;
        var timetokeepup = document.getElementById('timetokeepup').value;
        console.log("options set: ", subreddit, updatetime, postsnum, timetokeepup);
        chrome.storage.sync.set({
            timebetweenupdates: updatetime,
            chosensubreddit: subreddit,
            numofpoststoreturn: postsnum,
            timetokeepup: timetokeepup
        }, function() {
            console.log("done");
            var status = document.getElementById('status');
            status.innerHtml = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }

    function restore_options() {
        chrome.storage.sync.get(["timebetweenupdates", "chosensubreddit", "numofpoststoreturn"], function(items) {
            document.getElementById('updatetime').value = items.timebetweenupdates;
            document.getElementById('subreddit').value = items.chosensubreddit;
            document.getElementById('postsnum').value = items.numofpoststoreturn;
            document.getElementById('timetokeepup').value = items.timetokeepup;
        });
    }
}

document.addEventListener('DOMContentLoaded', start);
document.getElementById('optionssubmit').addEventListener('click', save_options);
