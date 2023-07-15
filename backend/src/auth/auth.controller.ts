import {
  Controller,
  Body,
  Post,
  Get,
  Req,
  HttpException,
  InternalServerErrorException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestWithUser } from './request-with-user.interface';
import { Public } from './public.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { LoginDtoIn } from './dto.in/login.dto.in';
import { SignUpDtoIn } from './dto.in/sign-up.dto.in';
import { AccessTokenDtoOut } from './dto.out/login.ok.dto.out';
import { GetMeDtoOut } from './dto.out/get-me.dto.out';
import { SignUpOKDtoOut } from './dto.out/sign-up.ok.dto';
import {
  DefaultUnauthorizedDtoOut,
  Unauthorized,
} from '../common/dto.out/default.401.dto.out';
import { LoginFailed, LoginFailedDtoOut } from './dto.out/login.failed.dto';
import { SignUpFailed, SignUpFailedDtoOut } from './dto.out/sign-up.failed.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-up')
  @ApiCreatedResponse({ type: SignUpOKDtoOut })
  @ApiBadRequestResponse({ type: SignUpFailedDtoOut })
  async signUp(@Body() signUpDto: SignUpDtoIn) {
    const insertResult = await this.authService.signUp(signUpDto);
    if (!insertResult) {
      throw new HttpException(...SignUpFailed());
    }
    if (!insertResult.identifiers[0]?.id) {
      throw new InternalServerErrorException();
    }
    return new SignUpOKDtoOut(insertResult);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AccessTokenDtoOut })
  @ApiBadRequestResponse({ type: LoginFailedDtoOut })
  async login(@Body() loginDto: LoginDtoIn) {
    const accessToken = await this.authService.login(loginDto);
    if (!accessToken) {
      throw new HttpException(...LoginFailed());
    }
    return new AccessTokenDtoOut(accessToken);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetMeDtoOut })
  @ApiUnauthorizedResponse({ type: DefaultUnauthorizedDtoOut })
  async getMe(@Req() request: RequestWithUser) {
    const user = await this.authService.getMe(request.user.sub);
    if (!user) {
      throw new HttpException(...Unauthorized());
    }
    return new GetMeDtoOut(user);
  }
}
