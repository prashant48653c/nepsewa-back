
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDto {

    @IsNotEmpty()
    @IsString()


    @IsEmail({}, { message: "Please enter correct email" })
    readonly email: string;

    @MinLength(6)
    @IsNotEmpty()
    @IsString()


    readonly password: string;

    
    @IsNotEmpty()
    @IsString()


    readonly username: string;
}