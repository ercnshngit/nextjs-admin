/*
  Warnings:

  - A unique constraint covering the columns `[table_id,name,language_code]` on the table `type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `data_language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_id` INTEGER NOT NULL,
    `database_table_id` INTEGER NOT NULL,
    `language_code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `type_table_id_name_language_code_key` ON `type`(`table_id`, `name`, `language_code`);

-- AddForeignKey
ALTER TABLE `data_language` ADD CONSTRAINT `data_language_database_table_id_fkey` FOREIGN KEY (`database_table_id`) REFERENCES `database_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `data_language` ADD CONSTRAINT `data_language_language_code_fkey` FOREIGN KEY (`language_code`) REFERENCES `language`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
