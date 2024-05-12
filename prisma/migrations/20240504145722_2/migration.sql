/*
  Warnings:

  - You are about to drop the column `nama` on the `Divisi` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Gedung` table. All the data in the column will be lost.
  - You are about to alter the column `statusId` on the `Izin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `statusId` on the `Presensi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `name` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `StatusIzin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusPresensi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nama_divisi` to the `Divisi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_gedung` to the `Gedung` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_role` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Izin` DROP FOREIGN KEY `Izin_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `Presensi` DROP FOREIGN KEY `Presensi_statusId_fkey`;

-- AlterTable
ALTER TABLE `Divisi` DROP COLUMN `nama`,
    ADD COLUMN `nama_divisi` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Gedung` DROP COLUMN `nama`,
    ADD COLUMN `nama_gedung` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Izin` MODIFY `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `statusId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Presensi` MODIFY `statusId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `name`,
    ADD COLUMN `nama_role` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `StatusIzin`;

-- DropTable
DROP TABLE `StatusPresensi`;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Presensi` ADD CONSTRAINT `Presensi_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Izin` ADD CONSTRAINT `Izin_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
