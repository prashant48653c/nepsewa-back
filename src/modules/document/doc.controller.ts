// src/user/user.controller.ts
import { Controller, Post, Body, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
 
import { Response } from 'express';
import { CreateUserDto } from './dto/citizen.dto';
import { DocService } from './doc.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('nagrita')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./uploads',
      filename(req, file, callback) {
        const uniqueName=Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueName}${extname(file.originalname)}`);
      },
    })
  }))
 async generateCitizenshipDocument(@Body() createUserDto: CreateUserDto,
 @UploadedFile() file: Express.Multer.File,
) {
  const nagrita= this.docService.generatePDF(createUserDto,file);
    return nagrita
  }
}
