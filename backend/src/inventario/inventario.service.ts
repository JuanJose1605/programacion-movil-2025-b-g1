import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class InventarioService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createInventarioDto: CreateInventarioDto) {
    return this.inventario.create({ data: createInventarioDto });
  }

  findAll() {
    return this.inventario.findMany();
  }

  findOne(id: number) {
    return this.inventario.findUnique({ where: { id_inventario: id } });  
  }

  update(id: number, updateInventarioDto: UpdateInventarioDto) {
    return this.inventario.update({
      where: { id_inventario: id },
      data: updateInventarioDto,
    });
  }

  remove(id: number) {
    return this.inventario.delete({ where: { id_inventario: id } });
  }
}
