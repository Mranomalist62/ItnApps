/*
  Warnings:

  - You are about to drop the column `cover_image_url` on the `retreat` table. All the data in the column will be lost.
  - You are about to drop the `destination` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `retreat` DROP COLUMN `cover_image_url`;

-- DropTable
DROP TABLE `destination`;
