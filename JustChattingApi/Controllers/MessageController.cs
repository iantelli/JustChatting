using AutoMapper;
using JustChatting.Dtos;
using JustChatting.Models;
using JustChatting.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace JustChatting.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessageController : Controller
{
    private readonly IMessageRepository _messageRepository;
    private readonly IChannelRepository _channelRepository;
    private readonly IMapper _mapper;
    
    public MessageController(IMessageRepository messageRepository, IChannelRepository channelRepository, IMapper mapper)
    {
        _messageRepository = messageRepository;
        _channelRepository = channelRepository;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(200, Type = typeof(IEnumerable<Message>))]
    public IActionResult GetMessages()
    {
        var messages = _mapper.Map<List<MessageDto>>(_messageRepository.GetMessages());
        
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        return Ok(messages);
    }
    
    [HttpGet("{messageId}", Name = "GetMessage")]
    [ProducesResponseType(200, Type = typeof(Message))]
    [ProducesResponseType(400)]
    public IActionResult GetMessage(int id)
    {
        if (!_messageRepository.MessageExists(id))
            return NotFound();
        
        var message = _mapper.Map<MessageDto>(_messageRepository.GetMessage(id));
        
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        return Ok(message);
    }
    
    [HttpPost ("{channelId}")]
    [ProducesResponseType(201, Type = typeof(Message))]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public IActionResult CreateMessage(int channelId, [FromBody] MessageDto messageDto)
    {
        if (messageDto == null)
            return BadRequest(ModelState);
        
        if (!_channelRepository.ChannelExists(channelId))
            return NotFound();
        
        var message = _mapper.Map<Message>(messageDto);
        message.ChannelId = channelId;
        
        if (!_messageRepository.CreateMessage(message))
        {
            ModelState.AddModelError("", $"Something went wrong saving the message");
            return StatusCode(500, ModelState);
        }
        
        return CreatedAtRoute("GetMessage", new {messageId = message.Id}, message);
    }
    
    [HttpPut("{messageId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public IActionResult UpdateMessage(int messageId, [FromBody] MessageDto messageDto)
    {
        if (messageDto == null || messageId != messageDto.Id)
            return BadRequest(ModelState);
        
        var message = _mapper.Map<Message>(messageDto);
        
        if (!_messageRepository.UpdateMessage(message))
        {
            ModelState.AddModelError("", $"Something went wrong updating the message");
            return StatusCode(500, ModelState);
        }
        
        return NoContent();
    }
    
    [HttpDelete("{messageId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public IActionResult DeleteMessage(int messageId)
    {
        if (!_messageRepository.MessageExists(messageId))
            return NotFound();
        
        var message = _messageRepository.GetMessage(messageId);
        
        if (!_messageRepository.DeleteMessage(message))
        {
            ModelState.AddModelError("", $"Something went wrong deleting the message");
            return StatusCode(500, ModelState);
        }
        
        return NoContent();
    }
}