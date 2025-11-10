import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { InventarioModule } from './inventario/inventario.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PedidoDetallesModule } from './pedido-detalles/pedido-detalles.module';

@Module({
  imports: [UsuariosModule, CategoriasModule, ProductosModule, InventarioModule, PedidosModule, PedidoDetallesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
