import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/interfaces/users.interface';
import { v4 as uuid } from 'uuid';

export type RoomDocument = Room & mongoose.Document;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  users: string[];

  @Prop({ required: true })
  tags: string[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
