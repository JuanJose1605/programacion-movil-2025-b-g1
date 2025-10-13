import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class CategoriasService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createCategoriaDto: CreateCategoriaDto) {
    return this.categorias.create({
      data: createCategoriaDto,
    });
  }

  findAll() {
    return this.categorias.findMany();
  }

  findOne(id: number) {
    return this.categorias.findUnique({
      where: { id_categoria: id },
    });
  }

  

  remove(id: number) {
    return this.categorias.delete({
      where: { id_categoria: id },
    });
  }
}
