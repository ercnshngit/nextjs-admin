-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `fk_dbtc_table_id`;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_table_id` FOREIGN KEY (`table_id`) REFERENCES `database_table`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
