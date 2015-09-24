
var app = (function () {
  "use strict";
  var places = data.places;
  var gm = google.maps;
  var map = new gm.Map(document.getElementById("map"), {
    center: new gm.LatLng(40.766300, -73.977734),
    disableDefaultUI: true,
    scrollwheel: false,
    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}], // https://snazzymaps.com/style/1/pale-dawn
    zoom: 13,
    zoomControl: true
  });

  var pin = {
    path: "m0.05195,-0.07428c-0.63931,-3.138 -1.76633,-5.74954 -3.13148,-8.16974c-1.01259,-1.79526 -2.18562,-3.4523 -3.271,-5.19333c-0.36232,-0.58109 -0.675,-1.19516 -1.02315,-1.79822c-0.69614,-1.20605 -1.26054,-2.60439 -1.22469,-4.41824c0.03505,-1.77219 0.54759,-3.19382 1.28671,-4.35614c1.21562,-1.91174 3.25182,-3.47919 5.9839,-3.89108c2.23387,-0.33679 4.32825,0.23218 5.81332,1.10065c1.21365,0.70972 2.15358,1.65768 2.86792,2.7749c0.74567,1.16614 1.25917,2.54376 1.3022,4.34067c0.02211,0.92065 -0.12862,1.77319 -0.341,2.48038c-0.21486,0.71582 -0.5605,1.31423 -0.86803,1.95333c-0.6004,1.24765 -1.353,2.39072 -2.1084,3.53445c-2.24988,3.40698 -4.36157,6.88141 -5.28631,11.64237z",
    fillColor: "#fff",
    fillOpacity: 1,
    scale: 1,
    strokeOpacity: 1,
    strokeColor: "#000",
    strokeWeight: 1.5
  };



  function init () {
    var places = {};
    var groups = {};

    $("#mapContainer").sticky({});

    places = _.map(data.places, function (item) {
      var group = _.find(data.groups, function (gp) { return _.indexOf(gp.places, item.id) > -1 });
      var icon = _.assign({}, pin, { fillColor: group.color });
      var position = new gm.LatLng(item.lat, item.lng);

      var marker = new gm.Marker({ map: map, position: position, icon: icon });

      // var marker = new gm.Marker({ map: map, position: position, icon: icon[0] });
      var circle;


      marker.addListener("mouseover", function () {
        marker.setZIndex(100000);


        circle = new gm.Marker({
          map: map,
          position: this.position,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 0.25,
            fillColor: '#fff',
            strokeOpacity: 1.0,
            strokeColor: '#fff',
            strokeWeight: 2.0, 
            scale: 50
          }
        });

        circle.setZIndex(99999);


      });

      marker.addListener("mouseout", function () {
        marker.setZIndex();
        circle.setMap(null);

      });

      return _.assign(item, {
        group: group.id,
        icon: icon,
        marker: marker,
        position: position
      });
    });

    $("section#text").on("click", ".link", function (e) {
      var $el = $(e.target);
      var id = $el.data("link");
      var pl = _.find(places, { id: id });

      if (pl) {
        window.clearTimeout(pl.timeout);
        map.panTo(pl.marker.position);

        pl.marker.setZIndex(100000);
        pl.marker.setAnimation(gm.Animation.BOUNCE);

        pl.timeout = window.setTimeout(function () {
          pl.marker.setAnimation();
          pl.marker.setZIndex();
        }, 2100); // http://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once
      }



    });






    groups = _.map(data.groups, function (group) {
      var latLngBounds = _.reduce(
        group.places,
        function (bnds, id) {
          return bnds.extend(_.find(places, { id: id }).position);
        },
        new gm.LatLngBounds()
      );
      // var color = _.find(icons, { id: group.id}).color;
      return _.assign(group, {
        latLngBounds: latLngBounds
        // , color: color
      });
    });

    // Global (map wise) latLngBounds
    groups.latLngBounds = _.reduce(
      groups,
      function (bnds, group) {
        return bnds.union(group.latLngBounds);
      },
      new gm.LatLngBounds()
    );


    // Initial map positioning
    map.fitBounds(groups.latLngBounds);
    map.setZoom(map.getZoom() - 1); // http://stackoverflow.com/questions/6048975/google-maps-v3-how-to-calculate-the-zoom-level-for-a-given-bounds#answer-20905304


/*
    var waypoints = $("[data-waypoint]").waypoint({
      offset: "85%",
      handler: function (dir) {
        var wp = $(this.element).data("waypoint"); // Waypoint trigger value
        if (wp === "init") {
          map.fitBounds(groups.latLngBounds);
          hiGroup();
        } else {
          hiGroup(wp);
          map.fitBounds(_.find(groups, {id: wp }).latLngBounds);
          $("body").css({ backgroundColor: _.find(groups, {id: wp }).color });
        }
      }
    });
*/
    var waypoints = $("[data-waypoint]").waypoint({
      offset: "75%",
      handler: function (dir) {
        var wp = $(this.element).data("waypoint"); // Waypoint trigger value
        if (dir === "up") wp = Math.max(wp - 1, 0);

        if (wp === 0) {
          $("#map").css({ borderColor: "#fff" });
          // $("body").css({ backgroundColor: "#fff" });
          map.fitBounds(groups.latLngBounds);
          hiGroup();
        } else {
          hiGroup(wp);
          map.fitBounds(_.find(groups, {id: wp }).latLngBounds);
          $("#map").css({ borderColor: _.find(groups, {id: wp }).color });
          // $("body").css({ backgroundColor: _.find(groups, {id: wp }).color });
        }
      }
    });


  } // END init


  function hiGroup (id) { // Highlight group
    if (id) {
      _.forEach(places, function (pl) {
      });
    } else {
      _.forEach(places, function (pl) {
      });
    }
  }




  return {
    init: init
  };

})();






$(function () {
  app.init();
});


