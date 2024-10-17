import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type CourseDocument= Course & Document

@Schema()
export class Course{
    @Prop()
    courseName:string;
    @Prop()
    collegeId:string;
    @Prop()
    seat:number;
    @Prop()
    shift:string;
    @Prop({default:true})
    isPaid:boolean;
}

export const CourseSchema=SchemaFactory.createForClass(Course)