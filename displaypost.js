function getParameterByName(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getnecessaryfiles() {
  document.head.insertAdjacentHTML('beforeend', '<link rel=stylesheet href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">');
  var imported = document.createElement('script');
  imported.type = "text/javascript";
  imported.src = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js';
  document.head.appendChild(imported);
  if (!$) {
    var otherimported = document.createElement('script');
    otherimported.type = "text/javascript";
    otherimported.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    document.head.appendChild(otherimported);
  }
}

var currentposts = JSON.parse(getParameterByName("data"));
getnecessaryfiles();
var postsarray = [];
currentposts.data.children.forEach(function (post) {
  if (post.kind === "t3") {
    var element = $(document.createElement('img'));
    element.attr("src", post.data.url);
    postsarray.push(element);
  }
});
var htmldata = postsarray[0];
for (var g = 1; g < postsarray.length; g++) {
  htmldata.add(postsarray[g]);
}
Materialize.toast(htmldata, getParameterByName(timetokeepup));
console.log(currentposts);
