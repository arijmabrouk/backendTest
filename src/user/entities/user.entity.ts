import { Entity, PrimaryGeneratedColumn , Column, OneToMany  } from "typeorm";


import { timestampEntity } from "src/generics/timeStamp.entity";
import { eventsEntity } from "src/events/entities/events.entity";



@Entity('user')
export class userEntity extends timestampEntity {
    @PrimaryGeneratedColumn()
    
    id : number ;

    @Column()
    firstname : string ;

    @Column()
    lastname: string ; 

    @Column()
    email : string ;

    @Column()
    phone : number ;

    @Column()
    address : string ;

    @Column({
        select : false 
    })
    password : string ;

    @OneToMany(
        type => eventsEntity,
        (event) => event.user,
       
      )
      event: eventsEntity[];
    
}

