/*
  Warnings:

  - You are about to drop the column `id_categoria` on the `Productos` table. All the data in the column will be lost.
  - You are about to drop the `Categorias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Inventario" DROP CONSTRAINT "Inventario_id_producto_fkey";

-- DropForeignKey
ALTER TABLE "public"."Productos" DROP CONSTRAINT "Productos_id_categoria_fkey";

-- AlterTable
ALTER TABLE "Productos" DROP COLUMN "id_categoria",
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "public"."Categorias";
