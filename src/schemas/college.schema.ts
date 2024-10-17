import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type CollegeDocument= College & Document

@Schema()
export class College{
    @Prop()
    collegeName:string;
    @Prop()
    course:string[];
    @Prop()
    desc:string;
    @Prop({default:true})
    picture?:string[];
    @Prop()
    comments:string[]
}

export const CollegeSchema=SchemaFactory.createForClass(College)