define(['facebook'], function () {

    var listOfFriends = [];

    var authInProgress = false;

    var logedIn = false;

    function statusChangeCallback(response) {
        if (response.status === 'connected') {
            ShowMainScreen();
            getMyFbDetails();
            getFriends();
            logedIn = true;

            console.log("FB loged in");
        }
        else {
            ShowLogInScreen();
            ClearFriendList();
            logedIn = false;

            console.log("FB loged out");
        }

        authInProgress = false;
    }

    window.fbAsyncInit = function () {
        FB.init({
            //appId: '816407471714978',
            appId: '1560258900861036',
            //appId: '708275685924989',
            cookie: true,
            xfbml: true,
            version: 'v2.1'
        });

        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function ClearFriendList() {
        listOfFriends.length = 0;
    }

    function ShowMainScreen() {
        $('#logInScreen').hide();
        $('#mainScreen').show();

        //TODO refactor (Utils should be loaded first)
        if (!$("#sideBar").hasClass("hidden-xs")) {
            $("#sideBar").addClass("hidden-xs");

            $("#showMapBtn").hide();

            $("#googleMap").show();

            $("#buttons").addClass("visible-xs");
            $("#buttons").show();
        }
    }

    function ShowLogInScreen() {
        $('#mainScreen').hide();
        $('#logInScreen').show();
    }

    function getMyFbDetails() {
        FB.api('/me', function (response) {

            getProfilePictureUrl(response.id, function (data) {

                $("#userName").html("<img id='userPhoto' src='" + data + "'>" + response.name);
                $("#userId").text(response.id);

                listOfFriends.push({ id: response.id, name: response.name, pictureurl: data, myself: true });
            });
        });
    };

    function getFriends() {
        FB.api('/me/friends', function (response) {
            if (response.data) {
                $.each(response.data, function (index, friend) {

                    getProfilePictureUrl(friend.id, function (data) {

                        listOfFriends.push({ id: friend.id, name: friend.name, pictureurl: data, myself: false });
                        console.log("id: " + friend.id + ", name: " + friend.name + ", url: " + data);
                    });
                });
            } else {
                alert("Error!");
        }
        });
    }

    function getProfilePictureUrl(id, callback) {
        var path = '/' + id + '/picture';
        return FB.api(path,{"height": "32", "width": "32"}, function (response) {
            if (response && !response.error) {
                callback(response.data.url);
            }
        });
    }

    return {
        getListOfFriends: function () {
       	    return listOfFriends;
        },

        getAuthInProgress: function () {
    	    return authInProgress;
        },

        getLogedIn: function () {
            return logedIn;
        },

        customLogIn: function () {
            authInProgress = true;

            FB.login(function (response) {
                statusChangeCallback(response);
            }, { scope: 'public_profile,email,user_friends' });
        },

        customLogOut: function () {
            FB.logout(function (response) {
                statusChangeCallback(response);
            });
        }
    }
});