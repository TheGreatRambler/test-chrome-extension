function save_options() {
  var subreddit = document.getElementById('subreddit').value;
  var updatetime = document.getElementById('updatetime').value;
  chrome.storage.sync.set({
    timebetweenupdates: updatetime,
    chosensubreddit: subreddit
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.innerHtml = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('optionssubmit').addEventListener('click',
    save_options);
