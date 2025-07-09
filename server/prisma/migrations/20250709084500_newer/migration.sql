/*
  Warnings:

  - You are about to drop the column `planned_date` on the `itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `retreat_id` on the `itinerary` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `itinerary` DROP FOREIGN KEY `Itinerary_retreat_id_fkey`;

-- DropIndex
DROP INDEX `Itinerary_retreat_id_fkey` ON `itinerary`;

-- AlterTable
ALTER TABLE `itinerary` DROP COLUMN `planned_date`,
    DROP COLUMN `retreat_id`,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `ItineraryItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itinerary_Id` INTEGER NOT NULL,
    `retreat_id` INTEGER NOT NULL,
    `planned_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItineraryItem` ADD CONSTRAINT `ItineraryItem_retreat_id_fkey` FOREIGN KEY (`retreat_id`) REFERENCES `Retreat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryItem` ADD CONSTRAINT `ItineraryItem_itinerary_Id_fkey` FOREIGN KEY (`itinerary_Id`) REFERENCES `Itinerary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
