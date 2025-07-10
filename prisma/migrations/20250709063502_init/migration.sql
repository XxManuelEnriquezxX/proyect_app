-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nombreUsuario` VARCHAR(64) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `apellidoPaterno` VARCHAR(64) NOT NULL,
    `apellidoMaterno` VARCHAR(64) NOT NULL,
    `suscripto` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
