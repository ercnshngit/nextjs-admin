-- AlterTable
ALTER TABLE `client_voice` MODIFY `message` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `contact` MODIFY `message` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `cv` MODIFY `notes` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `job` MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `regulation` MODIFY `content` LONGTEXT NOT NULL;
