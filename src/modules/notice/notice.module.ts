// src/notice/notice.module.ts
import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from '../../schemas/notice.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
    ],
    controllers: [NoticeController],
    providers: [NoticeService],
})
export class NoticeModule { }
