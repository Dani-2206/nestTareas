import { IsEmail, IsInt, IsString, Min, min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({ message: "Debe ser una cadena de caracteres" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    nombre: string

    @IsString({ message: "Debe ser una cadena de caracteres" })
    @MinLength(3, { message: "El apellido debe tener al menos 3 caracteres" })
    apellido: string

    @IsEmail(undefined, { message: 'Debe ser un formato de email válido (ej: user@dominio.com).' })
    @MinLength(3, { message: "El email debe tener al menos 3 caracteres" })
    email: string

    @IsInt({ message: "Debe ser un número entero" })
    @Min(10, { message: "La edad mínima es 10" })
    edad: number

    @IsString({ message: "Debe ser una cadena de caracteres" })
    @MinLength(3, { message: "El username debe tener al menos 3 caracteres" })
    username: string

    @IsString({ message: "Debe ser una cadena de caracteres" })
    @MinLength(3, { message: "El password debe tener al menos 3 caracteres" })
    password: string

}
