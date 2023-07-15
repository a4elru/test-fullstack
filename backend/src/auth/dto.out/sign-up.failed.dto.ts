import { DefaultBadRequestDtoOut } from '../../common/dto.out/default.400.dto.out';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Login or username exists';

export class SignUpFailedDtoOut extends DefaultBadRequestDtoOut {
  @ApiProperty({ default: message })
  message: string = message;
}

export function SignUpFailed(): [SignUpFailedDtoOut, number] {
  const signUpFailedDtoOut = new SignUpFailedDtoOut();
  return [signUpFailedDtoOut, signUpFailedDtoOut.statusCode];
}
