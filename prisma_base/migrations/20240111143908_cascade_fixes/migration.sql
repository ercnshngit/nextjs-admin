-- DropForeignKey
ALTER TABLE `block_component` DROP FOREIGN KEY `fk_bcom_component_id`;

-- DropForeignKey
ALTER TABLE `block_component` DROP FOREIGN KEY `fk_bcom_table_id`;

-- AddForeignKey
ALTER TABLE `block_component` ADD CONSTRAINT `fk_bcom_component_id` FOREIGN KEY (`component_id`) REFERENCES `component`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_component` ADD CONSTRAINT `fk_bcom_table_id` FOREIGN KEY (`block_id`) REFERENCES `block`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
