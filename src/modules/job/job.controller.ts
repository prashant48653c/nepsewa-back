import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { JobService } from './job.service';
 
import { JobDto } from './dto/job.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}


  @Post('create')
 async create(@Body() jobDto: JobDto) {
    console.log(jobDto)
    return await this.jobService.create(jobDto);
  }

  @Get()
async  findAll() {
    return await this.jobService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    return await this.jobService.findOne(id);
  }

 
}
