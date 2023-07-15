import { DefaultBadRequestDtoOut } from '../../common/dto.out/default.400.dto.out';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Incorrect login or password';

export class LoginFailedDtoOut extends DefaultBadRequestDtoOut {
  @ApiProperty({ default: message })
  message: string = message;
}

export function LoginFailed(): [LoginFailedDtoOut, number] {
  const loginFailedDtoOut = new LoginFailedDtoOut();
  return [loginFailedDtoOut, loginFailedDtoOut.statusCode];
}
