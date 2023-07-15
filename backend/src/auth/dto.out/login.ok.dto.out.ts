import { DefaultOKDtoOut } from '../../common/dto.out/default.200.dto.out';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Login completed successfully';

class AccessTokenResultDtoOut {
  @ApiProperty({ example: 'ACCESS_TOKEN' })
  access_token: string;

  constructor(accessToken: string) {
    this.access_token = accessToken;
  }
}

export class AccessTokenDtoOut extends DefaultOKDtoOut {
  @ApiProperty({ default: message })
  message: string = message;

  @ApiProperty({ type: AccessTokenResultDtoOut })
  result: AccessTokenResultDtoOut;

  constructor(accessToken: string) {
    super();
    this.result = new AccessTokenResultDtoOut(accessToken);
  }
}
