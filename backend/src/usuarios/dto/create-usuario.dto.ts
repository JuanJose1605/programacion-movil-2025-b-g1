import { IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsNumber()
    id_rol: number;

    @IsString()
    nombres: string;

    @IsString()
    apellidos?: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
}
