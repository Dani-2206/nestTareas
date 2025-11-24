import { Controller, Get, Post, Body,UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/loginDto';
import { AuthGuard } from './guard/auth-guard.guard';
import { RolGuard } from './guard/rol.guard';
import { Roles } from './decorators/Role.decorator';
import { Role } from './enum/role.enum';




@Controller('auth')
export class AuthController {
  constructor(private servicio :AuthService){}

  @Post('login')
  login(@Body() user:LoginDto){
    return this.servicio.Login(user)
  }

  @Post('registro')
  registro(@Body() user:CreateUserDto){
    return this.servicio.registro(user);

  }
  
  @Get('profile')
  @Roles(Role.USER)
  @UseGuards(AuthGuard,RolGuard)
  getProfile(@Request() req) {
    return req.user;
   
  }
}