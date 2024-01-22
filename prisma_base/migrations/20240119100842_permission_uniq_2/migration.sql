/*
  Warnings:

  - A unique constraint covering the columns `[api_route_id,is_auth,is_role]` on the table `permission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `permission_api_route_id_is_auth_is_role_key` ON `permission`(`api_route_id`, `is_auth`, `is_role`);
