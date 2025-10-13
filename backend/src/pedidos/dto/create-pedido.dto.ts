import { IsDate, IsNumber, IsString } from "class-validator";

export class CreatePedidoDto {
    @IsNumber()
    id_usuario: number;

    @IsDate()
    fecha_pedido: Date;

    @IsNumber()
    total: number;
    
    @IsString()
    direccion_envio: string;

}
