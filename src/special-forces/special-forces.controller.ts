import {
  Controller,
  Get,
  Post,
  //   Put,
  Delete,
  Param,
  Query,
  Body,
  //   NotFoundException,
  HttpException,
  //   ParseIntPipe,
  ValidationPipe,
  Patch,
  //   Req,
  UseGuards,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateSpecialForceDto } from './dto/create-special-force.dto';
import { UpdateSpecialForceDto } from './dto/update-special-force.dto';
import { SpecialForcesService } from './special-forces.service';
// import { CombatGuard } from 'src/combat/combat.guard';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@UseGuards(AuthenticationGuard, AuthorizationGuard) //protect all special forces routes
@Controller('special-forces')
export class SpecialForcesController {
  constructor(private readonly specialForcesService: SpecialForcesService) {}
  @Get()
  getSpecialForces(@Query('weapon') weapon: string) {
    // const service = new SpecialForcesService();
    return this.specialForcesService.getSpecialForces(weapon);
  }

  @Get(':id')
  async getOneSpecialForce(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Special Force not found', 404);
    const findSpecialForce =
      await this.specialForcesService.getSpecialForce(id);
    if (!findSpecialForce)
      throw new HttpException('Special Force not found', 404);
    return findSpecialForce;
  }

  @Post()
  //   @UseGuards(AuthenticationGuard) // protecting a specific route
  createSpecialForce(
    @Body(new ValidationPipe()) createSpecialForceDto: CreateSpecialForceDto,
  ) {
    return this.specialForcesService.createSpecialForce(createSpecialForceDto);
  }

  @Patch(':id')
  async updateSpecialForce(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateSpecialForceDto: UpdateSpecialForceDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updateSpecialForce =
      await this.specialForcesService.updateSpecialForce(
        id,
        updateSpecialForceDto,
      );
    if (!updateSpecialForce)
      throw new HttpException('Special Force not found', 404);
    return updateSpecialForce;
  }

  @Delete(':id')
  async removeSpecialForce(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedspecialForce =
      await this.specialForcesService.removeSpecialForce(id);
    if (!deletedspecialForce)
      throw new HttpException('Special Force Not Found', 404);
    return {
      success: true,
      message: 'Deleted successfully',
    };
  }
}
