import { prisma } from "@/libs/prisma";
import { TypeJsons } from "../../constants/types.constants";

export class TypeService {

    // TypeJsonda kaydedılmıs input_type lerini varsa pas gecıyor yoksa insertliyor
    async setInputDataTypes() {
        try {
            let input_types = [] as any
            TypeJsons.INPUT_TYPES.forEach(async element => {
                const result = await prisma.type.create({
                    include:{
                        table : {
                            where:{
                                name: element.table_name
                            }
                        }
                    },
                    data: {
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
                })
                input_types.push(result)
            });
            return new Response(JSON.stringify({ status: "success", message: "Input types created successfully", data: input_types }))
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", message: error }))
        }
    }

    async setRelationTypes() {
        try {
            let relation_types = [] as any
            TypeJsons.RELATION_TYPES.forEach(async element => {
                const result = await prisma.type.create({
                    include:{
                        table : {
                            where:{
                                name: element.table_name
                            }
                        }
                    },
                    data: {
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
                })
                relation_types.push(result)
            });
            return new Response(JSON.stringify({ status: "success", message: "Relation types created successfully", data: relation_types }))
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", message: error }))
        }
    }

    async getInputDataTypes() {
        try {
            const result = await prisma.type.findMany({
                where: {
                    table: {
                        name: "database_table_column"
                    }
                }
            })
            return new Response(JSON.stringify( result ), { status: 200 })
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 400 })
        }
    }
}