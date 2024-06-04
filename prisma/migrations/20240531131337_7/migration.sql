/*
  Warnings:

  - You are about to drop the column `jamKeluar` on the `Presensi` table. All the data in the column will be lost.
  - You are about to drop the `Gedung` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Presensi` DROP COLUMN `jamKeluar`;

-- DropTable
DROP TABLE `Gedung`;

-- CreateTable
CREATE TABLE `Titik` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_titik` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `radius` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
