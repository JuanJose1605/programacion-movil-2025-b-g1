-- DropForeignKey
ALTER TABLE "public"."PedidoDetalle" DROP CONSTRAINT "PedidoDetalle_id_pedido_fkey";

-- AlterTable
ALTER TABLE "Pedidos" ADD COLUMN     "carrito" JSONB;
