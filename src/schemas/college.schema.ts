import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document, Schema as MongooseSchema } from "mongoose";

export type CollegeDocument = College & Document

@Schema()
export class College {
    @Prop()
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Course' }], default: [] })
    courses: MongooseSchema.Types.ObjectId[];

    @Prop()
    desc: string;
    @Prop({ default: true })
    picture?: string[];
    @Prop()
    comments: string[]
}

export const CollegeSchema = SchemaFactory.createForClass(College)