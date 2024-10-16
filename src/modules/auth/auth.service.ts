import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utils/hash';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from 'src/utils/welcome';
import { uploadImages } from 'src/config/cloudinary.config';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailerService: MailerService
    ) { }

    async signUp(signUpDto: SignUpDto) {
        try {
            const { username, email, password } = signUpDto;
            console.log(signUpDto);
            
            const isOldUser = await this.userModel.findOne({ email });
            if (isOldUser) {
                throw new ConflictException({ message: 'Email already exists' });
            }
            
            const hashedPassword = await hashPassword(password);
            const newUser = new this.userModel({ ...signUpDto, password: hashedPassword });
            
            await newUser.save();
            await this.mailerService.sendWelcomeEmail(email, username);
            
            return newUser;
        } catch (error) {
            console.error('Error during sign up:', error);
            throw new HttpException('Sign up failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(loginDto: loginDto) {
        try {
            const { email, password } = loginDto;

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

            return { accessToken, refreshToken };
        } catch (error) {
            console.error('Error during login:', error);
            throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProfilePicture(profilePic: Express.Multer.File, _id: string) {
        try {
            const uploadedUrls = await uploadImages(profilePic);

            const user = await this.userModel.findByIdAndUpdate(_id, { profilePic: uploadedUrls[0] }, { new: true });
            return user;
        } catch (error) {
            console.error('Error updating profile picture:', error);
            throw new HttpException('Failed to update profile picture', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
