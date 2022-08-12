import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { addEventDto } from './dto/addEvent.dto';
import { eventsEntity } from './entities/events.entity';


@Injectable()
export class eventsService {

    constructor(
        @InjectRepository(eventsEntity)
        private eventsRepository: Repository<eventsEntity>
    ){}

    async getEvents() : Promise<eventsEntity[]> {
        return await this.eventsRepository.find() ; 
     } 

     async addEvent(event : addEventDto){
        return await this.eventsRepository.save(event) 
     }

    }