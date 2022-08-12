import { eventTypeEnum } from "src/enum/event.type.enum";
import { timestampEntity } from "src/generics/timeStamp.entity";
import { userEntity } from "src/user/entities/user.entity";
import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"
import { Transform } from 'class-transformer';

@Entity('events') 
export class eventsEntity extends timestampEntity{
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number


   @Column()
   titre : string

   @Column({

    type : 'enum' , 
    enum : eventTypeEnum , 
    
})
type :string ;

@Column()
description:string

@Column()
       
image : string ;


@Column()
date : Date;


@ManyToOne(
    type => userEntity,
    (person) => person.event,
    
  )
  user: userEntity;


}