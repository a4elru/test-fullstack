import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Bad request';
const statusCode = HttpStatus.BAD_REQUEST;

export class DefaultBadRequestDtoOut {
  @ApiProperty({ default: message })
  message: string = message;

  @ApiProperty({ default: statusCode })
  statusCode: number = statusCode;
}

export function BadRequest(): [DefaultBadRequestDtoOut, number] {
  return [new DefaultBadRequestDtoOut(), statusCode];
}
