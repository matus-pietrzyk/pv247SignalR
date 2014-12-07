define(['fb'], function (fb) {

    var serviceHub;
    var map;
    var latitude;
    var longitude;

    function showPosition(position) {

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        serviceHub.server.send($('#userId').text(), latitude, longitude);
    }

    function callUpdatePosition() {

        if (fb.getAuthInProgress()) {
            setTimeout(function () { callUpdatePosition(); }, 1000);
        }
        else {
            google.maps.event.trigger(map, 'resize');
            zoomOnCurrentPosition();
            updatePosition();
        }
    }

    function updatePosition() {

        if (fb.getLogedIn()) {
            console.log("Updating position");

            window.latitude = 0;
            window.longtitude = 0;

            if (navigator.geolocation) {

                if ($("#noLocation").length > 0) {
                    $("#noLocation").remove();
                }

                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                console.log("Browser does not support geolocation, or it is not permited.");
                
                $("#friendListTable").append("<tr id='noLocation' class='noHover'><td>Please turn-on geolocation</td></tr>");
            }

            setTimeout(function () { updatePosition(); }, 1000);
        }
    }

    function zoomOnCurrentPosition() {
        navigator.geolocation.getCurrentPosition(function (position) {

            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(geolocate);
            map.setZoom(16);

            console.log("Zooming on current position");
        });
    }

    function zoomOnFriendPosition(friendId) {

        var lat = $("#friendLatitude" +friendId).val();
        var long = $("#friendLongtitude" +friendId).val()

        zoomOnPosition(lat, long, 16);
    }

    function zoomOnPosition(lat, lon, zoomLevel) {

        if (!navigator.geolocation) {
            console.log("Browser does not support geolocation, or it is not permited.");
            return;
        }

        var pos = new google.maps.LatLng(lat, lon);

        //TODO refactor (Utils should be loaded first)
        if (!$("#sideBar").hasClass("hidden-xs")) {
            $("#sideBar").addClass("hidden-xs");

            $("#showMapBtn").hide();

            $("#googleMap").show();

            $("#buttons").addClass("visible-xs");
            $("#buttons").show();
        }

        console.log("Zooming on " + lat + " lat " + lon + " lon");

        map.setCenter(pos);
        map.setZoom(zoomLevel);      
    }

    return {
        initMap: function (hub) {

            serviceHub = hub;

            var pos = new google.maps.LatLng(49.195102, 16.608087);

            var mapProp = {
                center: pos,
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(
                document.getElementById("googleMap"),
                mapProp);

            map.setCenter(pos);

            var infowindow = new google.maps.InfoWindow({
                content: '<div class="scrollFix">' + $('#displayname').val() + '</div>',

            });

            console.log("Map was initialized");

            return map;
        },

        initUpdatePosition: function () {
            callUpdatePosition();
        },

        showMyPosition: function () {

            if (navigator.geolocation) {
                zoomOnPosition(latitude, longitude, 16);
            }
            else {
                return;
            }
        },

        showFriendPosition: function (friendId) {
            zoomOnFriendPosition(friendId);
        }
    }
})