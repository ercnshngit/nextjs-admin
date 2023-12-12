/*
  Warnings:

  - A unique constraint covering the columns `[table_id,name]` on the table `type` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ui_name_table_id` ON `type`;

-- CreateIndex
CREATE UNIQUE INDEX `ui_name_table_id` ON `type`(`table_id`, `name`);
