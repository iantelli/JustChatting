﻿namespace JustChatting.Dtos;

public class MessageDto
{
    public int Id { get; set; }
    public string Text { get; set; }
    public string UserName { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
}