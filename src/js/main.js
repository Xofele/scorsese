


/*
var icons = [
  null,
  // "http://maps.google.com/mapfiles/ms/icons/blue.png",
  "http://maps.google.com/mapfiles/ms/icons/yellow.png",
  "http://maps.google.com/mapfiles/ms/icons/green.png",
  "http://maps.google.com/mapfiles/ms/icons/lightblue.png",
  "http://maps.google.com/mapfiles/ms/icons/orange.png",
  "http://maps.google.com/mapfiles/ms/icons/pink.png",
  "http://maps.google.com/mapfiles/ms/icons/purple.png",
  "http://maps.google.com/mapfiles/ms/icons/red.png",
];
*/

var icons = _.map( // NB: this is not necessary -- revert to using single icons
  ["blue", "yellow", "green", "lightblue", "orange", "pink", "purple", "red"],
  function (color, i) {
    return {
      id: (i + 1),
      off: "css/img/markerIcons/" + color + "_off.png",
      on: "css/img/markerIcons/" + color + "100.png",
    }
  }
);




var app = (function () {
  "use strict";
  var places = data.places;
  var gm = google.maps;
  var map = new gm.Map(document.getElementById("map"), {
    center: new gm.LatLng(40.766300, -73.977734),
    disableDefaultUI: true,
    scrollwheel: false,
    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}], // https://snazzymaps.com/style/1/pale-dawn
    zoom: 13
  });


  function init () {
    var places = {};
    var groups = {};

    $("#mapContainer").sticky({});

    places = _.map(data.places, function (item) {
      var group = _.find(data.groups, function (gp) { return _.indexOf(gp.places, item.id) > -1 }).id;
      var icon = _.find(icons, { id: group });
      var position = new gm.LatLng(item.lat, item.lng);
      var marker = new gm.Marker({ map: map, position: position, icon: icon.on });
      return _.assign(item, {
        group: group,
        icon: icon,
        marker: marker,
        position: position
      });
    });

    groups = _.map(data.groups, function (group) {
      var latLngBounds = _.reduce(
        group.places,
        function (bnds, id) {
          return bnds.extend(_.find(places, { id: id }).position);
        },
        new gm.LatLngBounds()
      );
      return _.assign(group, {
        latLngBounds: latLngBounds
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


    var waypoints = $(".wp").waypoint({
      offset: "50%",
      handler: function (dir) {
        var id = $(this.element).data("id");
        map.fitBounds(_.find(groups, {id : id}).latLngBounds);
        hiGroup(id);

        }
    });
  }
  // END init

  function hiGroup (id) { // Highlight group
    _.forEach(places, function (pl) {
      // pl.marker.setIcon(pl.group === id ? pl.icon.on : pl.icon.off);
      if (pl.group === id) {
        pl.marker.setOpacity(1);
        // pl.marker.setZIndex(1000);
      } else {
        pl.marker.setOpacity(0.1);
        // pl.marker.setZIndex(1);
      }
    });
  }




  return {
    init: init
  };

})();






$(function () {
  app.init();
});


