import { Injectable } from '@nestjs/common';
import { CreateSpecialForceDto } from './dto/create-special-force.dto';
import { UpdateSpecialForceDto } from './dto/update-special-force.dto';

@Injectable()
export class SpecialForcesService {
  private specialForces = [
    { id: 1, name: 'Victor', weapon: 'knife' },
    { id: 2, name: 'Promise', weapon: 'gun' },
    { id: 3, name: 'Jude', weapon: 'stars' },
    { id: 4, name: 'Uturu', weapon: 'nunchucks' },
  ];

  getSpecialForces(weapon?: 'knife' | 'gun' | 'stars' | 'nunchucks') {
    if (weapon) {
      return this.specialForces.filter(
        (specialForce) => specialForce.weapon === weapon,
      );
    }
    return this.specialForces;
  }

  getSpecialForce(id: number) {
    const specialForce = this.specialForces.find(
      (specialForce) => specialForce.id === id,
    );
    if (!specialForce) {
      throw new Error('Special force NOT FOUND');
    }
    return specialForce;
  }

  createSpecialForce(createSpecialForceDto: CreateSpecialForceDto) {
    const newSpecialForce = { ...createSpecialForceDto, id: Date.now() };
    this.specialForces.push(newSpecialForce);
    return newSpecialForce;
  }

  updateSpecialForce(id: number, updateSpecialForceDto: UpdateSpecialForceDto) {
    this.specialForces = this.specialForces.map((specialForce) => {
      if (specialForce.id === id) {
        return { ...specialForce, ...updateSpecialForceDto };
      }
      return specialForce;
    });
    return this.getSpecialForce(id);
  }

  removeSpecialForce(id: number) {
    const toBeRemoved = this.getSpecialForce(id);
    this.specialForces = this.specialForces.filter(
      (specialForce) => specialForce.id !== id,
    );
    return toBeRemoved;
  }
}
