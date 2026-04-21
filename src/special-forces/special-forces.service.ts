import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SpecialForce } from 'src/schemas/SpecialForce.schema';
import { SpecialForceSettings } from 'src/schemas/SpecialForceSettings.schema';
import { CreateSpecialForceDto } from './dto/create-special-force.dto';
import { UpdateSpecialForceDto } from './dto/update-special-force.dto';

@Injectable()
export class SpecialForcesService {
  constructor(
    @InjectModel(SpecialForce.name)
    private specialForceModel: Model<SpecialForce>,
    @InjectModel(SpecialForceSettings.name)
    private specialForceSettingsModel: Model<SpecialForceSettings>,
  ) {}

  async getSpecialForces(weapon: string) {
    if (weapon) {
      return this.specialForceModel
        .find({ weapon: weapon })
        .populate('settings');
    }
    return this.specialForceModel.find().populate('settings');
  }

  getSpecialForce(id: string) {
    return this.specialForceModel.findById(id).populate('settings');
  }

  async createSpecialForce({
    settings,
    ...createSpecialForceDto
  }: CreateSpecialForceDto) {
    // If settings exists → create it first
    if (settings) {
      const createdSettings =
        await this.specialForceSettingsModel.create(settings);

      return this.specialForceModel.findOneAndUpdate(
        { name: createSpecialForceDto.name },
        { $set: { settings: createdSettings._id } },
        {
          new: true,
        },
      );
    }

    // If no settings → just create normally
    return this.specialForceModel.create(createSpecialForceDto);
  }

  updateSpecialForce(id: string, updateSpecialForceDto: UpdateSpecialForceDto) {
    return this.specialForceModel.findByIdAndUpdate(id, updateSpecialForceDto, {
      new: true,
    });
  }

  removeSpecialForce(id: string) {
    return this.specialForceModel.findByIdAndDelete(id);
  }
}
