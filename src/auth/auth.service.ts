import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/loginDto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private user: UsersService,
    private jwtService: JwtService
  ) { }



  async Login(login: LoginDto) {
    const user = await this.user.buscarUser(login.username);
    if (!user) {
      return {
        message: `Error Usuario con username ${login.username} no encontrado`
      }
    }


    const { username, password } = user;
    const pass=await bcrypt.compare(login.password, password);
    


    if (username !== login.username || pass== false) {
      return {
        message: `Error en las credenciales`
      }
    }



    const payload = {
      id: user.id,
      user: user.username,
      rol: user.rol,
      email: user.email,
    };
    const token = await this.jwtService.sign(payload);

    

    return {
      id:user.id,
      token,
      username,
      rol: user.rol,
    };
  }



  registro(usuarios: CreateUserDto) {

    const user = this.user.CrearUser(usuarios);

    return user;

  }
}
