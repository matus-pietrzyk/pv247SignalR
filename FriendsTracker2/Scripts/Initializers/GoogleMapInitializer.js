//To use google maps - element with id "googleMap" has to be on the site
function initialize() {
    var pos = new google.maps.LatLng(49.195102, 16.608087);


    var mapProp = {
        center: pos,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    window.map = new google.maps.Map(document.getElementById("googleMap")
      , mapProp);

    window.map.setCenter(pos);
    console.log("Map was initialized");
}