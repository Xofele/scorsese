$(function() {

  var ctrl = new ScrollMagic.Controller();
  var gm = google.maps;

  var mapOptions = {
    center: new gm.LatLng(40.766300, -73.977734),
    disableDefaultUI: true,
    scrollwheel: false,
    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}], // https://snazzymaps.com/style/1/pale-dawn
    zoom: 13,
    zoomControl: true
  };

  var pin = {
    path: "m0.05195,-0.07428c-0.63931,-3.138 -1.76633,-5.74954 -3.13148,-8.16974c-1.01259,-1.79526 -2.18562,-3.4523 -3.271,-5.19333c-0.36232,-0.58109 -0.675,-1.19516 -1.02315,-1.79822c-0.69614,-1.20605 -1.26054,-2.60439 -1.22469,-4.41824c0.03505,-1.77219 0.54759,-3.19382 1.28671,-4.35614c1.21562,-1.91174 3.25182,-3.47919 5.9839,-3.89108c2.23387,-0.33679 4.32825,0.23218 5.81332,1.10065c1.21365,0.70972 2.15358,1.65768 2.86792,2.7749c0.74567,1.16614 1.25917,2.54376 1.3022,4.34067c0.02211,0.92065 -0.12862,1.77319 -0.341,2.48038c-0.21486,0.71582 -0.5605,1.31423 -0.86803,1.95333c-0.6004,1.24765 -1.353,2.39072 -2.1084,3.53445c-2.24988,3.40698 -4.36157,6.88141 -5.28631,11.64237z",
    fillColor: "#fff",
    fillOpacity: 1,
    scale: 1,
    strokeOpacity: 1,
    strokeColor: "#000",
    strokeWeight: 1.5
  };


  var items = _($(".film")).map(function (item, i) {
    return {
      id: $(item).data("id"),
      elemFilm: item,
      elemSplash: item.querySelector(".splash"),
      elemOverlay: item.querySelector(".overlay"),
      elemQuote: item.querySelector(".quote"),
      elemTitle: item.querySelector(".title"),
      elemText: item.querySelector(".text"),
      elemMapContainer: item.querySelector(".mapContainer")
    };
  }).value();

  _.forEach(items, function (item, i) {

    var tween = new TimelineMax().add([
      TweenMax.to(item.elemSplash, 1, { backgroundPosition: "0% 100%", ease: Linear.easeNone }),
      TweenMax.to(item.elemOverlay, 1, { opacity: 0, ease: Power1.easeIn }),
      TweenMax.to(item.elemQuote, 1, { opacity: 0, top: 0, ease: Linear.easeNone }),
      TweenMax.to(item.elemTitle, 1, { opacity: 1, ease: Linear.easeNone })
    ]);

    new ScrollMagic.Scene({
      triggerElement: item.elemSplash,
      triggerHook: 0,
      duration: "100%"
    })
    .setPin(item.elemSplash)
    .setTween(tween)
    .addTo(ctrl);


    if (items[i + 1]) {
      new ScrollMagic.Scene({ // When the next splash is about to enter from the bottom, we pin the text so the splash slides on top of it.
        triggerElement: items[i + 1].elemSplash,
        triggerHook: 1,
        duration: "100%"
      })
      .setPin(item.elemFilm, { pushFollowers: false })
      .addTo(ctrl);
    }

    if (item.elemMapContainer) {

      item.elemMap = $("<div class='map'></div>").appendTo(item.elemMapContainer)[0];
      // createMap(item.elemMap, )

      item.map = new gm.Map(item.elemMap, mapOptions); // Instantiate map
      $(item.elemMapContainer).sticky(); // NB: use sticky.js to avoid issues with nested Magic Scroll pins
    }

  });

});





var map = (function () {
  var gm = google.maps;
  var options = {
    center: new gm.LatLng(40.766300, -73.977734),
    disableDefaultUI: true,
    scrollwheel: false,
    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}], // https://snazzymaps.com/style/1/pale-dawn
    zoom: 13,
    zoomControl: true
  }




  return {
    create: create
  };

})();



