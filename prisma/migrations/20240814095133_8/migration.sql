/*
  Warnings:

  - You are about to drop the `LogActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `LogActivity` DROP FOREIGN KEY `LogActivity_userId_fkey`;

-- DropTable
DROP TABLE `LogActivity`;
