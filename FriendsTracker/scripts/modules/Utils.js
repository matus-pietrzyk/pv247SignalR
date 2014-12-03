define(["jquery"], function ($) {
   
    return {
        showSideBar: function () {
            $("#googleMap").hide();

            $("#buttons").removeClass("visible-xs");
            $("#buttons").hide();

            $("#sideBar").removeClass("hidden-xs");

            $("#showMapBtn").show();
        },

        showMap: function () {
            $("#sideBar").addClass("hidden-xs");

            $("#showMapBtn").hide();

            $("#googleMap").show();

            $("#buttons").addClass("visible-xs");
            $("#buttons").show();
        }
    }

})