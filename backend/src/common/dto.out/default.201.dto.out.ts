import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';

const message = 'Created';
const statusCode = HttpStatus.CREATED;

class DefaultCreatedResultDtoOut {
  @ApiProperty({ example: 1 })
  id: number;

  constructor(insertResult: InsertResult) {
    this.id = insertResult.identifiers[0].id;
  }
}

export class DefaultCreatedDtoOut {
  @ApiProperty({ default: message })
  message: string = message;

  @ApiProperty({ example: statusCode })
  statusCode: number = statusCode;

  @ApiProperty()
  result: DefaultCreatedResultDtoOut;

  constructor(insertResult: InsertResult) {
    this.result = new DefaultCreatedResultDtoOut(insertResult);
  }
}
