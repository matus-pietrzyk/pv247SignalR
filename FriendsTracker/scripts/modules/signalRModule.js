define(['fb', 'gmap'], function (fb, gmap) {
    var serviceHub;

    function initHandlers(map, markers) {
        serviceHub.client.updateCoordinates = function (message) {

            var model = JSON.parse(message);
            //console.log("Model: " + JSON.stringify(model));

            var listOfFriends = fb.getListOfFriends();

            //$("#friendListTable").empty();

            for (var key in model) {

                

                var resultOfLookup = $.grep(listOfFriends, function (e) { return e.id == key; });

                if (resultOfLookup.length == 0) {
                    console.log("Entry " + key + " not found.");
                } else if (resultOfLookup.length == 1) {
                    console.log("One record found: " + key);

                    var image = resultOfLookup[0].pictureurl;

                    var position = markers.map(function (e) { return e.id; }).indexOf(resultOfLookup[0].id);

                    console.log("Position of element: " + resultOfLookup[0].id + " is: " + position);

                    var obj = model[key];

                    console.log("MODEL: ID: " + key);

                    var originalTimeStamp = new Date(obj.TimeStamp);
                    var timeNow = new Date();

                    var timeDifferenceInSeconds = (timeNow.getTime() - originalTimeStamp.getTime()) / 1000;

                    if (position == -1) {

                        if (timeDifferenceInSeconds < 10) {

                            if ($("#noFriends").length > 0) {
                                $("#noFriends").remove();
                            }

                            if (!resultOfLookup[0].myself) {
                                $("#friendListTable").append(function (n) {
                                    return "<tr id='" + key + "'><td class='photoColumn'><img src='" + image + "'></td><td class='nameColumn'>" + resultOfLookup[0].name + "</td></tr>" +
                                           "<input type='hidden' id='friendLatitude" + key + "' value='" + obj.Coordinates.Latitude + "' />" +
                                           "<input type='hidden' id='friendLongtitude" + key + "' value='" + obj.Coordinates.Longtitude + "' />";
                                });
                            }

                            $("#" + key).click(function () {   
                                gmap.showPosition($("#friendLatitude" + key).val(), $("#friendLongtitude" + key).val());                                  
                            });

                            var marker = new google.maps.Marker({
                                map: map,
                                position: new google.maps.LatLng(obj.Coordinates.Latitude, obj.Coordinates.Longtitude),
                                icon: image,
                                title: resultOfLookup[0].name
                            });

                            markers.push({ id: resultOfLookup[0].id, marker: marker });

                            marker.setMap(map);

                            var contentString = resultOfLookup[0].name;

                            var infowindow = new google.maps.InfoWindow({
                                content: '<div class="scrollFix">' + contentString + '</div>'
                            });

                            google.maps.event.addListener(marker, 'click', function () {
                                infowindow.open(map, marker);
                            });
                        }
                    } else {

                        console.log("TimeDifferenceInSeconds: " + timeDifferenceInSeconds);



                        if (timeDifferenceInSeconds < 10) {
                            console.log("UPDATING");

                            $("#friendLatitude" + key).val(obj.Coordinates.Latitude);
                            $("#friendLongtitude" + key).val(obj.Coordinates.Longtitude);

                            var newPosition = new google.maps.LatLng(obj.Coordinates.Latitude, obj.Coordinates.Longtitude);
                            markers[position].marker.setPosition(newPosition);
                        }
                        else {
                            console.log("DELETING");
                            markers[position].marker.setMap(null);
                            markers.splice(position, 1);

                            serviceHub.server.delete(key);
                          
                            $("#" + key).remove();
                            $("#friendLatitude" + key).remove();
                            $("#friendLongtitude" + key).remove();
                        }    
                    }                                                    

                } else {
                    console.log("Multiple records found");
                }
            }

            if ($("#friendListTable tr").length == 0) {
                $("#friendListTable").append("<tr id='noFriends' class='noHover'><td>No Friends Online</td></tr>");
            }
        };
    }

    return {
        //Dont know if markers neccessarry, but i didnt foud a way to delete markers withou google.maps.marker objects (google.maps.marker.setMap(null))
        initSignalR: function (hub, markers, map) {

            serviceHub = hub;
            initHandlers(map, markers);
        }
    }
})