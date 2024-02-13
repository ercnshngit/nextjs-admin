-- DropIndex
DROP INDEX `type_table_id_name_key` ON `type`;

-- AlterTable
ALTER TABLE `database_table` ADD COLUMN `can_delete` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `can_translate` BOOLEAN NULL DEFAULT false;
