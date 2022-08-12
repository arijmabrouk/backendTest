import { Body, Controller, Get, Post } from '@nestjs/common';
import { addEventDto } from './dto/addEvent.dto';
import { eventsEntity } from './entities/events.entity';
import { eventsService } from './events.service';

@Controller('events')
export class eventsController {

    constructor(
        private eventsService: eventsService
    ){}
    @Get('get')
    async getEvents(): Promise<eventsEntity[]>{
            return await this.eventsService.getEvents()
    }

    @Post('post')
    async addEvent(
        @Body() event: addEventDto
    ): Promise<eventsEntity>{
        return await this.eventsService.addEvent(event)
    }

    
}