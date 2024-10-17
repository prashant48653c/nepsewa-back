import { Controller, Post, Body, UseInterceptors, UploadedFiles, Get, Patch } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeDto } from './dto/college.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('picture',4))

  async createPayment(@Body() collegeDto:CollegeDto, @UploadedFiles() picture:Express.Multer.File) {
    return this.collegeService.createCollege(collegeDto,picture);
  }

  @Get()
  async findAll(@Body() id:string,comment:string){
    return this.collegeService.findAllCollege()
  }

@Patch()
  async createComment(@Body() id:string,comment:string){
    return this.collegeService.createComment(id,comment)
  }


}
