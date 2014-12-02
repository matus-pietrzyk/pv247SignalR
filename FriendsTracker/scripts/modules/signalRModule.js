define(['fb'], function (fb) {
    var serviceHub;

    function initHandlers(map) {
            serviceHub.client.updateCoordinates = function (message) {

            var model = JSON.parse(message);
            console.log("Model: " + JSON.stringify(model));
           
            var listOfFriends = fb.getListOfFriends();

            for (var key in model) {

                var resultOfLookup = $.grep(listOfFriends, function (e) { return e.id == key; });

                if (resultOfLookup.length == 0) {
                    console.log("Entry not found.");
                } else if (resultOfLookup.length == 1) {
                    console.log("One record found");

                    var image = resultOfLookup[0].pictureurl;

                    $("#friendListTable").empty();

                    $("#friendListTable").append(function (n) {
                        return "<tr><td><img src='" + image + "'></td><td>" + "Name: " + resultOfLookup[0].name + "<br>Id: " + resultOfLookup[0].id + "</td></tr>";
                    });
                                       
                    var obj = model[key];

                    debugger;
                    var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(obj.Coordinates.Latitude, obj.Coordinates.Longtitude),
                        animation: google.maps.Animation.DROP,
                        icon: image,
                        title: obj.Name
                    });
                    marker.setMap(map);

                } else {
                    console.log("Multiple records found");
                }
            }
        };
    }

    return {
        //Dont know if markers neccessarry, but i didnt foud a way to delete markers withou google.maps.marker objects (google.maps.marker.setMap(null))
        initSignalR: function (hub, markers, map) {
            serviceHub = hub;

            initHandlers(map);
        }
    }
})