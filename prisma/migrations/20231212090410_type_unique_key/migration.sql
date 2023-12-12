/*
  Warnings:

  - A unique constraint covering the columns `[name,table_id]` on the table `type` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `fk_bcom_belong_block_component_code` ON `block_component`;

-- CreateIndex
CREATE UNIQUE INDEX `ui_name_table_id` ON `type`(`name`, `table_id`);
