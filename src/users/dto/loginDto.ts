import { IsEmail, IsInt, IsString, Min, min, MinLength } from "class-validator";

export class LoginDto {
    @IsString({ message: "Debe ser una cadena de caracteres" })
    @MinLength(3, { message: "El username debe tener al menos 3 caracteres" })
    username: string

    @IsString({ message: "Debe ser una cadena de caracteres" })
    @MinLength(3, { message: "El password debe tener al menos 3 caracteres" })
    password: string

}
