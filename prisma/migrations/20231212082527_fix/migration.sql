/*
  Warnings:

  - You are about to drop the `types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `block` DROP FOREIGN KEY `fk_bk_type_id`;

-- DropForeignKey
ALTER TABLE `column_relation` DROP FOREIGN KEY `fk_cr_relation_type_id`;

-- DropForeignKey
ALTER TABLE `component` DROP FOREIGN KEY `fk_comp_type_id`;

-- DropForeignKey
ALTER TABLE `crud_option` DROP FOREIGN KEY `fk_co_input_type_id`;

-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `fk_dbtc_input_type_id`;

-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `fk_menu_type_id`;

-- DropForeignKey
ALTER TABLE `prop` DROP FOREIGN KEY `prop_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `types` DROP FOREIGN KEY `fk_type_language_code`;

-- DropForeignKey
ALTER TABLE `types` DROP FOREIGN KEY `fk_type_table_id`;

-- DropTable
DROP TABLE `types`;

-- CreateTable
CREATE TABLE `type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `table_id` INTEGER NULL,
    `language_code` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_input_type_id` FOREIGN KEY (`input_type_id`) REFERENCES `type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `crud_option` ADD CONSTRAINT `fk_co_input_type_id` FOREIGN KEY (`input_type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `fk_cr_relation_type_id` FOREIGN KEY (`relation_type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type` ADD CONSTRAINT `fk_type_table_id` FOREIGN KEY (`table_id`) REFERENCES `database_table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type` ADD CONSTRAINT `fk_type_language_code` FOREIGN KEY (`language_code`) REFERENCES `language`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `fk_menu_type_id` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block` ADD CONSTRAINT `fk_bk_type_id` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component` ADD CONSTRAINT `fk_comp_type_id` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prop` ADD CONSTRAINT `prop_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
