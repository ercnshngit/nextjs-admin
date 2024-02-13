import { prisma } from "@/libs/prisma";

export async function test() {
  try {
    // find block table id
    const block = await prisma.data_language.create({
      data: {
        data_id: 2,
        language_code: "en",
        database_table_id: 1,
      },
    });
    console.log(block);
  } catch (error) {
    console.log(error);
  }
}

test();
