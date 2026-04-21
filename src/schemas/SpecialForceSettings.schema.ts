import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SpecialForceSettings {
  @Prop({ required: false, default: true })
  receiveNotifications?: boolean;

  @Prop({ required: false, default: true })
  receiveEmails?: boolean;

  @Prop({ required: false, default: true })
  receiveSMS?: boolean;
}

export const SpecialForceSettingsSchema =
  SchemaFactory.createForClass(SpecialForceSettings);
