import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { jwtConfig } from '../config';
import * as bcrypt from 'bcrypt';
import { InsertResult } from 'typeorm';
import { LoginDtoIn } from './dto.in/login.dto.in';
import { SignUpDtoIn } from './dto.in/sign-up.dto.in';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDtoIn): Promise<InsertResult | null> {
    const uniqueColumns = SignUpDtoIn.getUniqueColumns();
    const findOptions: any = {};
    for (const prop of uniqueColumns) {
      findOptions[prop] = (signUpDto as any)[prop];
    }
    const existingUser = await this.usersService.findOneUser(findOptions);
    if (existingUser) {
      return null;
    }
    signUpDto.password = await bcrypt.hash(
      signUpDto.password,
      jwtConfig.saltRounds,
    );
    const insertResult = await this.usersService.createUser(signUpDto);
    return insertResult;
  }

  async login(loginDto: LoginDtoIn): Promise<string | null> {
    const user = await this.usersService.findPasswordForOneUser({
      login: loginDto.login,
    });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      return null;
    }
    const payload = new JwtPayload(user.id);
    const accessToken = await this.jwtService.signAsync(payload.toPlainObj());
    return accessToken;
  }

  getMe(id: number) {
    return this.usersService.findOneUser({ id });
  }
}
