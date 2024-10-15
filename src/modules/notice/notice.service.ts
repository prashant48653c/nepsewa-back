// src/notice/notice.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notice, NoticeDocument } from '../../schemas/notice.schema';

@Injectable()
export class NoticeService {
  constructor(@InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>) {}

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const newNotice = new this.noticeModel({
      ...createNoticeDto,
      createdAt: new Date(),
    });
    return newNotice.save();
  }

  async findAll(): Promise<Notice[]> {
    return this.noticeModel.find().exec();
  }

  async findOne(id: string): Promise<Notice> {
    const notice = await this.noticeModel.findById(id).exec();
    if (!notice) {
      throw new NotFoundException(`Notice with id ${id} not found`);
    }
    return notice;
  }

  async delete(id: string): Promise<void> {
    const result = await this.noticeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Notice with id ${id} not found`);
    }
  }
}
