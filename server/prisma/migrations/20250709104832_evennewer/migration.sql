-- DropForeignKey
ALTER TABLE `itineraryitem` DROP FOREIGN KEY `ItineraryItem_retreat_id_fkey`;

-- DropIndex
DROP INDEX `ItineraryItem_retreat_id_fkey` ON `itineraryitem`;

-- AlterTable
ALTER TABLE `itineraryitem` MODIFY `retreat_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ItineraryItem` ADD CONSTRAINT `ItineraryItem_retreat_id_fkey` FOREIGN KEY (`retreat_id`) REFERENCES `Retreat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
