import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
//   UseGuards,
} from '@nestjs/common';
import { CreateSpecialForceDto } from './dto/create-special-force.dto';
import { UpdateSpecialForceDto } from './dto/update-special-force.dto';
import { SpecialForcesService } from './special-forces.service';
// import { CombatGuard } from 'src/combat/combat.guard';

@Controller('special-forces')
// @UseGuards(CombatGuard) //protect all special forces routes
export class SpecialForcesController {
  constructor(private readonly specialForcesService: SpecialForcesService) {}
  @Get()
  getSpecialForces(
    @Query('weapon') weapon: 'knife' | 'gun' | 'stars' | 'nunchucks',
  ) {
    // const service = new SpecialForcesService();
    return this.specialForcesService.getSpecialForces(weapon);
  }

  @Get(':id')
  getOneSpecialForce(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.specialForcesService.getSpecialForce(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post()
  //   @UseGuards(CombatGuard) // protecting a specific route
  createSpecialForce(
    @Body(new ValidationPipe()) createSpecialForceDto: CreateSpecialForceDto,
  ) {
    return this.specialForcesService.createSpecialForce(createSpecialForceDto);
  }

  @Put(':id')
  updateSpecialForce(
    @Param('id') id: string,
    @Body() updateSpecialForceDto: UpdateSpecialForceDto,
  ) {
    return this.specialForcesService.updateSpecialForce(
      +id,
      updateSpecialForceDto,
    );
  }

  @Delete(':id')
  removeSpecialForce(@Param('id') id: string) {
    return this.specialForcesService.removeSpecialForce(+id);
  }
}
