function getadlinks() {
  var alllinks = [];
  $("a").each(function() {
    alllinks.push(this);
  });
  return alllinks;
}

console.log(getadlinks());
