import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { User, USERSCHEMA } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ ConfigModule.forRoot({     
    envFilePath: '.env',
    isGlobal: true
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads',
  }),
  AuthModule,
  JwtModule,
  MongooseModule.forRoot(process.env.MONGO_URL),
  MongooseModule.forFeature([{ name: User.name, schema: USERSCHEMA }]),
  
],
  controllers: [AppController, AuthController],
  providers: [AppService,AuthService],
})
export class AppModule {}
