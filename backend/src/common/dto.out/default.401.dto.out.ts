import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Unauthorized';
const statusCode = HttpStatus.UNAUTHORIZED;

export class DefaultUnauthorizedDtoOut {
  @ApiProperty({ default: message })
  message: string = message;

  @ApiProperty({ default: statusCode })
  statusCode: number = statusCode;
}

export function Unauthorized(): [DefaultUnauthorizedDtoOut, number] {
  return [new DefaultUnauthorizedDtoOut(), statusCode];
}
