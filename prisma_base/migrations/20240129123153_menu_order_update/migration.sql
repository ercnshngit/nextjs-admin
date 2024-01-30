/*
  Warnings:

  - A unique constraint covering the columns `[previous_id]` on the table `menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[next_id]` on the table `menu` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `fk_menu_belong_id`;

-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `fk_menu_type_id`;

-- AlterTable
ALTER TABLE `menu` ADD COLUMN `next_id` INTEGER NULL,
    ADD COLUMN `previous_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ui_previous_id` ON `menu`(`previous_id`);

-- CreateIndex
CREATE UNIQUE INDEX `ui_next_id` ON `menu`(`next_id`);

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `fk_m_menu_belong_id` FOREIGN KEY (`menu_belong_id`) REFERENCES `menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `fk_m_previous_id` FOREIGN KEY (`previous_id`) REFERENCES `menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `fk_m_next_id` FOREIGN KEY (`next_id`) REFERENCES `menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `fk_m_type_id` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
