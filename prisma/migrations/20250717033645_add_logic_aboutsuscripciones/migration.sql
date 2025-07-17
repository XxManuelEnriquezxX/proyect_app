-- CreateTable
CREATE TABLE `suscripciones` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(64) NOT NULL,
    `descripcion` TEXT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_subscription` (
    `id` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `suscripcionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `usuario_subscription_usuarioId_suscripcionId_key`(`usuarioId`, `suscripcionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `suscripciones` ADD CONSTRAINT `suscripciones_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_subscription` ADD CONSTRAINT `usuario_subscription_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_subscription` ADD CONSTRAINT `usuario_subscription_suscripcionId_fkey` FOREIGN KEY (`suscripcionId`) REFERENCES `suscripciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
