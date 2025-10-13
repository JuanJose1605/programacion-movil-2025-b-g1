-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('activo', 'inactivo');

-- CreateEnum
CREATE TYPE "EstadoPedido" AS ENUM ('pendiente', 'entregado');

-- CreateTable
CREATE TABLE "Roles" (
    "id_rol" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "id_rol" INTEGER,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'activo',
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Productos" (
    "id_producto" SERIAL NOT NULL,
    "id_categoria" INTEGER,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(65,30) NOT NULL,
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'activo',

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id_inventario" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id_pedido" SERIAL NOT NULL,
    "id_usuario" INTEGER,
    "fecha_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(65,30),
    "metodo_pago" TEXT,
    "direccion_envio" TEXT,
    "estado" "EstadoPedido" NOT NULL DEFAULT 'pendiente',

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "PedidoDetalle" (
    "id_detalle" SERIAL NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "subtotal" DECIMAL(65,30),

    CONSTRAINT "PedidoDetalle_pkey" PRIMARY KEY ("id_detalle")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_username_key" ON "Usuarios"("username");

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "Roles"("id_rol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id_categoria") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoDetalle" ADD CONSTRAINT "PedidoDetalle_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedidos"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoDetalle" ADD CONSTRAINT "PedidoDetalle_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;
