using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FriendsTracker2.Models
{
    public class UserInformation
    {
        public Coordinates Coordinates { get; set; }

        public UserInformation()
        {
            this.Coordinates = new Coordinates();
        }

        public UserInformation(Coordinates coordinates)
        {
            this.Coordinates = coordinates;
        }

    }
}