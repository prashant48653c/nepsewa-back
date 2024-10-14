
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { tokenType, userType } from 'src/constant/types';
import { loginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { } 

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<userType> {
        return await this.authService.signUp(signUpDto)
 
    }

    
    @Post('login')
    async login(@Body() loginDto:loginDto):Promise<tokenType>{
        console.log("Gone")
        return await this.authService.login(loginDto)
    }

    
}
