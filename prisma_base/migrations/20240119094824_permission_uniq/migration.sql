/*
  Warnings:

  - A unique constraint covering the columns `[path,method]` on the table `api_route` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `api_route_path_method_key` ON `api_route`(`path`, `method`);
