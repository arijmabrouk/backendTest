import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userController } from './user.controller';
import { userService } from './user.service';
import {userEntity} from './entities/user.entity' ; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/passport-jwt.strategy';





@Module({
  imports : [  TypeOrmModule.forFeature([userEntity]),
  PassportModule.register({defaultStrategy : 'jwt'} ),
  JwtModule.register({secret : 'arijSecretKey' , 
  signOptions : {
    expiresIn : 3600 
  } 
}),

 
],
 
  controllers: [userController],
  providers: [userService , JwtStrategy ]
})
export class userModule {}