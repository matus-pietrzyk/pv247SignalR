using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FriendsTracker.Models;

namespace UnitTestFriendsTracker
{
    [TestClass]
    public class FriendsTrackerUserInfoTest
    {
        public UserInfo globalUserInfo = new UserInfo();

        public const double latSample = 49.2100606;
        public const double lonSample = 16.5992325;

        public void fill_global_user_info(double lat, double lon)
        {
            globalUserInfo.Coordinates.Latitude = lat;
            globalUserInfo.Coordinates.Longtitude = lon;
        }


        [TestMethod]
        public void non_parametric_constructor_default_values()
        {
            UserInfo newUserInfo = new UserInfo();
            Coordinates defaultCoords = new Coordinates(0, 0);

            Assert.AreEqual(defaultCoords.Latitude, newUserInfo.Coordinates.Latitude, "Default latitude should be 0");
            Assert.AreEqual(defaultCoords.Longtitude, newUserInfo.Coordinates.Longtitude, "Default longitude should be 0");
            
        }

        [TestMethod]
        public void non_parametric_constructor_setting_values()
        {
            Coordinates coordsSample = new Coordinates(latSample, lonSample);

            UserInfo newUserInfo = new UserInfo(coordsSample, DateTime.Now);

            Assert.AreEqual(newUserInfo.Coordinates.Latitude, latSample, "Latitude should be equal to " + latSample);
            Assert.AreEqual(newUserInfo.Coordinates.Longtitude, lonSample, "Longitude should be equal to " + lonSample);
         //   Assert.AreEqual(newUserInfo.Coordinates.Longtitude, lonSample, "Longtitude should be equal to " + lonSample);
        }

        [TestMethod]
        public void non_parametric_user_info_coordinates_changing()
        {
            UserInfo newUserInfo = new UserInfo();

            Assert.AreEqual(0, newUserInfo.Coordinates.Latitude, "Should be 0");
            Assert.AreEqual(0, newUserInfo.Coordinates.Longtitude, "Should be 0");

            newUserInfo.Coordinates.Latitude = 49.123;

            Assert.AreEqual(49.123, newUserInfo.Coordinates.Latitude, "Should be 49.123");
            Assert.AreEqual(0, newUserInfo.Coordinates.Longtitude, "Should be 0");

            newUserInfo.Coordinates.Longtitude = 16.463;

            Assert.AreEqual(49.123, newUserInfo.Coordinates.Latitude, "Should be 49.123");
            Assert.AreEqual(16.463, newUserInfo.Coordinates.Longtitude, "Should be  16.463");

            newUserInfo.Coordinates.Latitude = -1234;
            newUserInfo.Coordinates.Longtitude = -2345;

            Assert.AreEqual(-1234, newUserInfo.Coordinates.Latitude, "Should be -1234");
            Assert.AreEqual(-2345, newUserInfo.Coordinates.Longtitude, "Should be  -2345");

            newUserInfo.Coordinates.Latitude = double.MaxValue;
            Assert.AreEqual(double.MaxValue, newUserInfo.Coordinates.Latitude, "Should be "+double.MaxValue);
        }

        [TestMethod]
        public void parametric_user_info_coordinates_changing()
        {
            Coordinates coordsSample = new Coordinates(latSample, lonSample);

            UserInfo newUserInfo = new UserInfo(coordsSample, DateTime.Now);

            Assert.AreEqual(coordsSample.Latitude, newUserInfo.Coordinates.Latitude, "Should be " + coordsSample.Latitude);
            Assert.AreEqual(coordsSample.Longtitude, newUserInfo.Coordinates.Longtitude, "Should be " + coordsSample.Longtitude);

            newUserInfo.Coordinates.Latitude = 49.123;

            Assert.AreEqual(49.123, newUserInfo.Coordinates.Latitude, "Should be 49.123");
            Assert.AreEqual(coordsSample.Longtitude, newUserInfo.Coordinates.Longtitude, "Should be " + coordsSample.Longtitude);

            newUserInfo.Coordinates.Longtitude = 16.463;

            Assert.AreEqual(49.123, newUserInfo.Coordinates.Latitude, "Should be 49.123");
            Assert.AreEqual(16.463, newUserInfo.Coordinates.Longtitude, "Should be  16.463");

            newUserInfo.Coordinates.Latitude = -1234;
            newUserInfo.Coordinates.Longtitude = -2345;

            Assert.AreEqual(-1234, newUserInfo.Coordinates.Latitude, "Should be -1234");
            Assert.AreEqual(-2345, newUserInfo.Coordinates.Longtitude, "Should be  -2345");

            newUserInfo.Coordinates.Latitude = 0;
            newUserInfo.Coordinates.Longtitude = 0;

            Assert.AreEqual(0, newUserInfo.Coordinates.Latitude, "Should be 0");
            Assert.AreEqual(0, newUserInfo.Coordinates.Longtitude, "Should be 0");

            newUserInfo.Coordinates.Latitude = double.MaxValue;
            Assert.AreEqual(double.MaxValue, newUserInfo.Coordinates.Latitude, "Should be " + double.MaxValue);
        }
    }
}
