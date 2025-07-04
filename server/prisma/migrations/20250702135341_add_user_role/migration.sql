/*
  Warnings:

  - You are about to drop the column `duration_days` on the `retreat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `retreat` DROP COLUMN `duration_days`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RetreatCategories` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RetreatCategories_AB_unique`(`A`, `B`),
    INDEX `_RetreatCategories_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RetreatCategories` ADD CONSTRAINT `_RetreatCategories_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RetreatCategories` ADD CONSTRAINT `_RetreatCategories_B_fkey` FOREIGN KEY (`B`) REFERENCES `Retreat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
