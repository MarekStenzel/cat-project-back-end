import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService,
              private authService: AuthService) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);
    return {user, token};
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.userService.showAll();
  }
}
