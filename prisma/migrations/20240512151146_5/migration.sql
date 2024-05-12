/*
  Warnings:

  - Added the required column `file` to the `Izin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_status` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Izin` ADD COLUMN `file` VARCHAR(191) NOT NULL,
    MODIFY `tanggal` DATE NOT NULL;

-- AlterTable
ALTER TABLE `Presensi` MODIFY `tanggal` DATE NOT NULL,
    MODIFY `jamMasuk` TIME NOT NULL,
    MODIFY `jamKeluar` TIME NULL;

-- AlterTable
ALTER TABLE `Status` ADD COLUMN `group_status` VARCHAR(191) NOT NULL;
