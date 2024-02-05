import { prisma } from "@/libs/prisma";
import { Encryptor } from "@/services/functions/encryptor";
import { TableService } from "@/services/table.service";

export async function createDemoUser() {
  let adminRoleId = null;
  adminRoleId = await prisma.role.findFirst({
    where: {
      name: "admin",
    },
  });
  if (!adminRoleId) {
    adminRoleId = await prisma.role.create({
      data: {
        name: "admin",
      },
    });
  }

  const userExist = await prisma.user.findFirst({
    where: {
      email: "demo",
    },
  });
  if (userExist) {
    await prisma.user.delete({
      where: {
        id: userExist.id,
      },
    });
  }
  const encryptor = new Encryptor();

  await prisma.user.create({
    data: {
      first_name: "demo",
      last_name: "demo",
      email: "demo",
      password: await encryptor.hashPassword("demo"),
      role: {
        connect: {
          id: adminRoleId.id,
        },
      },
    },
  });
}

createDemoUser();
