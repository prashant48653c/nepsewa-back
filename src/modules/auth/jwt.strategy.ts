import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UsersDocument, UsersModel } from 'src/schemas/user.schema';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UsersDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, 
    });
  }

  async validate(payload: any) {
    console.log("Jwt Stragety Running")
    const user = await this.userModel.findById(payload._id);
    if (!user) {
      throw new UnauthorizedException('Usr not found');
    }
    return user;
  }
}
