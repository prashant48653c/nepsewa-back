import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { tokenType, userType } from 'src/constant/types';
import { loginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { } 

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<userType> {
        try {
            return await this.authService.signUp(signUpDto);
        } catch (error) {
            throw new HttpException('Error during signup', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    async login(@Body() loginDto: loginDto): Promise<tokenType> {
        try {
            console.log("Login attempt");
            return await this.authService.login(loginDto);
        } catch (error) {
            throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
        }
    }

    @Patch('updatepp/:id')
    @UseInterceptors(FileInterceptor('profilePic')) 
    async updateProfilePicture(@UploadedFile() profilePic: Express.Multer.File, @Param('id') id: string): Promise<userType> {
        try {
            const user = await this.authService.updateProfilePicture(profilePic, id);
            return user;
        } catch (error) {
            throw new HttpException('Error updating profile picture', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
