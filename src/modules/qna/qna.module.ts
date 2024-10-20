import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QNA, QnaSchema } from "src/schemas/qna.schema";
import { qnaService } from "./qna.service";
import { QnaController } from "./qna.controller";
import { User, USERSCHEMA } from "src/schemas/user.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: QNA.name, schema: QnaSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: USERSCHEMA }])

    ],
    controllers: [QnaController],
    providers: [qnaService]
})

export class QnaModule {}