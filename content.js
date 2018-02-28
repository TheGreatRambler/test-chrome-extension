function clickads() {
  $("iframe").each(function() {
    var element = $(this);
    if (element[0].id.indexOf("google_ads_iframe") != -1) {
      var link = element.find('a');
      link.click();
    }
  });
}

clickads();
