define(['fb'], function (fb) {

    var serviceHub;

    function showPosition(position) {
        latitude = position.coords.latitude;
        longtitude = position.coords.longitude;

        serviceHub.server.send($('#userId').text(), latitude, longtitude);
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
                console.log("Browser does not support geolocation, or it is not permited.")
            }

            setTimeout(function () { updatePosition(); }, 1000);
        }
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
            var map = new google.maps.Map(document.getElementById("googleMap")
                , mapProp);
            map.setCenter(pos);

            var infowindow = new google.maps.InfoWindow({
                content: '<div class="scrollFix">' + $('#displayname').val() + '</div>',

            });

            console.log("Map was initialized");
            return map;

        },

        initUpdatePosition: function () {
            callUpdatePosition();
        }
    }
})