import { Injectable } from '@nestjs/common';
import { CollegeDto } from './dto/college.dto';
import { College, CollegeDocument } from 'src/schemas/college.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadImages } from 'src/config/cloudinary.config';

@Injectable()
export class CollegeService {
  constructor(
    @InjectModel(College.name) private collegeModel: Model<CollegeDocument>
  ) { }
  async createCollege(CollegeDto: CollegeDto, pictures: Express.Multer.File[]) {
    const picturesUrl = await uploadImages(pictures)
    const newCollege = new this.collegeModel({ ...CollegeDto, picture: picturesUrl })
    return await newCollege.save()
  }

  async findAllCollege() {
    return await this.collegeModel.aggregate([
      { $sort: { createdAt: 1 } },
      { $limit: 4 },
    ]);
  }

  async createComment(comment: string, _id: string) {
    return await this.collegeModel.findByIdAndUpdate(
      _id,
      {
        $push: { comments: comment },
      },
      { new: true }
    );
  }




}
