import { IsNumber, IsString } from "class-validator";

export class CreateProductoDto {


    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;    

    @IsString()
    precio: string;

    @IsString()
    stock: string;

}
