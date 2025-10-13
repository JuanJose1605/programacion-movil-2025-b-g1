import { IsNumber } from "class-validator";

export class CreateInventarioDto {
    @IsNumber()
    id_producto: number;

    @IsNumber()
    stock: number;

}
