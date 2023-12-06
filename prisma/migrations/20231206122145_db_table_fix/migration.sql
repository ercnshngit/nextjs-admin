-- AlterTable
ALTER TABLE `database_table` MODIFY `icon` VARCHAR(191) NULL,
    MODIFY `is_hidden` BOOLEAN NULL DEFAULT false,
    MODIFY `can_create` BOOLEAN NULL DEFAULT false,
    MODIFY `can_update` BOOLEAN NULL DEFAULT false;
