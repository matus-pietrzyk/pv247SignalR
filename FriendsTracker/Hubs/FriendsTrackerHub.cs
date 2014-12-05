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
        private static System.Collections.Concurrent.ConcurrentDictionary<string, UserInfo> Storage = new ConcurrentDictionary<string, UserInfo>();

        public void Send(string id, double latitude, double longtitude)
        {
            Storage[id] = new UserInfo(new Coordinates { Latitude = latitude, Longtitude = longtitude }, DateTime.Now);
            Clients.All.updateCoordinates(JsonConvert.SerializeObject(Storage, Formatting.Indented));
        }

        public void Delete(string id)
        {
            UserInfo removedItem = null ;
            Storage.TryRemove(id, out removedItem);
        }
    }
}