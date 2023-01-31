import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ParkingLocationDocument = ParkingLocation & Document;

@Schema({
  timestamps: true,
  collection: 'ParkingLocation',
})
export class ParkingLocation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({ type: String, required: true, default: 'My Vehicle' })
  vehicle: string;

  @Prop({ type: Date, required: true, default: new Date() })
  parkedAt: string;

  @Prop({ type: String })
  notes: string;

  @Prop({ type: Boolean, required: true, default: false })
  active: boolean;
}

export const ParkingLocationSchema =
  SchemaFactory.createForClass(ParkingLocation);
