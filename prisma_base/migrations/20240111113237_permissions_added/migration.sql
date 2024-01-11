-- DropForeignKey
ALTER TABLE `block_component_prop` DROP FOREIGN KEY `fk_bcomp_block_component_id`;

-- DropForeignKey
ALTER TABLE `block_component_prop` DROP FOREIGN KEY `fk_bcomp_prop_id`;

-- DropForeignKey
ALTER TABLE `component_prop` DROP FOREIGN KEY `fk_compp_component_id`;

-- DropForeignKey
ALTER TABLE `component_prop` DROP FOREIGN KEY `fk_compp_prop_id`;

-- CreateTable
CREATE TABLE `permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `api_route_id` INTEGER NOT NULL,
    `is_auth` BOOLEAN NOT NULL DEFAULT false,
    `is_role` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `api_route` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `has_param` BOOLEAN NOT NULL DEFAULT false,
    `table_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permission_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `block_component_prop` ADD CONSTRAINT `fk_bcomp_prop_id` FOREIGN KEY (`prop_id`) REFERENCES `prop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component_prop` ADD CONSTRAINT `fk_bcomp_block_component_id` FOREIGN KEY (`block_component_id`) REFERENCES `block_component`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component_prop` ADD CONSTRAINT `fk_compp_component_id` FOREIGN KEY (`component_id`) REFERENCES `component`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `component_prop` ADD CONSTRAINT `fk_compp_prop_id` FOREIGN KEY (`prop_id`) REFERENCES `prop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `fk_pr_api_route_id` FOREIGN KEY (`api_route_id`) REFERENCES `api_route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `api_route` ADD CONSTRAINT `fk_ar_table_id` FOREIGN KEY (`table_id`) REFERENCES `database_table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission_role` ADD CONSTRAINT `fk_pro_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission_role` ADD CONSTRAINT `fk_pro_role_id` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
