-- DropForeignKey
ALTER TABLE `block` DROP FOREIGN KEY `block_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `block_component` DROP FOREIGN KEY `block_component_belong_component_id_fkey`;

-- DropForeignKey
ALTER TABLE `block_component` DROP FOREIGN KEY `block_component_block_id_fkey`;

-- DropForeignKey
ALTER TABLE `block_component` DROP FOREIGN KEY `block_component_component_id_fkey`;

-- DropForeignKey
ALTER TABLE `block_component_prop` DROP FOREIGN KEY `block_component_prop_block_component_id_fkey`;

-- DropForeignKey
ALTER TABLE `block_component_prop` DROP FOREIGN KEY `block_component_prop_prop_id_fkey`;

-- DropForeignKey
ALTER TABLE `column_relation` DROP FOREIGN KEY `column_relation_column_id_fkey`;

-- DropForeignKey
ALTER TABLE `column_relation` DROP FOREIGN KEY `column_relation_pivot_table_id_fkey`;

-- DropForeignKey
ALTER TABLE `column_relation` DROP FOREIGN KEY `column_relation_referenced_column_id_fkey`;

-- DropForeignKey
ALTER TABLE `column_relation` DROP FOREIGN KEY `column_relation_referenced_table_id_fkey`;

-- DropForeignKey
ALTER TABLE `column_relation` DROP FOREIGN KEY `column_relation_relation_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `column_relation` DROP FOREIGN KEY `column_relation_table_id_fkey`;

-- DropForeignKey
ALTER TABLE `component` DROP FOREIGN KEY `component_tag_id_fkey`;

-- DropForeignKey
ALTER TABLE `component` DROP FOREIGN KEY `component_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `component_prop` DROP FOREIGN KEY `component_prop_component_id_fkey`;

-- DropForeignKey
ALTER TABLE `component_prop` DROP FOREIGN KEY `component_prop_prop_id_fkey`;

-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `database_table_column_create_crud_option_id_fkey`;

-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `database_table_column_input_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `database_table_column_read_crud_option_id_fkey`;

-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `database_table_column_table_id_fkey`;

-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `database_table_column_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `database_table_column` DROP FOREIGN KEY `database_table_column_update_crud_option_id_fkey`;

-- CreateTable
CREATE TABLE `translation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `translated_text` VARCHAR(191) NOT NULL,
    `language_id` INTEGER NOT NULL,

    UNIQUE INDEX `translation_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_table_id` FOREIGN KEY (`table_id`) REFERENCES `database_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_input_type_id` FOREIGN KEY (`input_type_id`) REFERENCES `data_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_type_id` FOREIGN KEY (`type_id`) REFERENCES `data_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_create_crud_option_id` FOREIGN KEY (`create_crud_option_id`) REFERENCES `crud_option`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_update_crud_option_id` FOREIGN KEY (`update_crud_option_id`) REFERENCES `crud_option`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_read_crud_option_id` FOREIGN KEY (`read_crud_option_id`) REFERENCES `crud_option`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `fk_cr_table_id` FOREIGN KEY (`table_id`) REFERENCES `database_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `fk_cr_referenced_table_id` FOREIGN KEY (`referenced_table_id`) REFERENCES `database_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `fk_cr_pivot_table_id` FOREIGN KEY (`pivot_table_id`) REFERENCES `database_table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `fk_cr_column_id` FOREIGN KEY (`column_id`) REFERENCES `database_table_column`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `fk_cr_referenced_column_id` FOREIGN KEY (`referenced_column_id`) REFERENCES `database_table_column`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `fk_cr_relation_type_id` FOREIGN KEY (`relation_type_id`) REFERENCES `data_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block` ADD CONSTRAINT `fk_bk_type_id` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component` ADD CONSTRAINT `fk_bcom_component_id` FOREIGN KEY (`component_id`) REFERENCES `component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component` ADD CONSTRAINT `fk_bcom_table_id` FOREIGN KEY (`block_id`) REFERENCES `block`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component` ADD CONSTRAINT `fk_bcom_belong_component_id` FOREIGN KEY (`belong_component_id`) REFERENCES `component`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component_prop` ADD CONSTRAINT `fk_bcomp_prop_id` FOREIGN KEY (`prop_id`) REFERENCES `prop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component_prop` ADD CONSTRAINT `fk_bcomp_block_component_id` FOREIGN KEY (`block_component_id`) REFERENCES `block_component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component` ADD CONSTRAINT `fk_comp_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component` ADD CONSTRAINT `fk_comp_type_id` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component_prop` ADD CONSTRAINT `fk_compp_component_id` FOREIGN KEY (`component_id`) REFERENCES `component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component_prop` ADD CONSTRAINT `fk_compp_prop_id` FOREIGN KEY (`prop_id`) REFERENCES `prop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `translation` ADD CONSTRAINT `fk_trs_language_id` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
