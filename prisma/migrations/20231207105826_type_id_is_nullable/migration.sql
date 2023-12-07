-- DropForeignKey
ALTER TABLE `types` DROP FOREIGN KEY `fk_type_table_id`;

-- AlterTable
ALTER TABLE `types` MODIFY `table_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `types` ADD CONSTRAINT `fk_type_table_id` FOREIGN KEY (`table_id`) REFERENCES `database_table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
