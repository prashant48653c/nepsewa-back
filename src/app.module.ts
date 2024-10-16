import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { User, USERSCHEMA } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DocController } from './modules/document/doc.controller';
import { DocService } from './modules/document/doc.service';
import { DocModule } from './modules/document/doc.module';
import { MailerService } from './utils/welcome';
import { NoticeModule } from './modules/notice/notice.module';
import { NoticeController } from './modules/notice/notice.controller';
import { NoticeService } from './modules/notice/notice.service';
import { Notice, NoticeSchema } from './schemas/notice.schema';
import { PaymentModule } from './modules/payment/payment.module';
import { PaymentController } from './modules/payment/payment.controller';
import { PaymentService } from './modules/payment/payment.service';
 

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
  DocModule,
  NoticeModule,
  JwtModule,
  PaymentModule,
  JwtModule.registerAsync({
    imports: [ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true 
    })],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get('JWT_SECRET'),
      signOptions: {
        expiresIn: '7d',
      },
    }),
  }),
  
  MongooseModule.forRoot(process.env.MONGO_URL),
  MongooseModule.forFeature([{ name: User.name, schema: USERSCHEMA }]),
  MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),

  
],
  controllers: [AppController, AuthController,DocController,NoticeController,PaymentController],
  providers: [AppService,AuthService,DocService,MailerService,NoticeService,PaymentService],
})
export class AppModule {}
