import { prisma } from "@/libs/prisma";
import { TypeCategories, TypeJsons } from "../../constants/types.constants";
import { table } from "console";
import { ErrorMessages } from "../../constants/messages.constants";

export class TypeService {

    // TypeJsonda kaydedılmıs input_type lerini varsa pas gecıyor yoksa insertliyor
    async setInputDataTypes() {
        try {
            const table = await prisma.database_table.findFirst({
                where:{
                  name: TypeCategories.INPUT_TYPE,
                }
            });
            if(!table){
                return new Response(JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }), { status: 404 });
            }
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
                            connect:{
                                id: table.id
                            }
                        }
                    },
                })
                input_types.push(result)
            });
            return new Response(JSON.stringify({ status: "success", message: "Input types created successfully", data: input_types }), { status: 200 })
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 400 })
        }
    }

    async setRelationTypes() {
        try {
            const table = await prisma.database_table.findFirst({
                where:{
                  name: TypeCategories.RELATION_TYPE,
                }
            });
            if(!table){
                return new Response(JSON.stringify({ message: ErrorMessages.TABLE_NOT_FOUND_ERROR() }), { status: 404 });
            }
            let relation_types = [] as any
            TypeJsons.RELATION_TYPES.forEach(async element => {
                const result = await prisma.type.create({
                    include:{
                        table : true
                    },
                    data: {
                        name: element.name,
                        table:{
                            connect:{
                                id: table.id
                            }
                        }
                    },
                })
                relation_types.push(result)
            });
            return new Response(JSON.stringify({ status: "success", message: "Relation types created successfully", data: relation_types }), { status: 200 })
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 400 })
        }
    }

    async getInputDataTypes() {
        try {
            const result = await prisma.type.findMany({
                where: {
                    table: {
                        name: TypeCategories.INPUT_TYPE
                    }
                }
            })
            return new Response(JSON.stringify( result ), { status: 200 })
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", message: error }), { status: 400 })
        }
    }

    async getRelationTypes() {
        try {
            const result = await prisma.type.findMany({
                where: {
                    table: {
                        name: TypeCategories.RELATION_TYPE
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