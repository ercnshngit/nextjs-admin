-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `fk_dbtc_input_type_id`;

-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `fk_dbtc_type_id`;

-- AlterTable
ALTER TABLE `database_table_column` MODIFY `type_id` INTEGER NULL,
    MODIFY `is_primary` BOOLEAN NULL DEFAULT false,
    MODIFY `is_required` BOOLEAN NULL DEFAULT false,
    MODIFY `is_unique` BOOLEAN NULL DEFAULT false,
    MODIFY `is_hidden` BOOLEAN NULL DEFAULT false,
    MODIFY `is_filterable` BOOLEAN NULL DEFAULT false,
    MODIFY `is_searchable` BOOLEAN NULL DEFAULT false,
    MODIFY `is_sortable` BOOLEAN NULL DEFAULT false,
    MODIFY `input_type_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_input_type_id` FOREIGN KEY (`input_type_id`) REFERENCES `data_type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_type_id` FOREIGN KEY (`type_id`) REFERENCES `data_type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
