using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using FriendsTracker2.Models;
using Newtonsoft.Json;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Hosting;


namespace FriendsTracker2.Hubs
{
    [HubName("friendsTrackerHub")]
    public class FriendsTrackerHub : Hub
    {
        private static Dictionary<string, Coordinates> Storage = new Dictionary<string, Coordinates>();

        public void Send(string id, double latitude, double longtitude)
        {
            var generator = new Random();
            Storage[id] = new Coordinates { Latitude = latitude, Longtitude = longtitude };
            Clients.All.updateCoordinates(JsonConvert.SerializeObject(Storage, Formatting.Indented));
        }


    }
}