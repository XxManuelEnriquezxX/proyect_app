/*
  Warnings:

  - Added the required column `nombreUsuario` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suscripto` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `nombreUsuario` VARCHAR(64) NOT NULL,
    ADD COLUMN `suscripto` BOOLEAN NOT NULL;
