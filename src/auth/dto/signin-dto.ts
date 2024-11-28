import { IsEmail, IsString } from "class-validator";

export class SinginDTO{
    
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}