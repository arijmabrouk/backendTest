import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {userEntity} from './entities/user.entity' ; 
import {Repository} from 'typeorm' ;
import { InjectRepository } from '@nestjs/typeorm';
import { subscribeUserDto } from './dto/subscribeUser.dto';

import * as bcrypt from 'bcrypt' ;
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { JwtService } from '@nestjs/jwt';





@Injectable()
export class userService {
    constructor( 
        @InjectRepository(userEntity) 
        private userRepository : Repository<userEntity> ,
      

        private jwtService : JwtService,
     
        


        
    ){}

  async signUp(userData:subscribeUserDto) : Promise<Partial <userEntity>> {
      const user = this.userRepository.create({
          ...userData
      })
      
      console.log(user)
      user.password= await bcrypt.hash(user.password , 10) 
      try{
     await this.userRepository.save(user) ;
      } catch (e) {
          throw new ConflictException('le userName et le password doivent etre uniques')
      }

      return { 
          id : user.id, 
          lastname :user.lastname, 
          email : user.email, 
        
      } ;
  }
  async validatePassword(password: string, pass2: string): Promise<boolean> {
    const hash = bcrypt.compare(password, pass2);
    return hash;
  }
  async login(credentials : LoginCredentialsDto) {
      const {email, password} =credentials ; 
      const user = await this.userRepository.createQueryBuilder("user").select(["user.email", "user.password" , "user.firstname","user.lastname","user.phone","user.id","user.address" ] )
      .where("user.email=:email " , {email}) 
      .getOne() ;
      console.log("user : ", user)
      if(!user) 
      throw new NotFoundException("l' email ou le mot de passe est incorrect") ; 
     
     
      if(await this.validatePassword(password, user.password)) {
        
        const payload  = {...user }
          
        
        const jwt = await this.jwtService.sign(payload) ;
        payload['jwt'] = jwt 
        return  {payload}  
          
      }
      else {
        throw new NotFoundException("le mot de passe est incorrect") ; 
      }
      

  }

}