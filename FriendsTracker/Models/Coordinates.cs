using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FriendsTracker.Models
{
    public class Coordinates
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
            this.Longtitude = Longitude;
        }
    }
}