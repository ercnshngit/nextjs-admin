-- AlterTable
ALTER TABLE `block_component` MODIFY `code` VARCHAR(191) NULL,
    MODIFY `hasChildren` BOOLEAN NOT NULL DEFAULT false;
