-- CreateTable
CREATE TABLE `database_table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `is_hidden` BOOLEAN NOT NULL,
    `can_create` BOOLEAN NOT NULL,
    `can_update` BOOLEAN NOT NULL,

    UNIQUE INDEX `database_table_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `database_table_column` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `table_id` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,
    `is_primary` BOOLEAN NOT NULL,
    `is_required` BOOLEAN NOT NULL,
    `is_unique` BOOLEAN NOT NULL,
    `is_hidden` BOOLEAN NOT NULL,
    `is_filterable` BOOLEAN NOT NULL,
    `is_searchable` BOOLEAN NOT NULL,
    `is_sortable` BOOLEAN NOT NULL,
    `input_type_id` INTEGER NOT NULL,
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
    `type_category_id` INTEGER NOT NULL,

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
    `table_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

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
    `hasChildren` BOOLEAN NOT NULL,

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

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `database_table_column_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `database_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `database_table_column_input_type_id_fkey` FOREIGN KEY (`input_type_id`) REFERENCES `data_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `database_table_column_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `data_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `database_table_column_create_crud_option_id_fkey` FOREIGN KEY (`create_crud_option_id`) REFERENCES `crud_option`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `database_table_column_update_crud_option_id_fkey` FOREIGN KEY (`update_crud_option_id`) REFERENCES `crud_option`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `database_table_column` ADD CONSTRAINT `database_table_column_read_crud_option_id_fkey` FOREIGN KEY (`read_crud_option_id`) REFERENCES `crud_option`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `crud_option` ADD CONSTRAINT `fk_co_input_type_id` FOREIGN KEY (`input_type_id`) REFERENCES `data_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `column_relation_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `database_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `column_relation_referenced_table_id_fkey` FOREIGN KEY (`referenced_table_id`) REFERENCES `database_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `column_relation_pivot_table_id_fkey` FOREIGN KEY (`pivot_table_id`) REFERENCES `database_table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `column_relation_column_id_fkey` FOREIGN KEY (`column_id`) REFERENCES `database_table_column`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `column_relation_referenced_column_id_fkey` FOREIGN KEY (`referenced_column_id`) REFERENCES `database_table_column`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_relation` ADD CONSTRAINT `column_relation_relation_type_id_fkey` FOREIGN KEY (`relation_type_id`) REFERENCES `data_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `column_option` ADD CONSTRAINT `fk_coo_column_id` FOREIGN KEY (`column_id`) REFERENCES `database_table_column`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block` ADD CONSTRAINT `block_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component` ADD CONSTRAINT `block_component_component_id_fkey` FOREIGN KEY (`component_id`) REFERENCES `component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component` ADD CONSTRAINT `block_component_block_id_fkey` FOREIGN KEY (`block_id`) REFERENCES `block`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component` ADD CONSTRAINT `block_component_belong_component_id_fkey` FOREIGN KEY (`belong_component_id`) REFERENCES `component`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component_prop` ADD CONSTRAINT `block_component_prop_prop_id_fkey` FOREIGN KEY (`prop_id`) REFERENCES `prop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component_prop` ADD CONSTRAINT `block_component_prop_block_component_id_fkey` FOREIGN KEY (`block_component_id`) REFERENCES `block_component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component` ADD CONSTRAINT `component_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component` ADD CONSTRAINT `component_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component_prop` ADD CONSTRAINT `component_prop_component_id_fkey` FOREIGN KEY (`component_id`) REFERENCES `component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component_prop` ADD CONSTRAINT `component_prop_prop_id_fkey` FOREIGN KEY (`prop_id`) REFERENCES `prop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prop` ADD CONSTRAINT `prop_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
