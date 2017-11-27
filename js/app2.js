/*jshint loopfunc: true */


var markersList = [];

var locations = [
  { title: "OLiva Cafe", location: { lat: 26.320100 , lng: 50.221751  },fourSquareVenueID:"56f028af498e9e1103f44b38" },
  { title: "King Abdulaziz Center for World Culture", location: { lat: 26.335807 , lng: 50.120727  },fourSquareVenueID:"4da01b0a784f3704ba2692af" },
  { title: "Pink Cafe", location: { lat: 26.306557 , lng: 50.168655 },fourSquareVenueID:"5598118c498ee524859e04a5" },
  { title: "IKEA", location: { lat: 26.310039 , lng: 50.167840 },fourSquareVenueID:"4f69d5c0e4b0cb4074cd1227" },
  { title: "Starbuks Cafe", location: { lat: 26.330612 , lng: 50.162647  },fourSquareVenueID:"4c56ee7112f0d13ad2e705ad" }
];
function initMap() {
    
  var myLatLng = { lat: 26.329689 , lng: 50.150845  };

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
      id: locations[i].fourSquareVenueID,
      draggable: true,
      icon:
        "https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/location-48.png"
    });
    locations[i].marker = marker;
    marker.addListener("click", toggleBounce);
  var toggleBounce= function() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    };
    markersList.push(marker);
    marker.addListener("click", function() {
      FillInfoWindow(this, Info);
    });

    bounds.extend(markersList[i].position);
  
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


var fsrequest = function (marker) {
  var apiURL = 'https://api.foursquare.com/v2/venues/';
  var foursquareClientID = 'VH1H4KVGZOLF1BWBK4SYCRVUSKJ2AG0K0F2GFKSLL2ZF5Y5B';
  var foursquareSecret ='K44QNIZ4MRGPE1Y0DOJLYPYAS3IZCDSCME1RV2T54UU3RVNK';
  var foursquareVersion = '20170115';
  var venueFoursquareID = marker.id;
  var foursquareURL = apiURL + venueFoursquareID + '?client_id=' + foursquareClientID +  '&client_secret=' + foursquareSecret +'&v=' + foursquareVersion;

  $.ajax({
    url: foursquareURL,
    success: function(data) {
      console.log(data);
      var rating = data.response.venue.rating;
      var name =  data.response.venue.name;
      var location = data.response.venue.location.address;

  initMap.info.setContent(name + "; FourSquare Rating: " + rating.toString() + "; " + location);
     initMap.info.open(map, marker);
      },
  error: function(error) {
        alert("Error, Four Square api data could not display");
    }
  });
};
function errorHandling() {
	alert("Google Maps has failed to load. Please try again.");
}
var myViewModel = new ViewModel();
ko.applyBindings(myViewModel);


