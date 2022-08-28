import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchesDocument = Matches & Document;

@Schema()
export class Matches {
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
    required: true,
  })
  max_headlines: number;

  @Prop({ default: 0 })
  max_substitutes: number;

  @Prop(
    raw({
      user_id: { type: String },
      attend: { type: Boolean },
      created_at: { type: String, default: Date.now },
      updated_at: { type: String },
    }),
  )
  headlines: Record<string, any>[];

  @Prop(
    raw({
      user_id: { type: String },
      available: { type: Boolean },
      created_at: { type: String, default: Date.now },
      updated_at: { type: String },
    }),
  )
  substitutes: Record<string, any>[];

  @Prop()
  note: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ default: Date.now })
  created_at: string;

  @Prop()
  updated_at: string;
}

export const MatchesSchema = SchemaFactory.createForClass(Matches);
