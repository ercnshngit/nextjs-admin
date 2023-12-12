/*
  Warnings:

  - You are about to drop the column `type_id` on the `database_table_column` table. All the data in the column will be lost.
  - You are about to drop the `data_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `column_relation` DROP FOREIGN KEY `fk_cr_relation_type_id`;

-- DropForeignKey
ALTER TABLE `crud_option` DROP FOREIGN KEY `fk_co_input_type_id`;

-- DropForeignKey
ALTER TABLE `data_type` DROP FOREIGN KEY `fk_type_data_type_id`;

-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `fk_dbtc_input_type_id`;

-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `fk_dbtc_type_id`;

-- AlterTable
ALTER TABLE `database_table_column` DROP COLUMN `type_id`;

-- DropTable
DROP TABLE `data_type`;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_input_type_id` FOREIGN KEY (`input_type_id`) REFERENCES `types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `crud_option` ADD CONSTRAINT `fk_co_input_type_id` FOREIGN KEY (`input_type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `fk_cr_relation_type_id` FOREIGN KEY (`relation_type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
