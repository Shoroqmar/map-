var img1 = document.createElement("img");
img1.src =
  "https://cdn0.iconfinder.com/data/icons/Aristocracy_WebDesignTuts/48/Marker.png";
var markersList = [];

var locations = [
  { title: "Kaybayen Market", location: { lat: 25.403643, lng: 49.57832 } },
  { title: "Car Washing", location: { lat: 25.403413, lng: 49.579538 } },
  { title: "Upick", location: { lat: 25.402083, lng: 49.578202 } },
  { title: "StarBucks", location: { lat: 25.400603, lng: 49.577064 } },
  { title: "Riyadh Bank ATM", location: { lat: 25.39817, lng: 49.580054 } }
];
function initMap() {
  var myLatLng = { lat: 25.403551, lng: 49.578319 };

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: myLatLng
  });

  var Info = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;

    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i,
      draggable: true,
      icon:
        "https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/location-48.png"
    });
    locations[i].marker = marker;
    marker.addListener("click", toggleBounce);

    markersList.push(marker);
    marker.addListener("click", function() {
      FillInfoWindow(this, Info);
    });

    bounds.extend(markersList[i].position);
    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
    google.maps.event.addListener(marker, "click", function() {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 1450);
    });
  }

  map.fitBounds(bounds);
}

function FillInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent("<div>" + marker.title + "</div>");
    infowindow.open(map, marker);
    infowindow.addListener("closeclick", function() {
      infowindow.setMarker = null;
    });
  }
} //initiat

function ViewModel() {
  var self = this;
  this.search = ko.observable("");
  this.filter = ko.computed(function() {
    var filteredLocations = [];
    var searchTerm = self.search().toLowerCase();
    console.log(searchTerm);

    for (var i = 0; i < locations.length; i++) {
      var title = locations[i].title.toLowerCase();
      var includes = title.includes(searchTerm); // true or false

      console.log(title, searchTerm, includes);

      if (includes) filteredLocations.push(locations[i]);

      if (locations[i].marker) {locations[i].marker.setVisible(includes); // true or false
                                locations[i].marker.setAnimation(google.maps.Animation.BOUNCE);
                                
                               }
        
    }

    return filteredLocations;
  });
}

var myViewModel = new ViewModel();
ko.applyBindings(myViewModel);


