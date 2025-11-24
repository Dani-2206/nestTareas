import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TareasService {
  constructor(private prismaService: PrismaService) { }

  async create(idUsuario: number, createTareaDto: CreateTareaDto) {
    try {
      const tarea = await this.prismaService.tareas.create({
        data: {
          titulo: createTareaDto.titulo,
          descripcion: createTareaDto.descripcion,
          estado: createTareaDto.estado || "pendiente",
          idUsuario: idUsuario
        }
      });
      return tarea;
    } catch (error) {
      // En un entorno real, manejar errores específicos de Prisma
      throw new Error("Error al crear la tarea");
    }
  }

  // Método adaptado para obtener solo las tareas del usuario logeado
  async findAll(idUsuario: number) {
    const tareas = await this.prismaService.tareas.findMany({
      where: {
        idUsuario: idUsuario
      }
    });
    return {
      message: `Se encontraron ${tareas.length} tareas para el usuario ${idUsuario}`,
      data: tareas
    };
  }


  async findOne(id: number, idUsuario: number) {
    const tarea = await this.prismaService.tareas.findFirst({
      where: {
        id: id,
        idUsuario: idUsuario // Asegura que la tarea pertenezca al usuario
      }
    });

    if (!tarea) {
      // Usamos NotFoundException si no existe o no pertenece al usuario
      throw new NotFoundException(`Tarea con ID ${id} no encontrada o no pertenece al usuario.`);
    }

    return {
      message: `Tarea con ID ${id} encontrada exitosamente`,
      data: tarea
    };
  }

  async update(id: number, idUsuario: number, updateTareaDto: UpdateTareaDto) {
    // 1. Verificar si la tarea existe y pertenece al usuario
    const tareaExistente = await this.prismaService.tareas.findFirst({
      where: {
        id: id,
        idUsuario: idUsuario,
      },
    });

    if (!tareaExistente) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada o no pertenece al usuario.`);
    }

    // 2. Actualizar la tarea
    const tareaActualizada = await this.prismaService.tareas.update({
      where: {
        id: id,
        idUsuario: idUsuario // Doble check para la seguridad
      },
      data: updateTareaDto,
    });

    return {
      message: `Tarea con ID ${id} actualizada exitosamente`,
      data: tareaActualizada
    };
  }

  async remove(id: number, idUsuario: number) {
    // 1. Verificar si la tarea existe y pertenece al usuario antes de intentar eliminar
    const tareaExistente = await this.prismaService.tareas.findFirst({
      where: {
        id: id,
        idUsuario: idUsuario,
      },
    });

    if (!tareaExistente) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada o no pertenece al usuario.`);
    }

    // 2. Eliminar la tarea
    await this.prismaService.tareas.delete({
      where: {
        id: id,
        idUsuario: idUsuario // Asegura que solo se eliminen tareas propias
      }
    });

    return {
      message: `Tarea con ID ${id} eliminada exitosamente`
    };
  }
}