-- CreateTable
CREATE TABLE `SavedRetreat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `retreatId` INTEGER NOT NULL,

    UNIQUE INDEX `SavedRetreat_userId_retreatId_key`(`userId`, `retreatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SavedRetreat` ADD CONSTRAINT `SavedRetreat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedRetreat` ADD CONSTRAINT `SavedRetreat_retreatId_fkey` FOREIGN KEY (`retreatId`) REFERENCES `Retreat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
