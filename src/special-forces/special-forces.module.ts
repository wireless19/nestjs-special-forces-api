import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SpecialForce,
  SpecialForceSchema,
} from 'src/schemas/SpecialForce.schema';
import {
  SpecialForceSettings,
  SpecialForceSettingsSchema,
} from 'src/schemas/SpecialForceSettings.schema';
import { SpecialForcesController } from './special-forces.controller';
import { SpecialForcesService } from './special-forces.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SpecialForce.name,
        schema: SpecialForceSchema,
      },
      {
        name: SpecialForceSettings.name,
        schema: SpecialForceSettingsSchema,
      },
    ]),
  ],
  controllers: [SpecialForcesController],
  providers: [SpecialForcesService],
})
export class SpecialForcesModule {}
