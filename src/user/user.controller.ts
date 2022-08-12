import { Body, Controller, Post } from "@nestjs/common";
import { LoginCredentialsDto } from "./dto/login.credentials.dto";
import { subscribeUserDto } from "./dto/subscribeUser.dto";
import { userEntity } from "./entities/user.entity";
import { userService } from "./user.service";

@Controller('user')
export class userController {
    constructor(
        private  userService : userService

    ){
    }

   @Post()
    signUp(
        @Body() userData : subscribeUserDto
    ) : Promise<Partial<userEntity>> {
        return this.userService.signUp(userData);

    }
    @Post('login')
    login(
        @Body() credentials: LoginCredentialsDto
    )  { 
        
        return this.userService.login(credentials);

    }
}