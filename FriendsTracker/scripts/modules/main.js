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
            "gmap": "/scripts/modules/gmapModule",
            "signalR": "/scripts/modules/signalRModule",
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


        require(['fb'], function (fb) {
            

            require(["jquery",
                "utils",
                "gmap",
                "signalR",
                 "async!http://maps.googleapis.com/maps/api/js?key=AIzaSyDzPfjG3MX3RdE1ePdO73UMQUImPsjgZMU&sensor=true&callback=initialize",
                "signalr.hubs",
                "jquery.bootstrap"], function ($, utils, gmap, signalR) {

                    $('#logInBtn').click(function () {
                        fb.customLogIn();
                    });

                    $('#logOutBtn').click(function () {
                        fb.customLogOut();
                    });

                    $('#showSideBarBtn').click(function () {
                        utils.showSideBar();
                    });

                    $('#showMapBtn').click(function () {
                        utils.showMap();
                    });

                    var markers = {};
                    var serviceHub = $.connection.friendsTrackerHub; //!!first letter is small);

                    var map = gmap.initMap(serviceHub);

                    signalR.initSignalR(serviceHub, markers, map);

                    //This is called aftert connection is initialized
                    $.connection.hub.start().done(function () {
                        setInterval(gmap.updatePosition, 1000);
                    })

                })
        });
    }

})

