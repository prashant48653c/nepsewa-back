// src/notice/notice.controller.ts
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from  '../../schemas/notice.schema'

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  async createNotice(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return this.noticeService.create(createNoticeDto);
  }

  @Get()
  async getAllNotices(): Promise<Notice[]> {
    return this.noticeService.findAll();
  }

  @Get(':id')
  async getNotice(@Param('id') id: string): Promise<Notice> {
    return this.noticeService.findOne(id);
  }

  @Delete(':id')
  async deleteNotice(@Param('id') id: string): Promise<void> {
    return this.noticeService.delete(id);
  }
}
