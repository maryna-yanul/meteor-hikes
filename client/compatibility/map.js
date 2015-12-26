// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var map;
var allMarkers = [];
var positions = [];
Session.set('positions', []);
Session.set('meters', 0);
var initAutocomplete = function () {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.326694, lng: 24.038078},
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    if (input) {
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        //map.addListener('click', function (event) {
        //
        //})
        var markers = [];
        // [START region_getplaces]
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {

                marker.setMap(null);
            });

            markers = Session.get('markers') || [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    }


    var remove = document.getElementById('removeMarker');
    // This event listener calls addMarker() when the map is clicked.

    if (remove) {
        google.maps.event.addListener(map, 'click', function (event) {
            addMarker(event.latLng, map);
        });
        remove.addEventListener('click', function (event) {
            removeMarkersAll(map);
        });
    } else{
        reRenderPoints();
    }
    // Add a marker at the center of the map.
}
// Adds a marker to the map.

function addMarker(location, map, label) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    positions = [];
    var marker = new google.maps.Marker({
        position: location,
        label: label || labels[labelIndex++ % labels.length],
        map: map,
        draggable: false,
    });
    allMarkers.push(marker);
    for (key in allMarkers) {
        positions[key] = {
            position: {
                lat: allMarkers[key].position.lat(),
                lng: allMarkers[key].position.lng(),
            },
            label: allMarkers[key].label
        }
    }
    Session.set('positions', positions);
    countDistance(allMarkers);
}
function updateMarker(index, label) {
    labelIndex = 0;
    positions = [];
    if (allMarkers.length > 0) {
        allMarkers[index].label = label;
        for (key in allMarkers) {
            allMarkers[key].setMap(map);
            positions[key] = {
                position: allMarkers[key].position,
                label: allMarkers[key].label
            }
        }
        Session.set('positions', positions);
    } else {
        Session.set('positions', []);
    }
    countDistance(allMarkers);
}
function removeMarker(index, map) {
    labelIndex = 0;
    positions = [];
    if (allMarkers.length > 0) {
        allMarkers[index].setMap(null);
        allMarkers.splice(index, 1);
        for (key in allMarkers) {
            allMarkers[key].setMap(map);
            positions[key] = {
                position: allMarkers[key].position,
                label: allMarkers[key].label
            }
        }
        Session.set('positions', positions);
    } else {
        Session.set('positions', []);
    }
    countDistance(allMarkers);
}
function removeMarkersAll(map) {
    for (key in allMarkers) {
        allMarkers[key].setMap(null);
    }
    labelIndex = 0;
    allMarkers = [];
    countDistance(allMarkers);
    Session.set('positions', []);
}
function countDistance(points) {
    var distance = 0;

    function addDistance(meters) {
        return distance = distance + meters;
    }

    for (key in points) {
        var next = points[String(parseInt(key) + 1)];
        if (typeof next !== 'undefined') {
            addDistance(google.maps.geometry.spherical.computeDistanceBetween(points[key].position, next.position));
        }
        next = null;
    }
    Session.set('meters', Math.floor(distance)/1000);
    $('input[name=distanceHike]').val(Math.floor(distance)/1000);
    return distance;
}
function reRenderPoints(){
    if(Session.get('hike')){
        var positions = Session.get('hike').positions;
        var flightPlanCoordinates = [];
        var lineSymbol = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 4
        };

        removeMarkersAll(map);
        for(key in positions){
            flightPlanCoordinates.push(positions[key].position);
            addMarker(positions[key].position,map,positions[key].label);
        }
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#55B716',
            strokeOpacity: 0,
            icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '20px'
            }],
        });
        //map.setZoom(Session.get('hike').distanceHike/2.5);
        flightPath.setMap(map);
        map.setCenter(positions[Math.floor(positions.length/2)].position);
    }

}