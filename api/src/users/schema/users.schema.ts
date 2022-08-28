import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  user_id: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  hash: string;

  @Prop()
  hashrt: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 3 })
  available_matches: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
