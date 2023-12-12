-- RedefineIndex
CREATE UNIQUE INDEX `ui_name` ON `database_table`(`name`);
DROP INDEX `database_table_name_key` ON `database_table`;
