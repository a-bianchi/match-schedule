import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({
    required: true,
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

  @Prop({ default: Date.now })
  created_at: string;

  @Prop()
  updated_at: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
