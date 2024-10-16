// src/user/user.controller.ts
import { Controller, Post, Body, Res, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/citizen.dto';
import { DocService } from './doc.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('nagrita')
export class DocController {
  constructor(private readonly docService: DocService) { }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async generateCitizenshipDocument(@Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const nagrita = await this.docService.generatePDF(createUserDto, file);
      return nagrita;
    } catch (error) {
      throw new HttpException('Error generating citizenship document', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
