import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class ProductosService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  create(createProductoDto: CreateProductoDto) {
    return this.productos.create({
      data: {
        ...createProductoDto,
      },
    });
  }

  findAll() {
    return this.productos.findMany();
  }

  findOne(id: number) {
    return this.productos.findUnique({
      where: { id_producto: id },
    });
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return this.productos.update({
      where: { id_producto: id },
      data: { ...updateProductoDto },
    });
  }

  remove(id: number) {
    return this.productos.delete({
      where: { id_producto: id },
    });
  }
}
