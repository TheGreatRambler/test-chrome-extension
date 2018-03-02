function getnecessaryfiles() {
    document.head.insertAdjacentHTML('beforeend', '<link rel=stylesheet href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">');
    if (!Materialize) {
        var imported = document.createElement('script');
        imported.type = "text/javascript";
        imported.src = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js';
        document.head.appendChild(imported);
    }
    if (!$) {
        var otherimported = document.createElement('script');
        otherimported.type = "text/javascript";
        otherimported.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
        document.head.appendChild(otherimported);
    }
}

function commenceprocess(currentposts, timetokeepup) {
    getnecessaryfiles();
    var postsarray = [];
    currentposts.data.children.forEach(function(post) {
        if (post.kind === "t3") {
            var element = $(document.createElement('img'));
            element.attr("src", post.data.url);
            element.attr("width", "10%");
            element.attr("alt", "created by " + post.data.author);
            postsarray.push(element);
        }
    });
    var htmldata = postsarray[0];
    for (var g = 1; g < postsarray.length; g++) {
        htmldata.add(postsarray[g]);
    }
    Materialize.toast(htmldata, timetokeepup);
    console.log(currentposts);

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.flag && request.flag === "%%reddit_incoming_data") {
        commenceprocess(request.jsondata, request.timetokeepup);
    }
});
