using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FriendsTracker.Models
{
    public class UserInfo
    {

        public Coordinates Coordinates { get; set; }

        public UserInfo()
        {
            this.Coordinates = new Coordinates();
        }

        public UserInfo(Coordinates coordinates)
        {
            this.Coordinates = coordinates;
        }

    }
}