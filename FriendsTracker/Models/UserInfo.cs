using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FriendsTracker.Models
{
    public class UserInfo
    {

        public Coordinates Coordinates { get; set; }
        public string Name { get; set; }

        public DateTime TimeStamp { get; set; }

        public UserInfo()
        {
            this.Coordinates = new Coordinates();
            this.TimeStamp = DateTime.Now;
        }

        public UserInfo(Coordinates coordinates, String name, DateTime timeStamp)
        {
            this.Coordinates = coordinates;
            this.Name = name;
            this.TimeStamp = timeStamp;
        }

    }
}