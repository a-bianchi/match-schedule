import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchesDocument = Matches & Document;

export type Players = {
  name: string;
  phone?: number;
  attend?: boolean;
};

@Schema({ timestamps: true })
export class Matches {
  @Prop()
  user_id: string;

  @Prop({
    required: true,
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
  headlines: Players[];

  @Prop()
  note: string;

  @Prop()
  security_code: string;

  @Prop()
  created_at: Date;

  @Prop()
  update_at: Date;
}

export const MatchesSchema = SchemaFactory.createForClass(Matches);
