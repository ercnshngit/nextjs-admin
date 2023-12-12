-- DropForeignKey
ALTER TABLE `block_component` DROP FOREIGN KEY `fk_bcom_belong_block_component_code`;

-- AlterTable
ALTER TABLE `block_component` MODIFY `belong_block_component_code` VARCHAR(191) NULL;
