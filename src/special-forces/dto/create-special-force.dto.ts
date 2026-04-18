import { IsEnum, MinLength } from 'class-validator';

export class CreateSpecialForceDto {
  @MinLength(3)
  name: string;

  @IsEnum(['knife', 'gun', 'stars', 'nunchucks'], {
    message: 'Use correct weapon!',
  })
  weapon: 'knife' | 'gun' | 'stars' | 'nunchucks';
}
