define([], function () {
    var serviceHub;

    function initHandlers(map) {
            serviceHub.client.updateCoordinates = function (message) {

            var model = JSON.parse(message);
            console.log("Model: " + JSON.stringify(model));

            for (var key in model) {
                var obj = model[key];
                debugger;
                var marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(obj.Coordinates.Latitude, obj.Coordinates.Longtitude),
                    title: obj.Name
                });
                marker.setMap(map);

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