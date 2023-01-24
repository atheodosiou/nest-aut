import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Validator } from 'mongoose';

export type AppDocument = App & Document;

@Schema({
  timestamps: true,
  collection: 'App',
})
export class App {
  @Prop({ type: String, required: true, unique: true, minlength: 4 })
  name: string;

  @Prop({
    type: String,
    required: true,
    validate: {
      validator: (value) => isUrl(value),
      message: (props) => `${props.value} is not a valid url!`,
    },
  })
  successRedirectUri: string;

  @Prop({
    type: String,
    required: true,
    validate: {
      validator: (value) => isUrl(value),
      message: (props) => `${props.value} is not a valid url!`,
    },
  })
  failRedirectUri: string;
}

const isUrl = (value) => {
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
    value,
  );
};

export const AppSchema = SchemaFactory.createForClass(App);
