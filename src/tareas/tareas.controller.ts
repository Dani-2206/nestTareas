import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { AuthGuard } from 'src/auth/guard/auth-guard.guard';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) { }

  @Post('CrearTarea')
  @UseGuards(AuthGuard)
  create(@Request() req: any, @Body() createTareaDto: CreateTareaDto) {
    console.log(req.user.id)
    return this.tareasService.create(req.user.id, createTareaDto);
  }

  // Nota: Se asume que findAll podría requerir el ID del usuario si solo debe mostrar las tareas del usuario logeado.
  // Sin embargo, si findAll debe obtener TODAS las tareas (lo cual es menos común con AuthGuard), se mantiene como estaba.
  @Get('/')
  @UseGuards(AuthGuard)
  findAll(@Request() req: any) {
    // Suponemos que queremos las tareas del usuario logeado
    return this.tareasService.findAll(req.user.id);
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    // Se utiliza ParseIntPipe para asegurar que :id es un número,
    // y se pasa el id de la tarea y el id del usuario para validación.
    return this.tareasService.findOne(id, req.user.id);
  }


  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTareaDto: UpdateTareaDto,
    @Request() req: any
  ) {
    
    return this.tareasService.update(id, req.user.id, updateTareaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any
  ) {
    
    return this.tareasService.remove(id, req.user.id);
  }
}