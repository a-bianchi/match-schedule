import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchesDocument = Matches & Document;

@Schema({ timestamps: true })
export class Matches {
  @Prop({
    required: true,
  })
  admin_user_id: string;

  @Prop({
    required: true,
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
    required: true,
  })
  max_headlines: number;

  @Prop({ default: 0 })
  max_substitutes: number;

  @Prop([
    raw({
      user_id: { type: String },
      attend: { type: Boolean },
    }),
  ])
  headlines: Record<string, any>[];

  @Prop([
    raw({
      user_id: { type: String },
      available: { type: Boolean },
    }),
  ])
  substitutes: Record<string, any>[];

  @Prop()
  note: string;

  @Prop({
    required: true,
  })
  password: string;
}

export const MatchesSchema = SchemaFactory.createForClass(Matches);
