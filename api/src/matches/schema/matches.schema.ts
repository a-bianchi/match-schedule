import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchesDocument = Matches & Document;

@Schema({ timestamps: true })
export class Matches {
  @Prop()
  user_id: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  time: string;

  @Prop({
    required: true,
  })
  address: string;

  @Prop({
    default: 20,
  })
  maxHeadlines: number;

  @Prop([
    raw({
      name: { type: String, required: true },
      phone: { type: Number },
      attend: { type: Boolean, required: true, default: false },
    }),
  ])
  headlines: Record<string, any>[];

  @Prop()
  note: string;

  @Prop()
  security_code: string;
}

export const MatchesSchema = SchemaFactory.createForClass(Matches);
