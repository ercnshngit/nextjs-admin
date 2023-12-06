import { prisma } from "@/libs/prisma";
import { TypeJsons } from "../../constants/types.constants";

export class DataTypeService{

    // TypeJsonda kaydedılmıs input_type lerini varsa pas gecıyor yoksa insertliyor
    async setInputDataTypes(){
        try {
            let input_types = [] as any
            TypeJsons.INPUT_TYPES.forEach(async element => {
                const result = await prisma.data_type.upsert({
                    where : { 
                        ui_name_type_category_id : {
                            name : element.name,
                            type_category_id : element.type_category_id
                        }
                    },
                    create : {
                            name: element.name,
                            type_category_id: element.type_category_id == undefined ? 1 : element.type_category_id
                    },
                    update : {}
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