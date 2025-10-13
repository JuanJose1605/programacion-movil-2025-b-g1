import { IsInt, IsNumber } from "class-validator";

export class CreatePedidoDetalleDto {
    @IsNumber()
    id_pedido: number;
    @IsNumber()
    id_producto: number;
    @IsNumber()
    cantidad: number;
    @IsNumber()
    subtotal: number;

}
