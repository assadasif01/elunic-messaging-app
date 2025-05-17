import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body(ValidationPipe) createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 3) {
    return this.messagesService.findAll(+page, +limit);
  }
} 