import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  collection:'User'
})
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, minlength: 8 })
  password: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  profilePhoto: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'App' }], default: [] })
  applications: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
