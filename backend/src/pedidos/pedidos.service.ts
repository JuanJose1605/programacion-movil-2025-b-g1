import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PedidosService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  create(createPedidoDto: CreatePedidoDto) {
    return this.pedidos.create({
      data: createPedidoDto,
       
    })
  }

  findAll() {
    return this.pedidos.findMany({
      include: {
        usuario: true, // 🔹 aquí traemos los datos del usuario
      },
      orderBy: { fecha_pedido: 'desc' },
    });
  }

  findOne(id: number) {
    return this.pedidos.findUnique({
      where: { id_pedido: id },
      include: {
        usuario: true, // 🔹 aquí traemos los datos del usuario
      },
    });
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return this.pedidos.update({
      where: { id_pedido: id },
      data: updatePedidoDto,
    });
  }

  remove(id: number) {
    return this.pedidos.delete({
      where: { id_pedido: id },
    });
  }
}
