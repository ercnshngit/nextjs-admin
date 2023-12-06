/*
  Warnings:

  - A unique constraint covering the columns `[name,type_category_id]` on the table `data_type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `data_type_name_type_category_id_key` ON `data_type`(`name`, `type_category_id`);
