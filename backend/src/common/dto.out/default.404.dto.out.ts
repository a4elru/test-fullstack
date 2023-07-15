import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Not found';
const statusCode = HttpStatus.NOT_FOUND;

export class DefaultNotFoundDtoOut {
  @ApiProperty({ default: message })
  message: string = message;

  @ApiProperty({ default: statusCode })
  statusCode: number = statusCode;
}

export function NotFound(): [DefaultNotFoundDtoOut, number] {
  return [new DefaultNotFoundDtoOut(), statusCode];
}
