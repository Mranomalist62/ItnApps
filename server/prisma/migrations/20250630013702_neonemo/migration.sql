-- CreateTable
CREATE TABLE `Destination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `main_image_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Retreat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `destination_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `duration_days` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price_usd` DECIMAL(10, 2) NOT NULL,
    `cover_image_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RetreatImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(191) NOT NULL,
    `retreat_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Retreat` ADD CONSTRAINT `Retreat_destination_id_fkey` FOREIGN KEY (`destination_id`) REFERENCES `Destination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RetreatImage` ADD CONSTRAINT `RetreatImage_retreat_id_fkey` FOREIGN KEY (`retreat_id`) REFERENCES `Retreat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
