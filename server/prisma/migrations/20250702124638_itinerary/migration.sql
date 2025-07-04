-- CreateTable
CREATE TABLE `Itinerary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItineraryDay` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itineraryId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DayRetreat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `retreatId` INTEGER NOT NULL,
    `itineraryDayId` INTEGER NOT NULL,
    `timeOfDay` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Itinerary` ADD CONSTRAINT `Itinerary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryDay` ADD CONSTRAINT `ItineraryDay_itineraryId_fkey` FOREIGN KEY (`itineraryId`) REFERENCES `Itinerary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DayRetreat` ADD CONSTRAINT `DayRetreat_retreatId_fkey` FOREIGN KEY (`retreatId`) REFERENCES `Retreat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DayRetreat` ADD CONSTRAINT `DayRetreat_itineraryDayId_fkey` FOREIGN KEY (`itineraryDayId`) REFERENCES `ItineraryDay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
