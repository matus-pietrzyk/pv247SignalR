using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;

namespace MVC5SignalRChat.Hubs
{
    public class TestHub : Hub
    {

        private static Dictionary<string, Coordinates> Storage = new Dictionary<string, Coordinates>();

        public void Send(string id, double latitude, double longtitude)
        {
            var generator = new Random();
            Storage[id] = new Coordinates { Latitude = latitude, Longtitude = longtitude };
            Clients.All.addNewMessageToPage(JsonConvert.SerializeObject(Storage, Formatting.Indented));
        }

        private class Coordinates
        {
            public double Latitude { get; set; }
            public double Longtitude { get; set; }


            public Coordinates()
            {
                this.Latitude = 0;
                this.Longtitude = 0;
            }

            public Coordinates(double Latitude, double Longitude)
            {
                this.Latitude = Latitude;
                this.Longtitude = Longtitude;
            }


        }
    }
}