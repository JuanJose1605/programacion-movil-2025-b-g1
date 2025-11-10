import { IsDate, IsNumber, IsString } from "class-validator";

export class CreatePedidoDto {
    @IsString()
    id_usuario: string;

    @IsDate()
    fecha_pedido: Date;

    @IsNumber()
    total: number;
    
    @IsString()
    direccion_envio: string;

}
