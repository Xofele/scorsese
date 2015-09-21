

icons = [
  { id: 1, color: "#5781fc", name: "blue", url: ["//maps.google.com/mapfiles/ms/icons/blue.png", "//maps.google.com/mapfiles/ms/icons/blue-dot.png"] },
  { id: 2, color: "#fcf357", name: "yellow", url: ["//maps.google.com/mapfiles/ms/icons/yellow.png", "//maps.google.com/mapfiles/ms/icons/yellow-dot.png"] },
  { id: 3, color: "#00e13c", name: "green", url: ["//maps.google.com/mapfiles/ms/icons/green.png", "//maps.google.com/mapfiles/ms/icons/green-dot.png"] },
  { id: 4, color: "#93d7e8", name: "lightblue", url: ["//maps.google.com/mapfiles/ms/icons/lightblue.png", "//maps.google.com/mapfiles/ms/icons/lightblue-dot.png"] },
  { id: 5, color: "#ff9900", name: "orange", url: ["//maps.google.com/mapfiles/ms/icons/orange.png", "//maps.google.com/mapfiles/ms/icons/orange-dot.png"] },
  { id: 6, color: "#e661ac", name: "pink", url: ["//maps.google.com/mapfiles/ms/icons/pink.png", "//maps.google.com/mapfiles/ms/icons/pink-dot.png"] }
];


/*
var iconsUrl = _.map(
  [null, "blue", "yellow", "green", "lightblue", "orange", "pink", "purple", "red"],
  function (item) {
    if (item) {
      return ["//maps.google.com/mapfiles/ms/icons/" + item + ".png", "//maps.google.com/mapfiles/ms/icons/" + item + "-dot.png"];
    }
    return null;
  }
);
*/






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


  function init () {
    var places = {};
    var groups = {};

    $("#mapContainer").sticky({});

    places = _.map(data.places, function (item) {
      var group = _.find(data.groups, function (gp) { return _.indexOf(gp.places, item.id) > -1 }).id;
      var icon = _.find(icons, { id: group }).url;
      var position = new gm.LatLng(item.lat, item.lng);
      var marker = new gm.Marker({ map: map, position: position, icon: icon[0] });
      var circle;


      marker.addListener("mouseover", function () {
        marker.setZIndex(100000);


        circle = new gm.Marker({
          map: map,
          position: this.position,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 0.35,
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
        group: group,
        icon: icon,
        marker: marker,
        position: position
      });
    });

    $("section#text").on("click", "a", function (e) {
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
      var color = _.find(icons, { id: group.id}).color;
      return _.assign(group, {
        latLngBounds: latLngBounds,
        color: color
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


    var waypoints = $("[data-waypoint]").waypoint({
      offset: "85%",
      handler: function (dir) {
        var wp = $(this.element).data("waypoint"); // Waypoint trigger value
        // console.log(wp, dir);
        if (wp === "init") {
          map.fitBounds(groups.latLngBounds);
          hiGroup();
        } else {
          hiGroup(wp);
          map.fitBounds(_.find(groups, {id: wp}).latLngBounds);
          $("body").css({ backgroundColor: _.find(groups, {id: wp}).color });
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


