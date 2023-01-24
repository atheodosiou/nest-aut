import {
  Body,
  Controller, Get, Post, Request, UseGuards
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto)
    return this.authService.signup(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getUserProfile(@Request() req) {
    return req?.user;
  }
}
