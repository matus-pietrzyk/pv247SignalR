define(['fb', 'gmap'], function (fb, gmap) {
    var serviceHub;

    function initHandlers(map, markers) {
        serviceHub.client.updateCoordinates = function (message) {

            var model = JSON.parse(message);

            var listOfFriends = fb.getListOfFriends();

            var infoWindow = null;

            var name = null;

            for (var key in model) {

                var resultOfLookup = $.grep(listOfFriends, function (e) { return e.id == key; });

                if (resultOfLookup.length == 0) {
                    console.log("Error: Entry " + key + " not found.");
                } else if (resultOfLookup.length == 1) {

                    var image = resultOfLookup[0].pictureurl;

                    var position = markers.map(function (e) { return e.id; }).indexOf(resultOfLookup[0].id);

                    var obj = model[key];

                    var timeDifferenceInSeconds = getTimeDifference(new Date(), new Date(obj.TimeStamp));

                    if (position == -1) {

                        if (timeDifferenceInSeconds < 10) {

                            if ($("#noFriends").length > 0) {
                                $("#noFriends").remove();
                            }

                            if (!resultOfLookup[0].myself) {
                                $("#friendListTable").append(function (n) {
                                    return "<tr class='testing' id='" + key + "'><td class='photoColumn'><img src='" + image + "'></td><td class='nameColumn'>" + resultOfLookup[0].name + "</td></tr>" +
                                           "<input type='hidden' id='friendLatitude" + key + "' value='" + obj.Coordinates.Latitude + "' />" +
                                           "<input type='hidden' id='friendLongtitude" + key + "' value='" + obj.Coordinates.Longtitude + "' />";
                                });

                                $("#" + key).click({ keyParameter: key }, centerOnPositionClickEvent);
                            }

                            name = resultOfLookup[0].name;

                            infoWindow = new google.maps.InfoWindow({
                                content: '<div class="scrollFix">' + name + '</div>'
                            });

                            var marker = new google.maps.Marker({
                                map: map,
                                position: new google.maps.LatLng(obj.Coordinates.Latitude, obj.Coordinates.Longtitude),
                                icon: image,
                                title: resultOfLookup[0].name
                            });

                            markers.push({ id: resultOfLookup[0].id, marker: marker });

                            google.maps.event.addListener(marker, 'click', function () {
                                infoWindow.open(map, this);
                            });

                        }
                    } else {

                        console.log("TimeDifferenceInSeconds: " + timeDifferenceInSeconds);

                        if (timeDifferenceInSeconds < 10) {

                            $("#friendLatitude" + key).val(obj.Coordinates.Latitude);
                            $("#friendLongtitude" + key).val(obj.Coordinates.Longtitude);

                            var newPosition = new google.maps.LatLng(obj.Coordinates.Latitude, obj.Coordinates.Longtitude);

                            markers[position].marker.setPosition(newPosition);
                        }
                        else {

                            markers[position].marker.setMap(null);
                            markers.splice(position, 1);

                            serviceHub.server.delete(key);
                          
                            $("#" + key).remove();
                            $("#friendLatitude" + key).remove();
                            $("#friendLongtitude" + key).remove();
                        }    
                    }                                                    

                } else {
                    console.log("Error: Multiple records found");
                }
            }

            if ($("#friendListTable tr").length == 0) {
                $("#friendListTable").append("<tr id='noFriends' class='noHover'><td>No Friends Online</td></tr>");
            }
        };
    }

    function getTimeDifference(presentTime, originalTime)
    {
        return ((presentTime.getTime() - originalTime.getTime()) / 1000);
    }

    function centerOnPositionClickEvent(event) {
        gmap.showFriendPosition(event.data.keyParameter);
    };

    return {
        initSignalR: function (hub, markers, map) {

            serviceHub = hub;
            initHandlers(map, markers);
        }
    }
})