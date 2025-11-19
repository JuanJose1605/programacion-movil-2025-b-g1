import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { PrismaClient } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UsuariosService extends PrismaClient implements OnModuleInit {
  private readonly JWT = 'Token Inicial';

  async onModuleInit() {
    await this.$connect();
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
  const { id_usuario, username, password } = createUsuarioDto;

  // 🔍 1. Validar si existe un usuario con ese id_usuario o username
  const usuarioExiste = await this.usuarios.findFirst({
    where: {
      OR: [
        { id_usuario },
        { username }
      ]
    }
  });

  if (usuarioExiste) {
    throw new UnauthorizedException(
      'Ya existe un usuario con ese documento o nombre de usuario'
    );
  }

  // 🔐 2. Hashear la contraseña
  const passBy = await bcrypt.hash(password, 10);

  // 🟢 3. Crear usuario con contraseña encriptada
  return this.usuarios.create({
    data: {
      ...createUsuarioDto,
      password: passBy
    },
  });
}


  async login(username: string, password: string) {
    const usuario = await this.usuarios.findUnique({ where: { username } });
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');

    if (!usuario.password) {
      throw new UnauthorizedException('Contraseña no establecida');
    }
    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) throw new UnauthorizedException('Contraseña incorrecta');

    const token = jwt.sign(
      { sub: usuario.id_usuario, username: usuario.username },
      this.JWT,
      { expiresIn: '2h' }
    );
    const mensaje = 'Inicio de sesión exitoso';

    return { token, mensaje };
  }

  findAll() {
    return this.usuarios.findMany();
  }

  findOne(id: string) {
    return this.usuarios.findUnique({
      where: { id_usuario: id },
    });
  }

  remove(id: string) {
    return this.usuarios.delete({
      where: { id_usuario: id },
    });
  }
}
