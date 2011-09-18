$(document).ready(function() {

    var $mapContainer = $("#map_canvas"),
        geocoder = new google.maps.Geocoder(),
        markers = [],
        map = new google.maps.Map(
            $mapContainer[0],
            {
                zoom: 15,
                center: new google.maps.LatLng(
                    40.700683,
                    -73.925972
                ),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        );
    
    // Add the basic home marker to show your current position
    function addHomeMarker(latitude, longitude, label, icon, markerMap) {
        var marker = new google.maps.Marker({
            map: (typeof (markerMap) == 'undefined' ? map : markerMap),
            position: new google.maps.LatLng(
                latitude,
                longitude
            ),
            title: (label || ""),
            icon: (icon || "")
        });
        
        // Return the new marker reference.
        return (marker);
    }
    
    // I update the home marker's position and label.
    function updateHomeMarker(marker, latitude, longitude, label) {
        // Update the position.
        marker.setPosition(
            new google.maps.LatLng(
                latitude,
                longitude
            )
        );

        // Update the title if it was provided.
        if (label) {
            marker.setTitle(label);
        }
    }

    // Add a marker to the map using the given latitude
    // and longitude location with infoWindow to display image details
    function addMarker(latitude, longitude, label, icon, item, allItems) {
        // Check if a marker has already been added at this location
        for (var i = 0; i < markers.length; i++) {
            if (Math.round(markers[i].position.lat() * 100000) / 100000 == Math.round(latitude * 100000) / 100000 && 
                Math.round(markers[i].position.lng() * 100000) / 100000 == Math.round(longitude * 100000) / 100000) {
                return;
            }
        }
        
        // Create the marker - this will automatically place it
        // on the existing Google map (that we pass-in).
        var holder = new google.maps.MarkerImage('img/holder.png?v=4',
                        new google.maps.Size(60, 60),
                        new google.maps.Point(0,0),
                        new google.maps.Point(30,60)),
            image = new google.maps.MarkerImage(icon,
                        new google.maps.Size(50, 50),
                        new google.maps.Point(0,0),
                        new google.maps.Point(25,55)),
            morePhotos = '',
            marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(
                    latitude,
                    longitude
                ),
                title: (label || ""),
                icon: (image || ""),
                shadow: holder
            });
        
        // Add the created marker to the array so we can check for existance later
        markers.push(marker);
        
        // Ensure that the title will fit in the info window
        if (label.length > 27) { label = label.substr(0, 24) + '...' }
        
        $.each(allItems, function(index, value) {
            if (index > 23) { return; }
            
            // Construct the containers for the more images section with data 
            // attributes so users can click to view other photos
            morePhotos += '<div class="morePhotos-image"' +
                          '     data-username="' + value.user.username + '"' +
                          '     data-profilePic="' + value.user.profile_picture + '"' +
                          '     data-title="' + (value.caption != null ? (value.caption.text.length > 27 ? (value.caption.text.substr(0, 24) + '...') : value.caption.text) : "A photo") + '"' +
                          '     data-link="' + value.link + '"' +
                          '     data-date="' + value.created_time + '"' +                          
                          '     data-image="' + value.images.low_resolution.url + '"' +
                          '     data-longitude="' + value.location.longitude + '"' +
                          '     data-latitude="' + value.location.latitude + '">' +
                          '     <img src="' + value.images.thumbnail.url + '" title="' + (value.caption != null ? value.caption.text : "A photo") + ' by ' + value.user.username + '"/>' +
                          '</div>';
        })
    
        if (typeof(item) != 'undefined') {
            // Define the content for the popup info window when clicking on a marker
            var content =   '<div class="infoWindow">' +
                            '   <div class="infoWindow-image">' +
                            '       <a href="' + item.link + '" target="_blank" title="View full size photo"><img src="' + item.images.low_resolution.url + '"/></a>' +
                            '   </div>' +
                            '   <div class="infoWindow-title">' +
                            '       <span class="titleText-heading">"' + (label == '' ? 'A photo' : label) + '"</span><br/>' +
                            '       <div class="infoWindow-profilepic">' +
                            '           <img src="' + item.user.profile_picture + '"/>' +
                            '       </div>' +
                            '       <div class="infoWindow-titletext">' +
                            '           <span class="titleText-details">by <strong>' + item.user.username + '</strong></span><br/>' + 
                            '           <span class="titleText-date"/>' +
                            '       </div>' +
                            '       <div id="infoWindow-miniMap"/>' +
                            '   </div>' +
                            '   <div class="infoWindow-morephotos">' +
                            '       <div class="morePhotos-wrapper">' +
                                        morePhotos +
                            '       </div>' +
                            '   </div>' +
                            '</div>';

            // Add a listener to the click event of the marker so we can popup a window
            google.maps.event.addListener(marker, 'click', function() {
                $.colorbox({html:content});
                
                $('.titleText-date')
                    .fancyDate(new Date(item.created_time * 1000));
                
                // Add a mini map to the popup window to show exaxctly where the photo was taken
                var mapContainer = $("#infoWindow-miniMap"),
                    miniMap = new google.maps.Map(
                        mapContainer[0],
                        {
                            zoom: 15,
                            center: new google.maps.LatLng(
                                latitude,
                                longitude
                            ),
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            disableDefaultUI: true
                        }
                    ),
                    imageMarker = addHomeMarker(latitude, longitude, '', '', miniMap);

                // Click event for more photos thumbnails to rerender popup
                $('.morePhotos-image').click(function(){
                    var $morePhotos = $(this);

                    $('.infoWindow-profilepic img')
                        .attr('src', $morePhotos.attr('data-profilePic'));
                    $('.titleText-heading')
                        .html($morePhotos.attr('data-title'));
                    $('.titleText-details')
                        .html('by <strong>' + $morePhotos.attr('data-username') + '</strong>');
                    $('.titleText-date')
                        .fancyDate(new Date($morePhotos.attr('data-date') * 1000));
                    $('.infoWindow-image a')
                        .attr('href', $morePhotos.attr('data-link'));
                    $('.infoWindow-image img')
                        .attr('src', $morePhotos.attr('data-image'));
                        
                    miniMap.setCenter(new google.maps.LatLng($morePhotos.attr('data-latitude'), $morePhotos.attr('data-longitude')));
                    
                    // Clear the old marker before adding a new one
                    imageMarker.setMap(null);
                    imageMarker = addHomeMarker($morePhotos.attr('data-latitude'), $morePhotos.attr('data-longitude'), '', '', miniMap);
                });
            });
        }

        // Return the new marker reference.
        return(marker);
    }
    
    // Get Instagram photos from specific location and add markers
    function getPhotosByLocation(latitude, longitude, dst) {
        var url = 'https://api.instagram.com/v1/media/search?lat=%1&lng=%2&distance=%3?client_id=%4&access_token=%5'
            .replace('%1', latitude)
            .replace('%2', longitude)
            .replace('%3', dst)
            .replace('%4', config.clientId)
            .replace('%5', config.accessToken);
        
        $.ajax({
           type: 'GET',
           dataType: 'jsonp',
           cache: false,
           url: url,
           success: function(data) {
               console.log('Photos found for current location: ' + data.data.length);
               $.each(data.data, function(index, value) {
                   var title = value.caption != null ? value.caption.text : "",
                       resizedImage = 'http://src.sencha.io/50/50/' + value.images.thumbnail.url;
                   
                   addMarker(value.location.latitude, value.location.longitude, title, resizedImage, value, data.data);
               })
           }
        });
    }
    
    // Bind events
    $('#location-search').submit(function() {
        geocoder.geocode({'address': $('#search-text').val()}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
               map.setCenter(results[0].geometry.location);
               
               var marker = new google.maps.Marker({
                   map: map,
                   position: results[0].geometry.location
               });
               
               getPhotosByLocation(map.getCenter().lat(), map.getCenter().lng(), 1000);
           } 
        });
    });
    
    // Check to see if this browser supports geolocation.
    if (navigator.geolocation) {

        var locationMarker = null;

        navigator.geolocation.getCurrentPosition(
            function(position){

                // There is a bug in FireFox where this gets
                // invoked more than once with a cahced result.
                if (locationMarker){
                    return;
                }

                // Log that this is the initial position.
                console.log( "Initial Position Found" );

                // Add a marker to the map using the position.
                locationMarker = addHomeMarker(
                    position.coords.latitude,
                    position.coords.longitude,
                    "Initial Position",
                    "img/home3.png"
                );
                
                // Center map to your current location
                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                
                // Get photos and add to map
                getPhotosByLocation(position.coords.latitude, position.coords.longitude, 1000);

                // Add listener to update photos when map moves
                google.maps.event.addListener(map, 'dragend', function() {
                    if (map.getZoom() > 12) {
                        var distance = google.maps.geometry.spherical.computeDistanceBetween(map.getCenter(), map.getBounds().getNorthEast());

                        getPhotosByLocation(map.getCenter().lat(), map.getCenter().lng(), distance);
                    }
                });
                
                // Add listener to update photos when map is zoomed
                google.maps.event.addListener(map, 'zoom_changed', function() {
                    if (map.getZoom() > 12) {
                        var distance = google.maps.geometry.spherical.computeDistanceBetween(map.getCenter(), map.getBounds().getNorthEast());

                        getPhotosByLocation(map.getCenter().lat(), map.getCenter().lng(), distance);
                    }
                });

            },
            function( error ){
                console.log( "Something went wrong: ", error );
            },
            {
                timeout: (5 * 1000),
                maximumAge: (1000 * 60 * 15),
                enableHighAccuracy: true
            }
        );

        // Now tha twe have asked for the position of the user,
        // let's watch the position to see if it updates. This
        // can happen if the user physically moves, of if more
        // accurate location information has been found (ex.
        // GPS vs. IP address).
        var positionTimer = navigator.geolocation.watchPosition(
            function(position){

                // Log that a newer, perhaps more accurate
                // position has been found.
                console.log( "Newer Position Found" );

                // Set the new position of the existing marker.
                updateHomeMarker(
                    locationMarker,
                    position.coords.latitude,
                    position.coords.longitude,
                    "You are near here"
                );
            }
        );

        // If the position hasn't updated within 5 minutes, stop
        // monitoring the position for changes.
        setTimeout(
            function(){
                // Clear the position watcher.
                navigator.geolocation.clearWatch(positionTimer);
            },
            (1000 * 60 * 5)
        );

    }
})