import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'OK';
const statusCode = HttpStatus.OK;

export class DefaultOKDtoOut {
  @ApiProperty({ default: message })
  message: string = message;

  @ApiProperty({ default: statusCode })
  statusCode: number = statusCode;
}
