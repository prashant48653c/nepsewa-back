import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notice, NoticeDocument } from '../../schemas/notice.schema';

@Injectable()
export class NoticeService {
  constructor(@InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>) { }

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    try {
      const newNotice = new this.noticeModel({
        ...createNoticeDto,
        createdAt: new Date(),
      });
      return await newNotice.save();
    } catch (error) {
      console.error('Error creating notice:', error);
      throw new HttpException('Failed to create notice', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(currentPage: number): Promise<Notice[]> {
    try {
      const limit = 4;
      const skip = (currentPage - 1) * limit;
      return await this.noticeModel.aggregate([
        {
          $group: { _id: null, }
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip }, { $limit: limit }
      ])
    } catch (error) {
      console.error('Error fetching notices:', error);
      throw new HttpException('Failed to retrieve notices', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Notice> {
    try {
      const notice = await this.noticeModel.findById(id).exec();
      if (!notice) {
        throw new NotFoundException(`Notice with id ${id} not found`);
      }
      return notice;
    } catch (error) {
      console.error(`Error finding notice with id ${id}:`, error);
      throw new HttpException('Failed to retrieve notice', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.noticeModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Notice with id ${id} not found`);
      }
    } catch (error) {
      console.error(`Error deleting notice with id ${id}:`, error);
      throw new HttpException('Failed to delete notice', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
