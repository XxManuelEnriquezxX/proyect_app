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

    UNIQUE INDEX `usuarios_nombreUsuario_key`(`nombreUsuario`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(64) NOT NULL,
    `descripcion` TEXT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_grupo` (
    `id` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `grupoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `usuario_grupo_usuarioId_grupoId_key`(`usuarioId`, `grupoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grupos` ADD CONSTRAINT `grupos_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_grupo` ADD CONSTRAINT `usuario_grupo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_grupo` ADD CONSTRAINT `usuario_grupo_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `grupos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
