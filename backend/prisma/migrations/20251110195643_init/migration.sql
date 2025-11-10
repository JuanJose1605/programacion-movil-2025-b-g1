/*
  Warnings:

  - The primary key for the `Usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `id_usuario` on table `Pedidos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Pedidos" DROP CONSTRAINT "Pedidos_id_usuario_fkey";

-- AlterTable
ALTER TABLE "Pedidos" ALTER COLUMN "id_usuario" SET NOT NULL,
ALTER COLUMN "id_usuario" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Usuarios" DROP CONSTRAINT "Usuarios_pkey",
ALTER COLUMN "id_usuario" SET DATA TYPE TEXT,
ADD CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id_usuario");

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
