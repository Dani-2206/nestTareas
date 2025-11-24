import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTareaDto } from './tareas/dto/create-tarea.dto';

@Injectable()
export class AppService {
  constructor (private prismaService:PrismaService){}

  async buscarTodos(){
    const datos = await this.prismaService.tareas.findMany();
    return datos;
  }


  async buscarPorUsuario(username:string){
    const datos = await this.prismaService.usuarios.findUnique({
      where:{
        username:username
      }
    });
    if(!datos){
      throw new Error ("Usuario no encontrado")
    }

    const buscarTareas= await this.prismaService.tareas.findMany({
      where:{
        idUsuario:datos.id
      }
    });

    return buscarTareas;
  }



  async crearTarea(datos:CreateTareaDto){

    const nuevaTarea=await this.prismaService.tareas.create({
      data:{
        titulo:datos.titulo,
        descripcion:datos.descripcion,
        estado:datos.estado,
        idUsuario:datos.idUsuario
      }
    })

    if(!nuevaTarea){
      throw new Error ("No se pudo crear la tarea")
    }
    return nuevaTarea;
    
  }


  async actualizarTarea(id:number, datos:CreateTareaDto){
    const tareaActualizar= await this.prismaService.tareas.update({
      where:{
        id:id
      },
      data:{
        titulo:datos.titulo,
        descripcion:datos.descripcion,
        estado:datos.estado,
      }
    });

    return tareaActualizar;
  
  }

  async eliminarTarea(id:number){
    const tareaEliminada= await this.prismaService.tareas.delete({
      where:{
        id:id
      }
    });
    
    return tareaEliminada;
  }
}
