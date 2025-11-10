import { IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    id_usuario: string;

    @IsString()
    nombres: string;

    @IsString()
    apellidos: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
}
