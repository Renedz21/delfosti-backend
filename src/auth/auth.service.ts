import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...data } = createUserDto;

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = this.userRepository.create({
        ...data,
        password: hash
      });

      await this.userRepository.save(newUser);
      delete newUser.password;

      return {
        ...newUser,
        token: this.getJwtToken({ email: newUser.email }),
      }

    } catch (error) {
      console.log(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {

      const { password, email } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: {
          email
        },
        select: { email: true, password: true }
      });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado')
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Contraseña incorrecta')
      }

      return {
        ...user,
        token: this.getJwtToken({ email: user.email }),
      }

    } catch (error) {
      console.log(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

}
