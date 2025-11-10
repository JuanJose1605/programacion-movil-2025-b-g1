/*
  Warnings:

  - You are about to drop the column `estado` on the `Usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `id_rol` on the `Usuarios` table. All the data in the column will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Usuarios" DROP CONSTRAINT "Usuarios_id_rol_fkey";

-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "estado",
DROP COLUMN "id_rol";

-- DropTable
DROP TABLE "public"."Roles";
