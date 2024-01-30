-- DropIndex
DROP INDEX `ui_next_id` ON `menu`;

-- DropIndex
DROP INDEX `ui_previous_id` ON `menu`;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `fk_m_previous_id` FOREIGN KEY (`previous_id`) REFERENCES `menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `fk_m_next_id` FOREIGN KEY (`next_id`) REFERENCES `menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
