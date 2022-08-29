import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvitationsDocument = Invitations & Document;

@Schema({ timestamps: true })
export class Invitations {
  @Prop({
    required: true,
  })
  user_id: string;

  @Prop({
    required: true,
  })
  match_id: string;

  @Prop({
    default: false,
  })
  accepted: boolean;

  @Prop()
  password: string;

  @Prop()
  short_url: string;
}

export const InvitationsSchema = SchemaFactory.createForClass(Invitations);
