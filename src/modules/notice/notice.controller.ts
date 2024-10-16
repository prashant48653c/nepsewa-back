// src/notice/notice.controller.ts
import { Body, Controller, Delete, Get, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from '../../schemas/notice.schema';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  async createNotice(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    try {
      return await this.noticeService.create(createNoticeDto);
    } catch (error) {
      throw new HttpException('Error creating notice', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllNotices(): Promise<Notice[]> {
    try {
      return await this.noticeService.findAll();
    } catch (error) {
      throw new HttpException('Error fetching notices', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getNotice(@Param('id') id: string): Promise<Notice> {
    try {
      const notice = await this.noticeService.findOne(id);
      if (!notice) {
        throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);
      }
      return notice;
    } catch (error) {
      throw new HttpException('Error fetching notice', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteNotice(@Param('id') id: string,): Promise<{message:string}> {
    try {
      const result = await this.noticeService.delete(id);
     return {message:'Succesfully Deleted'}

    } catch (error) {
      throw new HttpException('Error deleting notice', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
