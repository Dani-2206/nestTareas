import { PartialType } from '@nestjs/mapped-types';
import { CreateTareaDto } from './create-tarea.dto';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTareaDto extends PartialType(CreateTareaDto) {
    @IsOptional()
    @IsString({ message: "El título debe ser una cadena de caracteres" })
    @MinLength(3, { message: "El título debe tener al menos 3 caracteres" })
    titulo?: string 

    @IsOptional()
    @IsString({ message: "La descripción debe ser una cadena de caracteres" })
    @MinLength(3, { message: "La descripción debe tener al menos 3 caracteres" })
    descripcion?: string 

    @IsOptional()
    @IsString({ message: "El estado debe ser una cadena de caracteres" })
    @MinLength(3, { message: "El estado debe tener al menos 3 caracteres" })
    estado?: string // Se hace opcional con '?'

    @IsOptional()
    @IsInt({ message: "El idUsuario debe ser un número entero" })
    idUsuario?: number // Se hace opcional con '?'
}
