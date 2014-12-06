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
            updatePosition();
        }
    }

    function updatePosition() {
        if (fb.getLogedIn()) {
            console.log("Updating position");

            window.latitude = 0;
            window.longtitude = 0;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                console.log("Browser does not support geolocation, or it is not permited.");
            }

            setTimeout(function () { updatePosition(); }, 1000);
        }
    }

    function zoomFriendPosition(friendId) {
        var lat = $("#friendLatitude" +friendId).val();
        var long = $("#friendLongtitude" +friendId).val()

        alert("zoomFriendPosition: Latitude: " + lat + ", Longtitude: " +long);

        zoomPosition(lat, long, 16);
    }

    function zoomPosition(lat, lon, zoomLevel) {

        alert("ZoomPosition - 01: Latitude: " + lat + ", Longtitude: " + lon);

        if (!navigator.geolocation) {
            console.log("Browser does not support geolocation, or it is not permited.");
            return;
        }

        alert("ZoomPosition - 02: Latitude: " + lat + ", Longtitude: " + lon);

        var pos = new google.maps.LatLng(lat, lon);

        //TODO refactor (Utils should be loaded first)
        if (!$("#sideBar").hasClass("hidden-xs")) {
            $("#sideBar").addClass("hidden-xs");

            $("#showMapBtn").hide();

            $("#googleMap").show();

            $("#buttons").addClass("visible-xs");
            $("#buttons").show();
        }

        alert("Zooming on - 01: Latitude: " + lat + ", Longtitude: " + lon);

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
            map = new google.maps.Map(document.getElementById("googleMap")
                , mapProp);
            map.setCenter(pos);

            var infowindow = new google.maps.InfoWindow({
                content: '<div class="scrollFix">' + $('#displayname').val() + '</div>',

            });

            console.log("Map was initialized");

            navigator.geolocation.getCurrentPosition(function (position) {
                
                var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(geolocate);
                map.setZoom(16);

                console.log("Zooming on current position");
            });

            return map;

        },

        initUpdatePosition: function () {
            callUpdatePosition();
        },

        showMyPosition: function () {
            zoomPosition(latitude, longitude, 16);
        },

        showFriendPosition: function (friendId) {

            alert("ShowFriendsPosition: FriendID: " +friendId);

            zoomFriendPosition(friendId);
        }
    }
})