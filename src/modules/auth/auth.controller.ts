
import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
        return await this.authService.signUp(signUpDto)
 
    }

    
    @Post('login')
    async login(@Body() loginDto:loginDto):Promise<tokenType>{
        console.log("Gone")
        return await this.authService.login(loginDto)
    }

    @Patch('updatepp/:id')
    @UseInterceptors(FileInterceptor('profilePic',{
        storage: diskStorage({
            destination:'./profilePics',
            filename(req, file, callback) {
                const uniqueName=Date.now() + '-' + Math.round(Math.random() * 1e9);
                callback(null, `${uniqueName}${extname(file.originalname)}`);
              },
        })
    }))
    async updateProfilePicture(@UploadedFile() profilePic:Express.Multer.File,@Param('id') id:string):Promise<userType>{
        const user= await this.authService.updateProfilePicture(profilePic,id)
        return user
    }

    
}
