import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { questionPrompt } from "src/constant/prompt";
import { QNA, QnaSchema } from "src/schemas/qna.schema";
import { User } from "src/schemas/user.schema";
import { useTextAi } from "src/utils/api";
import { QnaDto } from "./dto/qna.dto";


export class qnaService {
    constructor(
        @InjectModel(QNA.name) private qnaModel: Model<QNA>,
        @InjectModel(User.name) private userModel: Model<User>

    ) { }
    async handleQues() {
        const question = await useTextAi(questionPrompt)
        const newQues = new this.qnaModel({ question, answers: [] })
        await newQues.save()
        return newQues
    }



    async handleResponse(qnaDto: QnaDto) {

        const { answers, _id } = qnaDto
        let ques;
        console.log(qnaDto)
        const user = await this.userModel.findById(answers[0].userId);
 

        if (user) {
           
            if (answers) {
                ques = await this.qnaModel.findByIdAndUpdate(
                    _id,
                    { $push: { answers: answers[0] } },
                    { new: true }
                );
                await ques.save()
                console.log(ques)
            }




            return ques
        }
        
        return 'he'
    }


}