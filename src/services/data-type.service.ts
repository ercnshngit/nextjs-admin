import { prisma } from "@/libs/prisma";
import { TypeJsons } from "../../constants/types.constants";

export class DataTypeService {

    // TypeJsonda kaydedılmıs input_type lerini varsa pas gecıyor yoksa insertliyor
    async setInputDataTypes() {
        try {
            let input_types = [] as any
            TypeJsons.INPUT_TYPES.forEach(async element => {
                const result = await prisma.type.upsert({
                    include:{
                        table : {
                            where:{
                                name: element.table_name
                            }
                        }
                    },
                    where: {
                        ui_name_table_id:{
                            
                        }
                    },
                    create: {
                        name: element.name,
                        table:{
                            connectOrCreate:{
                                where:{
                                    name: element.table_name
                                },
                                create:{
                                    name: element.table_name
                                }
                            }
                        }
                    },
                    update: {}
                })
                input_types.push(result)
            });
            return new Response(JSON.stringify({ status: "success", message: "Input types created successfully", data: input_types }))
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", message: error }))
        }
    }
}