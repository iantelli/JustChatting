using AutoMapper;
using JustChatting.Dtos;
using JustChatting.Hubs;
using JustChatting.Models;
using JustChatting.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace JustChatting.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ChannelController : Controller
{
    private readonly IChannelRepository _channelRepository;
    private readonly IMapper _mapper;
    private readonly IHubContext<ChatHub> _hubContext;
    
    public ChannelController(IChannelRepository channelRepository, IMapper mapper, IHubContext<ChatHub> hubContext)
    {
        _channelRepository = channelRepository;
        _mapper = mapper;
        _hubContext = hubContext;
    }
    
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(IEnumerable<Channel>))]
    public IActionResult GetChannels()
    {
        var channels = _mapper.Map<List<ChannelDto>>(_channelRepository.GetChannels());
        
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        return Ok(channels);
    }
    
    [HttpGet("{channelId}", Name = "GetChannel")]
    [ProducesResponseType(200, Type = typeof(Channel))]
    [ProducesResponseType(400)]
    public IActionResult GetChannel(int id)
    {
        if (!_channelRepository.ChannelExists(id))
            return NotFound();
        
        var channel = _mapper.Map<ChannelDto>(_channelRepository.GetChannel(id));
        
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        return Ok(channel);
    }
    
    [HttpGet("{channelId}/messages")]
    [ProducesResponseType(200, Type = typeof(IEnumerable<Message>))]
    [ProducesResponseType(400)]
    public IActionResult GetMessagesInChannel(int channelId)
    {
        if (!_channelRepository.ChannelExists(channelId))
            return NotFound();
        
        var messages = _mapper.Map<List<MessageDto>>(_channelRepository.GetMessagesInChannel(channelId));
        
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        return Ok(messages);
    }
    
    [HttpPost]
    [ProducesResponseType(201, Type = typeof(Channel))]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public IActionResult CreateChannel([FromBody] ChannelDto channelDto)
    {
        if (channelDto == null)
            return BadRequest(ModelState);
        
        if (_channelRepository.ChannelExists(channelDto.Id))
        {
            ModelState.AddModelError("", "Channel already exists");
            return StatusCode(404, ModelState);
        }
        
        var channel = _mapper.Map<Channel>(channelDto);
        
        if (!_channelRepository.CreateChannel(channel))
        {
            ModelState.AddModelError("", $"Something went wrong saving the channel {channel.Name}");
            return StatusCode(500, ModelState);
        }
        
        return CreatedAtRoute("GetChannel", new {id = channel.Id}, channel);
    }
    
    [HttpPatch("{channelId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public IActionResult UpdateChannel(int channelId, [FromBody] ChannelDto channelDto)
    {
        if (channelDto == null || channelId != channelDto.Id)
            return BadRequest(ModelState);
        
        var channel = _mapper.Map<Channel>(channelDto);
        
        if (!_channelRepository.UpdateChannel(channel))
        {
            ModelState.AddModelError("", $"Something went wrong updating the channel {channel.Name}");
            return StatusCode(500, ModelState);
        }
        
        return NoContent();
    }
    
    [HttpDelete("{channelId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public IActionResult DeleteChannel(int channelId)
    {
        if (!_channelRepository.ChannelExists(channelId))
            return NotFound();
        
        var channel = _channelRepository.GetChannel(channelId);
        
        if (!_channelRepository.DeleteChannel(channel))
        {
            ModelState.AddModelError("", $"Something went wrong deleting the channel {channel.Name}");
            return StatusCode(500, ModelState);
        }
        
        return NoContent();
    }
}