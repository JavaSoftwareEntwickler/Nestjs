import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}

/* export interface AuthDto {
    email: string
    password: string
} */

