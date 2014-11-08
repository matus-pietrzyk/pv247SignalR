using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FriendsTracker.Startup))]
namespace FriendsTracker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
