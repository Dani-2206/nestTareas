import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import bcrypt from 'node_modules/bcryptjs';
import { Role } from 'src/auth/enum/role.enum';
import { Roles } from 'src/auth/decorators/Role.decorator';

@Injectable()
export class UsersService {

  constructor (private prisma:PrismaService) {}

  async CrearUser(user : CreateUserDto){
    try{  
      const {nombre,apellido,email,edad,username,password} =user;

      const passHash =await  bcrypt.hash(password,10);

      const datos = await this.prisma.usuarios.create({
        data:{
          nombre,
          apellido,
          email,
          edad,
          username,
          password:passHash
        }
      })

      return{
        message:`Se creao correcteamente el usuario ${username}`,
        data:datos
      }
      

    }catch(e){
      return {
        error:`Error encontrado ${e}, se debe a un error en la creacion de usuarios`
      }
    }
  }

  async buscarUser(user:string){
    const datos = await this.prisma.usuarios.findUnique({
      where:{
        username:user
      }
    });

    if(!datos){
      return null
    }

    return datos;
  }

  async EditarUser(user:UpdateUserDto){
    const datos = await this.prisma.usuarios.update({
      where:{
        username:user.username
        },
        data:user
      }
    )

    if(!datos){
      return {
        message:`No se encontro el usuario ${user.username} para actualizar`
      }
    }

    return{
      message:`Se actualizo correctamente el usuario ${user.username}`,
    }

  }

  @Roles(Role.ADMIN)
  async EliminarUser(username:string){  
    const datos = await this.prisma.usuarios.delete({
      where:{
        username:username
      }
    })
  }
}
