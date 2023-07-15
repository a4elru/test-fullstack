import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Forbidden';
const statusCode = HttpStatus.FORBIDDEN;

export class DefaultForbiddenDtoOut {
  @ApiProperty({ default: message })
  message: string = message;

  @ApiProperty({ default: statusCode })
  statusCode: number = statusCode;
}

export function Forbidden(): [DefaultForbiddenDtoOut, number] {
  return [new DefaultForbiddenDtoOut(), statusCode];
}
