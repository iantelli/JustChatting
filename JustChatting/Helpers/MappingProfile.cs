using AutoMapper;
using JustChatting.Models;
using JustChatting.Dtos;
namespace JustChatting.Helpers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Message, MessageDto>().ReverseMap();
        CreateMap<Channel, ChannelDto>().ReverseMap();
    }
}