function save_options() {
  var subreddit = document.getElementById('subreddit').value;
  var updatetime = document.getElementById('updatetime').value;
  chrome.storage.sync.set({
    timebetweenupdates: updatetime,
    chosensubreddit: subreddit,
    numofpoststoreturn: 1
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.innerHtml = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('optionssubmit').addEventListener('click',
    save_options);
