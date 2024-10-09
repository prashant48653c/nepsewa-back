
import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utils/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    async signUp(signUpDto: SignUpDto) {
        const { username, email, password } = signUpDto;
        console.log(signUpDto)
        const isOldUser = await this.userModel.findOne({ email })
        if (isOldUser) {
            throw new ConflictException({ message: 'Email already exists' });
        }
        const hashedPassword = await hashPassword(password)

        const newUser = await this.userModel.create({ ...signUpDto, password: hashedPassword })
        await newUser.save();
        return newUser
    }

    async login(loginDto: loginDto) {
        const {email,password}=loginDto
        const user = await this.userModel.findOne({ email }).exec();
      
        const payload = { sub: user._id };
        const accessToken = this.jwtService.sign(payload);
        return {
            username: 'piku',
            email: 'dd',
            password: 'dd'
        }
    }

}