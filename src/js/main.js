$(function() {
  var ctrl = new ScrollMagic.Controller();

/*
  var elemMapContainer = document.querySelector(".mapContainer");
  var elemMap = elemMapContainer.querySelector(".map");

  var gm = google.maps;

  var map = new gm.Map(elemMap, {
    center: new gm.LatLng(40.766300, -73.977734),
    disableDefaultUI: true,
    scrollwheel: false,
    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}], // https://snazzymaps.com/style/1/pale-dawn
    zoom: 13,
    zoomControl: true
  });
*/


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
      new ScrollMagic.Scene({
        triggerElement: items[i + 1].elemSplash,
        triggerHook: 1,
        duration: "100%"
      })
      .setPin(item.elemText, { pushFollowers: false })
      .addTo(ctrl);      
    }


    if (item.elemMapContainer) {
      new ScrollMagic.Scene({
        triggerElement: item.elemText,
        triggerHook: 0.5,
        duration: 0
      })
      .setPin(item.elemMapContainer, { pushFollowers: false })
      .addIndicators()
      .addTo(ctrl);
    }



    // SlideUp map
    /*
    $(item.elemText).waypoint({
      offset: "25%",
      handler: function (dir) {
        if (dir === "down") { // Show map
          new TweenMax(elemMapContainer, 0.35, { top: "50%", ease: Power2.easeOut });
        } else { // Hide map
          new TweenMax(elemMapContainer, 0.35, { top: "100%", ease: Power2.easeOut });
        }
      }
    });
    */








  });

});