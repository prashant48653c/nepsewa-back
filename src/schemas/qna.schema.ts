import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { userQues } from "src/constant/types";


@Schema()

export class QNA{
    @Prop()
    question:string;
    @Prop()
    answers:userQues[] | null;
   
}

export const QnaSchema=SchemaFactory.createForClass(QNA)