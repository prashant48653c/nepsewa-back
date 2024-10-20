import { Body, Controller, Get, Post } from "@nestjs/common";
import { qnaService } from "./qna.service";
import { QnaDto } from "./dto/qna.dto";

@Controller('qna')
export class QnaController{
    constructor(
        private qnaService:qnaService
    ){}

    @Get()
    async handleQues(){
     return await this.qnaService.handleQues()
    }
    @Post()
    async handleResponse(@Body() qnaDto:QnaDto){
        return await this.qnaService.handleResponse(qnaDto)
       }

}