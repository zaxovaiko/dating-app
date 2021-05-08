import * as mongoose from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Information } from "src/information/schemas/information.schema";

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;
  
  @Prop({ required: true })
  lastName: string;
  
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  avatar: string;
  
  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  completeSignup: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Information'})
  information: Information
}

export const UserSchema = SchemaFactory.createForClass(User);