
var img1 = document.createElement("img");
img1.src = "https://cdn0.iconfinder.com/data/icons/Aristocracy_WebDesignTuts/48/Marker.png";
      var markersList = [];

   var locations=[
              {title: 'Kaybayen Market', location: {lat : 25.403643,lng :49.578320}},
              {title: 'Car Washing', location: {lat : 25.403413,lng : 49.579538}},
              {title: 'Upick', location: {lat : 25.402083,lng :  49.578202}},
              {title: 'StarBucks', location: {lat : 25.400603, lng :  49.577064}},
              {title: 'Riyadh Bank ATM', location: {lat : 25.398170, lng : 49.580054}},
        ];
function initMap() {
        var myLatLng = {lat: 25.403551, lng: 49.578319};

        var map = new google.maps.Map(document.getElementById('map'), {
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
            icon:"https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/location-48.png"

          });
    marker.addListener('click', toggleBounce);


          markersList.push(marker);
          marker.addListener('click', function() {
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
              google.maps.event.addListener(marker, 'click', function() {      
      
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){marker.setAnimation(null);
    }, 1450);
    
    });

      }
        
        map.fitBounds(bounds);
    
      }

      function FillInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
 

      } //initiat 
 

function viewModel() { 
this.search = ko.observable("");
}


var myViewModel = new viewModel() ; 
ko.applyBindings(myViewModel);

myViewModel.search.subscribe(function(newValue){
    var searchTerm = newValue.toLowerCase();
    filterMapsBasedOnText(searchTerm);
    
});

function filterMapsBasedOnText(search){
    var filteredLocations = [] ;
for(var j=0; j<locations.length ; j++){
    
    if(locations[j].title.toLowerCase().includes(search)) {
        
        filteredLocations.push(locations[j])
    }
}//for loop 
    var posnew = filteredLocations.title ; 
    var titnew =filteredLocations.location;
    
        var marker = new google.maps.Marker({
            map: map,
            position: posnew,
            title: titnew,
            animation: google.maps.Animation.BOUNCE,
            id: i,
            draggable: true,
            icon:"https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/location-48.png"

          });
    
        }// filterfunction
