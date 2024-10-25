import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NoticeDocument = Notice & Document;

@Schema()
export class Notice{
    @Prop()
    title:string;


    @Prop()
    desc:string;

    @Prop()
    type:string;


    @Prop()
    createdAt:string;

}

export const NoticeSchema=SchemaFactory.createForClass(Notice)