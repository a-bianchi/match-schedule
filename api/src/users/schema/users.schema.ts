import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  user_id: string;

  @Prop()
  email: string;

  @Prop()
  hash: string;

  @Prop()
  hashrt: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  createdat: string;

  @Prop()
  updatedat: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
