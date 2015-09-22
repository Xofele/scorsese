var data = {};

data.films = [
  { id: 1, title: "Mean Streets" },
  { id: 2, title: "Taxi Driver" },
  { id: 3, title: "Raging Bull" },
  { id: 4, title: "La Valse des pantins" },
  { id: 5, title: "After Hours" },
  { id: 6, title: "Les Affranchis" },
  { id: 7, title: "Le Temps de l'innocence" },
  { id: 8, title: "À tombeau ouvert" },
  { id: 9, title: "Les Infiltrés" },
  { id: 10, title: "Le Loup de Wall Street" }
];

data.places = [
  // Mean Streets
  { id: 1, filmId: 1, lat: 40.72358, lng: -73.99518, name: "Vieille cathédrale Saint-Patrick" },
  { id: 2, filmId: 1, lat: 40.72176, lng: -73.99707, name: "Volpe Bar" },
  { id: 3, filmId: 1, lat: 40.71816, lng: -73.99794, name: "Mulberry St and Hester St" },
  { id: 4, filmId: 1, lat: 40.7181, lng: -74.0128, name: "The Bridge" },
  { id: 5, filmId: 1, lat: 40.7193, lng: -73.99732, name: "Mulberry St" },
  { id: 6, filmId: 1, lat: 40.72075, lng: -73.9971, name: "394 Broome St" },
  { id: 7, filmId: 1, lat: 40.7312, lng: -74.00167, name: "323 6th Ave - Waverly Theater" },

  // Taxi Driver
  { id: 8, filmId: 2, lat: 40.76987, lng: -73.99031, name: "W57th Street" },
  { id: 9, filmId: 2, lat: 40.76041, lng: -73.98745, name: "8th Ave &amp; W47th St." },
  { id: 10, filmId: 2, lat: 40.75992, lng: -73.98782, name: "737 8th Ave - Show and Tell Theater" },
  { id: 11, filmId: 2, lat: 40.77135, lng: -73.98206, name: "Broadway &amp; W 63rd St" },
  { id: 12, filmId: 2, lat: 40.75890, lng: -73.98513, name: "Times Square" },
  { id: 13, filmId: 2, lat: 40.75665, lng: -73.98766, name: "Hilton Theater" },
  { id: 14, filmId: 2, lat: 40.76381, lng: -73.98294, name: "Ed Sullivan Theater" },
  { id: 15, filmId: 2, lat: 40.74335, lng: -73.98413, name: "Park Ave S &amp; E 28th St" },
  { id: 16, filmId: 2, lat: 40.73225, lng: -73.98737, name: "" },
  { id: 17, filmId: 2, lat: 40.73202, lng: -73.98668, name: "" },
  { id: 18, filmId: 2, lat: 40.76804, lng: -73.98237, name: "" },
  { id: 19, filmId: 2, lat: 40.76142, lng: -73.97470, name: "" },
  { id: 20, filmId: 2, lat: 40.76741, lng: -73.98239, name: "" },
  { id: 21, filmId: 2, lat: 40.75847, lng: -73.98469, name: "" },
  { id: 22, filmId: 2, lat: 40.75657, lng: -73.99028, name: "" },

  // Raging Bull
  { id: 23, filmId: 3, lat: 40.81637, lng: -73.91529, name: "" },
  { id: 24, filmId: 3, lat: 40.73399, lng: -73.98891, name: "" },
  { id: 25, filmId: 3, lat: 40.72958, lng: -74.00547, name: "" },
  { id: 26, filmId: 3, lat: 40.73176, lng: -73.98913, name: "" },
  { id: 27, filmId: 3, lat: 40.76436, lng: -73.97189, name: "" },
  { id: 28, filmId: 3, lat: 40.76834, lng: -73.9882, name: "" },
  { id: 29, filmId: 3, lat: 40.76138, lng: -73.98527, name: "" },

  // The King of Comedy
  { id: 30, filmId: 4, lat: 40.75895, lng: -73.98493, name: "Times Square" },
  { id: 31, filmId: 4, lat: 40.76207, lng: -73.9846, name: "Paramount Plaza" },
  { id: 32, filmId: 4, lat: 40.75614, lng: -73.96571, name: "335 E 53rd St" },

  // After Hours
  { id: 33, filmId: 5, lat: 40.74168, lng: -73.98695, name: "Metropolitan Life North Building" },
  { id: 34, filmId: 5, lat: 40.71953, lng: -74.00064, name: "Crosby St &amp; Howard St" },
  { id: 35, filmId: 5, lat: 40.75768, lng: -74.00059, name: "11th Ave &amp; W 37th St" },
  { id: 36, filmId: 5, lat: 40.72589, lng: -74.00838, name: "Terminal Bar, Spring St &amp; Renwick St" },
  { id: 37, filmId: 5, lat: 40.72806, lng: -74.00720, name: "Hudson St" },
  { id: 38, filmId: 5, lat: 40.72230, lng: -73.99714, name: "Spring St" },
  { id: 39, filmId: 5, lat: 40.72376, lng: -74.00069, name: "Appartement de Tom, 128 Spring St" },
  { id: 40, filmId: 5, lat: 40.72090, lng: -74.00068, name: "Club Berlin, Broadway &amp; Grand St" },

  // Goodfellas
  { id: 41, filmId: 6, lat: 40.76768, lng: -73.89987, name: "Airline Diner, 69-35 Astoria Blvd N, East Elmhurst" },
  { id: 42, filmId: 6, lat: 40.77276, lng: -73.91525, name: "23-86 31st St, Long Island City" },
  { id: 43, filmId: 6, lat: 40.70055, lng: -73.83287, name: "117-11 Hillside Ave, Jamaica" },
  { id: 44, filmId: 6, lat: 40.95372, lng: -73.77996, name: "19 Alfred Ln, New Rochelle" },
  { id: 45, filmId: 6, lat: 40.72951, lng: -73.88939, name: "73-20 Grand Ave, Maspeth" },
  { id: 46, filmId: 6, lat: 40.72126, lng: -73.84248, name: "109-20 71st Rd, Forest Hills" },
  { id: 47, filmId: 6, lat: 40.68979, lng: -73.86367, name: "87-48 78th St, Jamaica" },
  { id: 48, filmId: 6, lat: 40.72282, lng: -73.91350, name: "Goodfellas Diner, 5626 Maspeth Ave, Maspeth" },
  { id: 49, filmId: 6, lat: 40.70079, lng: -73.83235, name: "117-99 Babbage St, Richmond Hill" },
  { id: 50, filmId: 6, lat: 40.67473, lng: -73.99777, name: "Brooklyn" }
  // { id: , filmId: , lat: , lng: , name: "" }





];

data.groups = [ // Groups currently represent the films, but this could change
  { id: 1, places: [1, 2, 3, 4, 5, 6, 7] },
  { id: 2, places: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
  { id: 3, places: [23, 24, 25, 26, 27, 28, 29] },
  { id: 4, places: [30, 31, 32] },
  { id: 5, places: [33, 34, 35, 36, 37, 38, 39, 40] },
  { id: 6, places: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50] }
];


// Transformations
/*
data.groups = (function () { // Expands data.groups with place details (NB: mutates data.group)
  return _.map(data.groups, function (item) {
    return _.assign(item, { places: _.map(item.places, function (id) {
      return _(data.places).find({ id: id });
    }) });
  });
})(data.groups);
*/








/*
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
*/

