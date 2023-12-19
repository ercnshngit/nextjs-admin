/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `prop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `prop_key_key` ON `prop`(`key`);

-- CreateIndex
CREATE UNIQUE INDEX `tag_name_key` ON `tag`(`name`);
