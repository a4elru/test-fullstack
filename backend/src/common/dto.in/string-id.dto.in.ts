import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StringIdDtoIn {
  @IsString()
  @Matches(/^\d+$/)
  @ApiProperty({ example: 1 })
  id: number;
}
