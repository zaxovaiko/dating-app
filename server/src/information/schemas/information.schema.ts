import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

export type InformationDocument = Information & Document;

@Schema({ timestamps: true })
export class Information {
  @Prop(Date)
  birthDate: Date;

  @Prop()
  status: string;

  @Prop([String])
  hobbies: string[];

  @Prop([String])
  languages: string[];

  @Prop([String])
  images: string[];

  @Prop(
    raw({
      country: { type: String },
      city: { type: String },
      longitude: { type: Number },
      latitude: { type: Number },
    }),
  )
  location: Record<string, any>;
}

export const InformationSchema = SchemaFactory.createForClass(Information);
