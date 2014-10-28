function updatePosition() {
    console.log("Updating positions")
    window.latitude = 0;
    window.longtitude = 0;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Browser does not support geolocation, or it is not permited.")
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longtitude = position.coords.longitude;

    serviceHub.server.send($('#displayname').val(), latitude, longtitude);
}



//Initialization method - called after page load
function signalRInit() {
    window.serviceHub = $.connection.friendsTrackerHub; //!!first letter is small

    //Store markers to change their position
    window.markers = {};

    window.serviceHub.client.updateCoordinates = function (message) {
        // Add the message to the page.
        $('#content').html(message);

        var model = JSON.parse(message);
        for (var key in model) {
            var obj = model[key];
            // Look no need to do list[i] in the body of the loop
            //if (undefined != obj)
            //console.log($('#displayname'), "latitude " + obj["Latitude"] + " longtitude " + obj["Longtitude"]);
            console.log(map);
            console.log(obj);
            console.log(key);

            //Updating old marker
            if (key in markers) {
                markers[key].setPosition(new google.maps.LatLng(obj["Latitude"], obj["Longtitude"]))
            }
            else { //New marker added
                var marker = new google.maps.Marker({
                    id: key,
                    position: new google.maps.LatLng(obj["Latitude"], obj["Longtitude"])
                });
                markers[key] = marker;

                //show marker on the map
                marker.setMap(window.map);
            }

        }

        //For concrete value
        //$('#discussion').html(JSON.parse(message)[$("#displayname").val()].Latitude);
    };

    //This is called aftert connection is initialized
    $.connection.hub.start().done(function () {
        setInterval(updatePosition, 1000);
    })
};