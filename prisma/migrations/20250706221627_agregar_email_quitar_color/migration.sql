/*
  Warnings:

  - You are about to drop the column `color` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `email` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `color`,
    ADD COLUMN `email` VARCHAR(64) NOT NULL;
