/*
  Warnings:

  - You are about to drop the column `language_id` on the `translation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `language_code` to the `translation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `translation` DROP FOREIGN KEY `fk_trs_language_id`;

-- AlterTable
ALTER TABLE `translation` DROP COLUMN `language_id`,
    ADD COLUMN `language_code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `language_code_key` ON `language`(`code`);

-- AddForeignKey
ALTER TABLE `translation` ADD CONSTRAINT `fk_trs_language_code` FOREIGN KEY (`language_code`) REFERENCES `language`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
