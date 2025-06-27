-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `profile_picture` VARCHAR(191) NOT NULL DEFAULT 'default.png',
    `password_hash` VARCHAR(191) NOT NULL,
    `member_since` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `last_login` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
