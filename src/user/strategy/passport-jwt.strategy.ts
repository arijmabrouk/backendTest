import { ExtractJwt , Strategy } from "passport-jwt"; 
import { PassportStrategy } from "@nestjs/passport"; 
import {Injectable, UnauthorizedException} from '@nestjs/common' ; 
import { validate } from "class-validator";
import {ConfigService} from '@nestjs/config' ;
import { payloadInterface } from "src/interfaces/payload.interface"; 
import { userEntity } from '../entities/user.entity' ;
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService : ConfigService , 
        @InjectRepository(userEntity)
        private userRepository : Repository<userEntity> 
    ) {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken() ,
            ignoreExpiration : false , 
            secretOrKey : "arijSecretKey"
            
        }) ;  }
        async validate(payload : payloadInterface) {

            //j'ai recupéré mon user d'email email 
            const user = await this.userRepository.findOne({
                where :{ email : payload.email}
               
            })
            //si le user existe 
            if(user) {
                
                delete user.password ; 
                return user ; 
            }
            else 
            throw new UnauthorizedException() ;
        }
    }