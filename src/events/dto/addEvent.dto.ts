import { isString,IsNotEmpty, IsOptional } from "class-validator";

export class addEventDto{

    @IsNotEmpty()
    titre : string

    @IsNotEmpty()
type :string ;

@IsNotEmpty()
description:string


@IsOptional()   
image : string ;

@IsNotEmpty()
date:Date;
}