/// <reference path="C:\PV247\FriendsTracker\FriendsTracker\Views/Home/Index.cshtml" />
define([], function () {
    requirejs.config({
        //urlArgs: "noCache=" + (new Date).getTime(),
        paths: {
            "jquery": "/scripts/jquery-2.1.1.min",
            "jquery.bootstrap": "/scripts/bootstrap.min",
            "async": "/scripts/requirejs-plugins/async",
            "facebook": "//connect.facebook.net/en_US/all",
            "signalr.core": "/scripts/jquery.signalR-2.1.2.min",
            "signalr.hubs": "/signalr/hubs?",
            "fb": "/scripts/modules/fb",
            "gmaps": "/scripts/modules/gmapsModule",
            "utils": "/scripts/modules/utils"
        },
        shim: {
            'jquery.bootstrap': {
                deps: ['jquery']
            },
            'facebook': {
                exports: 'FB'
            },
            "jquery": {
                exports: "$"
            },
            "signalr.core": {
                deps: ["jquery"],
                exports: "$.connection"
            },
            "signalr.hubs": {
                deps: ["signalr.core"]
            },
            'main': {
                deps: ['jquery']
            }
        }
    })

    //Called on initialize - codeName
    return function (pageCodename) {

        //Tady bude in na to, jestli načíst vše, nebo nic :-) Podle Codename, který nastavuju v Index.cshtml


        require(['fb'], function () {
            require(["jquery",
                "utils",
                "gmaps",
                 "async!http://maps.googleapis.com/maps/api/js?key=AIzaSyDzPfjG3MX3RdE1ePdO73UMQUImPsjgZMU&sensor=true&callback=initialize",
                "signalr.hubs",
                "jquery.bootstrap"], function ($, utils) {


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

                        serviceHub.server.send($('#userId').text(), latitude, longtitude);
                    }

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

                    serviceHub = $.connection.friendsTrackerHub; //!!first letter is small

                    ////Store markers to change their position
                    window.markers = {};

                    //function showMarkersOnMap(mapInstance) {
                    //    debugger;
                    //    for (var key in markers) {
                    //        markers[key].setMap(mapInstance);
                    //    }
                    //}



                    window.serviceHub.client.updateCoordinates = function (message) {
                        
                        var model = JSON.parse(message);
                        console.log("Model: " + JSON.stringify(model));
                        for (var key in model) {
                            var obj = model[key];
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
                                marker.setMap(map);
                            }
                        }
                        ////clearing map
                        //showMarkersOnMap(null);
                        ////render map
                        //showMarkersOnMap(map);


                    };

                    //This is called aftert connection is initialized
                    $.connection.hub.start().done(function () {
                        setInterval(updatePosition, 1000);
                    })

                    utils.showDiv();

                })
        });
    }

})

