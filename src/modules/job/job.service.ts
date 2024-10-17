import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/schemas/job.schema';
import { JobDto } from './dto/job.dto';
import { User } from 'src/schemas/user.schema';
import { MailerService } from 'src/utils/welcome';

@Injectable()
export class JobService {
  constructor(
    private mailerService:MailerService,
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(User.name) private readonly userModel: Model<User> 
  ) { }

  async findAll() {
    return await this.jobModel.find();
  }

  async findOne(id: string) {
    return await this.jobModel.findById({ _id: id });
  }

  async create(createJobDto: JobDto) {
    console.log(createJobDto)

    const newJob = new this.jobModel(createJobDto)
    console.log(newJob)

    const users = await this.userModel.find({}, { _id: 0, email: 1,username:1 }).exec();
    for (const user of users) {
      await this.mailerService.sendWelcomeEmail(user.email, user.username,'job');
    }


    return await newJob.save()
  }
}
