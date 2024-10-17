import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from 'src/schemas/job.schema';
import { User, USERSCHEMA } from 'src/schemas/user.schema';
import { MailerService } from 'src/utils/welcome';
 

@Module({
  imports:[
    MongooseModule.forFeature([{name:Job.name,schema:JobSchema}]),
    MongooseModule.forFeature([{name:User.name,schema:USERSCHEMA}])
  ],
  controllers: [JobController],
  providers: [JobService,MailerService],
})
export class JobModule {}
