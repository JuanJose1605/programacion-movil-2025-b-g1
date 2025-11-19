import { IsDate, IsNumber, IsString } from "class-validator";

export class CreatePedidoDto {
    id_usuario: string;
  direccion_envio: string;
  total: number;
  carrito: any[]; 
}
