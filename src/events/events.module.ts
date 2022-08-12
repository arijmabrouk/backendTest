import { Module } from "@nestjs/common";
import { eventsController } from './events.controller';
import { eventsService } from './events.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import { eventsEntity } from "./entities/events.entity";
@Module({
    imports:[TypeOrmModule.forFeature([eventsEntity])],
    exports:[],
    controllers:[eventsController],
    providers:[eventsService]
})
export class eventsModule {

}