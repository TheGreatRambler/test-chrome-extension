function getadlinks() {
  var alllinks = [];
  $("a").each(function(item) {
    alllinks.push(item);
  });
  return alllinks;
}

console.log(getadlinks());
