/*
  Warnings:

  - You are about to drop the column `referenced_display_column_id` on the `column_relation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `column_relation` DROP FOREIGN KEY `fk_cr_referenced_display_column_id`;

-- AlterTable
ALTER TABLE `column_relation` DROP COLUMN `referenced_display_column_id`;

-- AlterTable
ALTER TABLE `database_table` ADD COLUMN `display_column_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `database_table` ADD CONSTRAINT `fk_dt_display_column_id` FOREIGN KEY (`display_column_id`) REFERENCES `database_table_column`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `ui_name` ON `database_table`(`name`);
DROP INDEX `database_table_name_key` ON `database_table`;
