import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pwd: string): Promise<Partial<User>> {
    if (!username || !pwd)
      throw new BadRequestException('Email or password is missing');

    const existingUser = await this.usersService.getUserByEmail(username);
    if (!existingUser) throw new UnauthorizedException();

    const isOk = await compare(pwd, existingUser.password);

    if (!isOk) throw new UnauthorizedException();

    const { password, ...result } = existingUser;

    return result;
  }

  async signin(user: any): Promise<{ access_token: string }> {
    const { password, ...result } = user?._doc;
    const payload = { user: result, sub: result._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: CreateUserDto): Promise<User | undefined> {
    if (!user.email || !user.password)
      throw new BadRequestException('Email and password are required');

    const existingUser = await this.usersService.getUserByEmail(user.email);

    if (existingUser) throw new BadRequestException('Email already in use');

    const hashedPassword = await hash(user.password, 10);

    user.password = hashedPassword;

    const newUser = await this.usersService.createUser(user);

    if (!user)
      throw new HttpException('Signup faild', HttpStatus.INTERNAL_SERVER_ERROR);

    return newUser;
  }
}
