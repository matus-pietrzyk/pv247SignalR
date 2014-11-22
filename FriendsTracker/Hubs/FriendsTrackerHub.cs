using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using FriendsTracker.Models;
using System.Collections.Concurrent;
using Newtonsoft.Json;

namespace FriendsTracker.Hubs
{
    public class FriendsTrackerHub : Hub
    {
        //private static Dictionary<string, Coordinates> Storage = new Dictionary<string, Coordinates>();
        private static System.Collections.Concurrent.ConcurrentDictionary<string, UserInfo> Storage = new ConcurrentDictionary<string, UserInfo>();

        public void Send(string id, double latitude, double longtitude)
        {
            var generator = new Random();
            //Storage[id] = new UserInformation { Coordinates = new Coordinates(latitude, longtitude) };
            Storage[id] = new UserInfo(new Coordinates { Latitude = latitude, Longtitude = longtitude }, "TestName", DateTime.Now);
            Clients.All.updateCoordinates(JsonConvert.SerializeObject(Storage, Formatting.Indented));
        }
    }
}