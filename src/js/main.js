
var places = [
  {
    groupId: 1,
    groupName: "Mean Streets",
    items: [
      { id: 1, lat: 40.72358, lng: -73.99518, name: "Vieille cathédrale Saint-Patrick" },
      { id: 2, lat: 40.72176, lng: -73.99707, name: "Volpe Bar" },
      { id: 3, lat: 40.71816, lng: -73.99794, name: "Mulberry St and Hester St" },
      { id: 4, lat: 40.7181, lng: -74.0128, name: "The Bridge" },
      { id: 5, lat: 40.7193, lng: -73.99732, name: "Mulberry St" },
      { id: 6, lat: 40.72075, lng: -73.9971, name: "394 Broome St" },
      { id: 7, lat: 40.7312, lng: -74.00167, name: "323 6th Ave - Waverly Theater" }
    ]
  },
  {
    groupId: 2,
    groupName: "Taxi Driver",
    items: [
      { id: 8, lat: 40.76987, lng: -73.99031, name: "W57th Street" },
      { id: 9, lat: 40.76041, lng: -73.98745, name: "8th Ave &amp; W47th St." },
      { id: 10, lat: 40.75992, lng: -73.98782, name: "737 8th Ave - Show and Tell Theater" },
      { id: 11, lat: 40.77135, lng: -73.98206, name: "Broadway &amp; W 63rd St" },
      { id: 12, lat: 40.75890, lng: -73.98513, name: "Times Square" },
      { id: 13, lat: 40.75665, lng: -73.98766, name: "Hilton Theater" },
      { id: 14, lat: 40.76381, lng: -73.98294, name: "Ed Sullivan Theater" },
      { id: 15, lat: 40.74335, lng: -73.98413, name: "Park Ave S &amp; E 28th St" },
      { id: 16, lat: 40.73225, lng: -73.98737, name: "" },
      { id: 17, lat: 40.73202, lng: -73.98668, name: "" },
      { id: 18, lat: 40.76804, lng: -73.98237, name: "" },
      { id: 19, lat: 40.76142, lng: -73.97470, name: "" },
      { id: 20, lat: 40.76741, lng: -73.98239, name: "" },
      { id: 21, lat: 40.75847, lng: -73.98469, name: "" },
      { id: 22, lat: 40.75657, lng: -73.99028, name: "" }
    ]
  },
  {
    groupId: 3,
    groupName: "Raging Bull",
    items: [
      { id: 23, lat: 40.81637, lng: -73.91529, name: "" },
      { id: 24, lat: 40.73399, lng: -73.98891, name: "" },
      { id: 25, lat: 40.72958, lng: -74.00547, name: "" },
      { id: 26, lat: 40.73176, lng: -73.98913, name: "" },
      { id: 27, lat: 40.76436, lng: -73.97189, name: "" },
      { id: 28, lat: 40.76834, lng: -73.9882, name: "" },
      { id: 29, lat: 40.76138, lng: -73.98527, name: "" }
    ]
  }
];




var icons = [
  null,
  "http://maps.google.com/mapfiles/ms/icons/blue.png",
  "http://maps.google.com/mapfiles/ms/icons/yellow.png",
  "http://maps.google.com/mapfiles/ms/icons/green.png",
  "http://maps.google.com/mapfiles/ms/icons/lightblue.png",
  "http://maps.google.com/mapfiles/ms/icons/orange.png",
  "http://maps.google.com/mapfiles/ms/icons/pink.png",
  "http://maps.google.com/mapfiles/ms/icons/purple.png",
  "http://maps.google.com/mapfiles/ms/icons/red.png",
];




var app = (function () {
  "use strict";
  var gm = google.maps;
  var map = new gm.Map(document.getElementById("map"), {
    center: new gm.LatLng(40.766300, -73.977734),
    disableDefaultUI: true,
    scrollwheel: false,
    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}], // https://snazzymaps.com/style/1/pale-dawn
    zoom: 13
  });


  function init () {

    $("#mapContainer").sticky({});


    // Group by group, extends places with extra computed values or objects

    places.latLngBounds = new gm.LatLngBounds();
    _.forEach(places, function (group, i) {
      var bnds = new gm.LatLngBounds();

      _.forEach(group.items, function (item, i) { // Assign each item its position and marker
        var position = new gm.LatLng(item.lat, item.lng);
        var marker = new gm.Marker({ map: map, position: position, icon: icons[group.groupId] });
        _.assign(item, { marker: marker, position: position });
        bnds.extend(position);
      });

      places.latLngBounds.union(bnds);

      _.assign(group, {
        latLngBounds: bnds //, groupCenter: bnds.getCenter()
      });
    });


    // Initial map positioning
    map.fitBounds(places.latLngBounds);
    map.setZoom(map.getZoom() - 1); // http://stackoverflow.com/questions/6048975/google-maps-v3-how-to-calculate-the-zoom-level-for-a-given-bounds#answer-20905304


    var waypoints = $(".wp").waypoint({
      offset: "65%",
      handler: function (dir) {
        var id = $(this.element).data("id");
        map.fitBounds(getGroup(id).latLngBounds);
      }
    });

  }




  function getGroup (id) {
    return _.find(places, { groupId: id });
  }



  return {
    init: init
  };

})();





$(function () {
  app.init();
});








// Utils

// Returns the average of an array of numbers - see: https://gist.github.com/JamieMason/1111276
/*
function avg (arr) {
  return _.reduce(arr, function (memo, num) {
    return memo + num;
  }, 0) / (arr.length === 0 ? 1 : arr.length);
}
*/

/*
function fromLatLngToPoint (latLng, map) { // http://krasimirtsonev.com/blog/article/google-maps-api-v3-convert-latlng-object-to-actual-pixels-point-object
  var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}
*/