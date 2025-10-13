import { Module } from '@nestjs/common';
import { PedidoDetallesService } from './pedido-detalles.service';
import { PedidoDetallesController } from './pedido-detalles.controller';

@Module({
  controllers: [PedidoDetallesController],
  providers: [PedidoDetallesService],
})
export class PedidoDetallesModule {}
