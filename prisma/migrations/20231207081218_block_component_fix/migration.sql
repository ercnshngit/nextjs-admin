/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `block_component` will be added. If there are existing duplicate values, this will fail.
  - Made the column `code` on table `block_component` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `block_component` MODIFY `code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `block_component_code_key` ON `block_component`(`code`);
