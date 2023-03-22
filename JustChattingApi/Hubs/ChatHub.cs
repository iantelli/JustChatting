using Microsoft.AspNetCore.SignalR;

namespace JustChatting.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", message);
    }
    public override Task OnConnectedAsync()
    {
        Console.WriteLine("A Client Connected: " + Context.ConnectionId);
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        Console.WriteLine("A client disconnected: " + Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }
}