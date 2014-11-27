define(['facebook'], function () {
    function statusReady(response) {
        console.log("Logged in! - first call status: " + response.status);

        if (!(response.status === 'connected')) {
            LogIn();
            return;
        }
        testAPI();
        //testFriends();

    }


    function statusChangeCallback(response) {
        if (response.status === 'connected') {
            testAPI();
            //testFriends();
            console.log("Logged in!");
        }
        else {
            console.log("Logged out!");
            LogIn();
        }
    }

    function LogIn() {
        FB.login(function (response) {
            statusReady(response);
        }, { scope: 'public_profile,email,user_friends' });
    }

    function LogOut() {
        FB.logout(function (response) {
            statusChangeCallback(response);
        });
    }

    window.fbAsyncInit = function () {
        FB.init({
            //appId: '816407471714978',
            //appId: '1560258900861036',
            appId: '708275685924989',
            cookie: true,
            xfbml: true,
            version: 'v2.1'
        });

        FB.getLoginStatus(function (response) {
            statusReady(response);
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function testAPI() {
        FB.api('/me', function (response) {
            console.log("FB logged in");
            $("#userName").text(response.name);
            $("#userId").text(response.id);
        });
    };

    function testFriends() {
        FB.api('/me/friends', function (response) {
            if (response.data) {
                $.each(response.data, function (index, friend) {
                    alert(friend.name + ' has id:' + friend.id);
                });
            } else {
                alert("Error!");
            }
        });
    }
});