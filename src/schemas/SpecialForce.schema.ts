import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SpecialForceSettings } from './SpecialForceSettings.schema';
// import { Post } from './Post.schema';

@Schema()
export class SpecialForce {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  weapon: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SpecialForceSettings' })
  settings?: SpecialForceSettings;

  //   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  //   posts: Post[];
}

export const SpecialForceSchema = SchemaFactory.createForClass(SpecialForce);
