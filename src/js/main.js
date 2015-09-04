// Main
$(function () {
  "use strict";

  var gm = google.maps;
  var map = new gm.Map(document.getElementById("map"), {
    center: new gm.LatLng(40.766300, -73.977734),
    disableDefaultUI: true,
    scrollwheel: false,
    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}], // https://snazzymaps.com/style/1/pale-dawn
    zoom: 13
  });


  // $(window).on("resize", resize).trigger("resize");


});






// function resize () {
//   var vh, vw, vr;
//   vh = document.documentElement.clientHeight;
//   vw = document.documentElement.clientWidth;
//   vr = vh / vw;
//   $("#map").css({ position: "relative", width: px(vw), height: px(vh) });
// }

// function px (v) {
//   return v + "px";
// }


