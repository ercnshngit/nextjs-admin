/*
  Warnings:

  - You are about to drop the `generals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `generals` DROP FOREIGN KEY `fk_general_language_code`;

-- DropTable
DROP TABLE `generals`;

-- CreateTable
CREATE TABLE `general` (
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

-- AddForeignKey
ALTER TABLE `general` ADD CONSTRAINT `fk_general_language_code` FOREIGN KEY (`language_code`) REFERENCES `language`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;
