/*
  Warnings:

  - You are about to drop the column `langueage_code` on the `types` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `types` DROP FOREIGN KEY `fk_type_language_code`;

-- AlterTable
ALTER TABLE `types` DROP COLUMN `langueage_code`,
    ADD COLUMN `language_code` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `types` ADD CONSTRAINT `fk_type_language_code` FOREIGN KEY (`language_code`) REFERENCES `language`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;
