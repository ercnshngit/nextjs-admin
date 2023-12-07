-- CreateTable
CREATE TABLE `database_table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `is_hidden` BOOLEAN NULL DEFAULT false,
    `can_create` BOOLEAN NULL DEFAULT false,
    `can_update` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `database_table_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `database_table_column` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `table_id` INTEGER NOT NULL,
    `type_id` INTEGER NULL,
    `is_primary` BOOLEAN NULL DEFAULT false,
    `is_required` BOOLEAN NULL DEFAULT false,
    `is_unique` BOOLEAN NULL DEFAULT false,
    `is_hidden` BOOLEAN NULL DEFAULT false,
    `is_filterable` BOOLEAN NULL DEFAULT false,
    `is_searchable` BOOLEAN NULL DEFAULT false,
    `is_sortable` BOOLEAN NULL DEFAULT false,
    `input_type_id` INTEGER NULL,
    `create_crud_option_id` INTEGER NULL,
    `update_crud_option_id` INTEGER NULL,
    `read_crud_option_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crud_option` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `is_hidden` BOOLEAN NOT NULL,
    `is_required` BOOLEAN NOT NULL,
    `is_readonly` BOOLEAN NOT NULL,
    `input_type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type_id` INTEGER NOT NULL,

    UNIQUE INDEX `data_type_name_type_id_key`(`name`, `type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `column_relation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_id` INTEGER NOT NULL,
    `referenced_table_id` INTEGER NOT NULL,
    `pivot_table_id` INTEGER NULL,
    `column_id` INTEGER NOT NULL,
    `referenced_column_id` INTEGER NOT NULL,
    `relation_type_id` INTEGER NOT NULL,
    `foreign_key_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `column_option` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `column_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `table_id` INTEGER NOT NULL,
    `langueage_code` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `route` TEXT NULL,
    `menu_belong_id` INTEGER NULL,
    `type_id` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `image` TEXT NULL,
    `href` TEXT NULL,
    `button` TEXT NULL,
    `language_code` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `block` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `block_component` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `component_id` INTEGER NOT NULL,
    `block_id` INTEGER NOT NULL,
    `belong_component_id` INTEGER NULL,
    `depth` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `hasChildren` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `block_component_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `block_component_prop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prop_id` INTEGER NOT NULL,
    `block_component_id` INTEGER NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `component` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `tag_id` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,
    `icon` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `component_prop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `component_id` INTEGER NOT NULL,
    `prop_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `translation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `translated_text` VARCHAR(191) NOT NULL,
    `language_code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `translation_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `language_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_table_id` FOREIGN KEY (`table_id`) REFERENCES `database_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_input_type_id` FOREIGN KEY (`input_type_id`) REFERENCES `data_type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_type_id` FOREIGN KEY (`type_id`) REFERENCES `data_type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_create_crud_option_id` FOREIGN KEY (`create_crud_option_id`) REFERENCES `crud_option`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_update_crud_option_id` FOREIGN KEY (`update_crud_option_id`) REFERENCES `crud_option`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `fk_dbtc_read_crud_option_id` FOREIGN KEY (`read_crud_option_id`) REFERENCES `crud_option`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `crud_option` ADD CONSTRAINT `fk_co_input_type_id` FOREIGN KEY (`input_type_id`) REFERENCES `data_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `data_type` ADD CONSTRAINT `fk_type_data_type_id` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `column_option` ADD CONSTRAINT `fk_coo_column_id` FOREIGN KEY (`column_id`) REFERENCES `database_table_column`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `types` ADD CONSTRAINT `fk_type_table_id` FOREIGN KEY (`table_id`) REFERENCES `database_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `types` ADD CONSTRAINT `fk_type_language_code` FOREIGN KEY (`langueage_code`) REFERENCES `language`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `fk_menu_belong_id` FOREIGN KEY (`menu_belong_id`) REFERENCES `menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `fk_menu_type_id` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `generals` ADD CONSTRAINT `fk_general_language_code` FOREIGN KEY (`language_code`) REFERENCES `language`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `prop` ADD CONSTRAINT `prop_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `translation` ADD CONSTRAINT `fk_trs_language_code` FOREIGN KEY (`language_code`) REFERENCES `language`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_u_role_id` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
