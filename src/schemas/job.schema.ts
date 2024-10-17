    import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
    import { Document } from "mongoose";



    // export type JobDocument= Job & Document
    @Schema()  
    export class Job{
      
        @Prop()
        jobName:string;
        @Prop()
        eligibility:string;
        
        @Prop()
        desc:string;

        @Prop()
        type:string;

    }
    export const JobSchema=SchemaFactory.createForClass(Job)