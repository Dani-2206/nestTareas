import { IsInt, IsString, MinLength } from "class-validator";
    
export class CreateTareaDto {

    @IsString({ message: "El título debe ser una cadena de caracteres" })
    @MinLength(3, { message: "El título debe tener al menos 3 caracteres" })
    titulo: string

    @IsString({ message: "La descripción debe ser una cadena de caracteres" })
    @MinLength(3, { message: "La descripción debe tener al menos 3 caracteres" })
    descripcion: string 

    @IsString({ message: "El estado debe ser una cadena de caracteres" })
    @MinLength(3, { message: "El estado debe tener al menos 3 caracteres" })
    estado: string

    @IsInt({ message: "El idUsuario debe ser un número entero" })
    idUsuario: number 
}