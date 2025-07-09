/*
  Warnings:

  - You are about to drop the column `price_usd` on the `retreat` table. All the data in the column will be lost.
  - Added the required column `planned_date` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retreat_id` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_idr` to the `Retreat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `itinerary` ADD COLUMN `planned_date` DATETIME(3) NOT NULL,
    ADD COLUMN `retreat_id` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `retreat` DROP COLUMN `price_usd`,
    ADD COLUMN `price_idr` DECIMAL(10, 2) NOT NULL;

-- AddForeignKey
ALTER TABLE `Itinerary` ADD CONSTRAINT `Itinerary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Itinerary` ADD CONSTRAINT `Itinerary_retreat_id_fkey` FOREIGN KEY (`retreat_id`) REFERENCES `Retreat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
