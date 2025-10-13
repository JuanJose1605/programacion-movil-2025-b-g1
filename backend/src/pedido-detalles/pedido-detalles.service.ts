import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePedidoDetalleDto } from './dto/create-pedido-detalle.dto';
import { UpdatePedidoDetalleDto } from './dto/update-pedido-detalle.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PedidoDetallesService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  } 
  create(createPedidoDetalleDto: CreatePedidoDetalleDto) {
    return this.pedidoDetalle.create({
      data: createPedidoDetalleDto
    });
  }

  findAll() {
    return this.pedidoDetalle.findMany();
  }

  findOne(id: number) {
    return this.pedidoDetalle.findUnique({
      where: { id_detalle: id }
    });
  }

  update(id: number, updatePedidoDetalleDto: UpdatePedidoDetalleDto) {
    return this.pedidoDetalle.update({
      where: { id_detalle: id },
      data: updatePedidoDetalleDto
    });
  }

  remove(id: number) {
    return this.pedidoDetalle.delete({
      where: { id_detalle: id }
    });
  }
}
