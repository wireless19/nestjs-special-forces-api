import { Type } from 'class-transformer';
import {
  //  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  MinLength,
  ValidateNested
} from 'class-validator';

export class CreateSpecialForceSettingsDto {
  @IsOptional()
  @IsBoolean()
  receiveNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveEmails?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveSMS?: boolean;
}

export class CreateSpecialForceDto {
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  name: string;

  //   @IsEnum(['knife', 'gun', 'stars', 'nunchucks'], {
  //     message: 'Use correct weapon!',
  //   })
  //   weapon: 'knife' | 'gun' | 'stars' | 'nunchucks';

  // @IsEnum(['knife', 'gun', 'stars', 'nunchucks'], {
  //     message: 'Use correct weapon!',
  //   })
  @IsNotEmpty()
  @IsString()
  weapon: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSpecialForceSettingsDto)
  settings?: CreateSpecialForceSettingsDto;
}
