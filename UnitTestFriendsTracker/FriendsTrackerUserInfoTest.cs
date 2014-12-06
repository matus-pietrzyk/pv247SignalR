using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FriendsTracker.Models;

namespace UnitTestFriendsTracker
{
    [TestClass]
    public class FriendsTrackerUserInfoTest
    {
        [TestMethod]
        public void EmptyConstructor_Test()
        {
            UserInfo newUser = new UserInfo();

            Assert.IsNotNull(newUser, "Should not be null");
            Assert.IsNotNull(newUser.Coordinates, "Should not be null");
            Assert.IsNotNull(newUser.TimeStamp, "Should not be null");
        }

        [TestMethod]
        public void Constructor_Test()
        {
            double longitude = 49.123;
            double latitude = 16.463;

            Coordinates coords = new Coordinates(latitude, longitude);
            DateTime timestamp = new DateTime();
            timestamp = DateTime.Now;

            UserInfo newUser = new UserInfo(coords, timestamp);

            Assert.IsNotNull(newUser, "Should not be null");
            Assert.IsNotNull(newUser.Coordinates, "Should not be null");
            Assert.IsNotNull(newUser.TimeStamp, "Should not be null");
        }

        [TestMethod]
        public void UserInfoCoordinates_Test()
        {
            UserInfo newUser = new UserInfo();
            Assert.AreEqual(0, newUser.Coordinates.Latitude, "Should be 0");
            Assert.AreEqual(0, newUser.Coordinates.Longtitude, "Should be 0");

            newUser.Coordinates.Latitude = 49.123;

            Assert.AreEqual(49.123, newUser.Coordinates.Latitude, "Should be 49.123");
            Assert.AreEqual(0, newUser.Coordinates.Longtitude, "Should be 0");

            newUser.Coordinates.Longtitude = 16.463;

            Assert.AreEqual(49.123, newUser.Coordinates.Latitude, "Should be 49.123");
            Assert.AreEqual(16.463, newUser.Coordinates.Longtitude, "Should be  16.463");

            newUser.Coordinates.Latitude = -1234;
            newUser.Coordinates.Longtitude = -2345;

            Assert.AreEqual(-1234, newUser.Coordinates.Latitude, "Should be -1234");
            Assert.AreEqual(-2345, newUser.Coordinates.Longtitude, "Should be  -2345");

            newUser.Coordinates.Latitude = double.MaxValue;
            Assert.AreEqual(double.MaxValue, newUser.Coordinates.Latitude, "Should be "+double.MaxValue);

        }
    }
}
