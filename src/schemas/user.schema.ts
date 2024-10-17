import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ResolveTimestamps, Document, Model } from 'mongoose';

@Schema({ timestamps: true })
export class User {
   
    @Prop({ type: String, trim: true, required: true, })
  username: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  

  @Prop({ type: String, required: [true, 'Password is required'] })
  password: string;

 
  _id:string;
  
  @Prop({ type: String,default:"http://localhost:4000/uploads/default.jpg" })
  profilePic:string;

  @Prop()
  education:string;

  @Prop({ type: String })
  refreshToken:string;

  @Prop({default:false})
  isAdmin:boolean;
}

export const USERSCHEMA = SchemaFactory.createForClass(User).index({
  isEmailVerified: 1,
});
export type UsersDocument = User &
  ResolveTimestamps<Document, { timestamps: true }>;
export type UsersModel = Model<UsersDocument>;