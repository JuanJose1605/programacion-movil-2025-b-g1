import { IsNumber, IsString } from "class-validator";

export class CreateProductoDto {
    @IsNumber()
    id_categoria: number;

    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;    

    @IsNumber()
    precio: number;

}
