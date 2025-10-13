import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class RolesService extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect();
  }

  create(createRoleDto: CreateRoleDto) {
    return this.roles.create({ data: createRoleDto });
  }

  findOne(id: number) {
    return this.roles.findUnique({ where: { id_rol: id } });
  }

  remove(id: number) {
    return this.roles.delete({ where: { id_rol: id } });
  }
}
