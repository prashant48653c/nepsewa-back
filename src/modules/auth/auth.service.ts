
import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utils/hash';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { MailerService } from 'src/utils/welcome';
import { CreateUserDto } from '../document/dto/citizen.dto';
import { fileURLToPath } from 'url';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailerService: MailerService
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

        await this.mailerService.sendWelcomeEmail(email, username);
        return newUser
    }

    async login(loginDto: loginDto) {
        const { email, password } = loginDto


        const user = await this.userModel.findOne({ email }).exec();
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException({ message: 'Invalid credentials' });
        }
        const payload = { _id: user._id };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '7d',
        });

        user.refreshToken = refreshToken;
        await user.save();
        return { accessToken, refreshToken }
    }

    async updateProfilePicture(profilePic: Express.Multer.File, _id: string) {
        const filePath =`${process.env.BACKEND_URL}/${profilePic.path.replace(/^\/+/, '')}`; 
        console.log(filePath)
        const user = await this.userModel.findByIdAndUpdate(_id, { profilePic: filePath }, { new: true })
        return user
    }

}