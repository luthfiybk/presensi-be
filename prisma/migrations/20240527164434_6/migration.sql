/*
  Warnings:

  - You are about to alter the column `jamMasuk` on the `Presensi` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.
  - You are about to alter the column `jamKeluar` on the `Presensi` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.
  - Added the required column `time` to the `LogActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LogActivity` ADD COLUMN `time` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Presensi` MODIFY `jamMasuk` DATETIME(3) NOT NULL,
    MODIFY `jamKeluar` DATETIME(3) NULL;
