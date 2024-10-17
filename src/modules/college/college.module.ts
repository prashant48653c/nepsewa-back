import { Module } from '@nestjs/common';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { College, CollegeSchema } from 'src/schemas/college.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/schemas/course.schema';

@Module({
  controllers: [CollegeController],
  providers: [CollegeService],
  imports:[

    MongooseModule.forFeature([{ name: College.name, schema: CollegeSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ]
})
export class CollegeModule {}
