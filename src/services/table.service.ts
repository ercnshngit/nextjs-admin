import { prisma } from "@/libs/prisma";
import { SqlConstants } from "../../constants/sql";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { config } from "dotenv";
import { DatabaseTableDto } from "./dto/database-table.dto";
import { Data } from "@dnd-kit/core";

config();    
export class TableService{
    async getTable(table_name : string){
        const query = `SELECT * FROM ${table_name}`;
        const table = await prisma.$queryRaw`${query}`;
        if(!table){ return new Response(JSON.stringify({message : ErrorMessages.TABLE_NOT_FOUND_ERROR()})); }
        return new Response(JSON.stringify(table));
    }

    async getTableById(table_name : string , id : number){
        const query = SqlConstants.SELECT_ALL_WITH_ID_QUERRY(table_name , id);
        const table = await prisma.$queryRaw`${query}`;
        if(!table){ return new Response(JSON.stringify({message : ErrorMessages.TABLE_NOT_FOUND_ERROR()})); }
        return new Response(JSON.stringify(table));
    }

    async createTable(table_name : string , data : any){
        try {
            let columns = " (";
            let values = " (";
            data.forEach((element: { key: string; value: string; }) => {
                columns += element.key + ", ";
                values += "'" + element.value + "', ";
            });
            columns = columns.substring(0, columns.length - 2) + ") ";
            values = values.substring(0, values.length - 2) + ") ";

            const query = SqlConstants.INSERT_INTO + table_name + columns + SqlConstants.VALUES + values;
            const table = await prisma.$queryRaw`${query}`;
            if(!table){ return new Response(JSON.stringify({message : ErrorMessages.TABLE_CANNOT_CREATED_ERROR()})); }
            return new Response(JSON.stringify(table));
        } catch (error) {
            return new Response(JSON.stringify({status : "error" , message : error}));        
        }
    }

    async getTableWithWhere(table_name : string , data : any){
        try {
            let where : string = "";
            data.forEach((element: { key: string; value: string; }) => {
                where += element.key + " = '" + element.value + "' AND ";
            });
            where = where.substring(0, where.length - 4);
            const query = SqlConstants.SELECT_ALL_WITH_WHERE_QUERRY(table_name , where)
            const table = await prisma.$queryRaw`${query}`;
            if(!table){ return new Response(JSON.stringify({message : ErrorMessages.TABLE_NOT_FOUND_ERROR()})); }
            return new Response(JSON.stringify(table));
        } catch (error) {
            return new Response(JSON.stringify({status : "error" , message : error}));        
        }
    }

    async updateTableWithId(table_name : string , id : number , data : any){
        try {
            let set : string = "";
            data.forEach((element: { key: string; value: string; }) => {
                set += element.key + " = '" + element.value + "' , ";
            });
            set = set.substring(0, set.length - 2);

            const query = SqlConstants.UPDATE_QUERRY_WITH_ID(table_name,set,id)
            const result = await prisma.$queryRaw`${query}`;
            return new Response(JSON.stringify({message : ConfirmMessages.TABLE_UPDATE_SUCCESS_CONFIRM()}));
        } catch (error) {
            return new Response(JSON.stringify({status : "error" , message : error}));            
        }
    }

    async deleteTableWithId(table_name : string , id : number){
        try {
            const query = SqlConstants.DELETE_QUERY_WITH_ID(table_name,id)
            const result = await prisma.$queryRaw`${query}`;
            return new Response(JSON.stringify({message : ConfirmMessages.TABLE_DELETE_SUCCESS_CONFIRM()}));
        } catch (error) {
            return new Response(JSON.stringify({status : "error" , message : error}));            
        }
    }

    async getAllTableWithDatas(){
        try {
            let new_result: any[] = [];
            const query = "SELECT table_name as 'table_name' , JSON_ARRAYAGG(JSON_OBJECT('name',column_name , 'type' , data_type)) as 'columns' from information_schema.columns WHERE table_schema ='" + process.env.DB_NAME + "' GROUP BY table_name"
            const result = await prisma.$queryRaw`${query}`;
            Object.assign(new_result, result);
            new_result.forEach(element => {
            element.columns = JSON.parse(element.columns);
            element.columns.forEach((table_element: { [x: string]: string; type: string; }) => {
                const type = table_element.type;
                // Veri Kontrolü ve dönüşüm alanı
                if (["int", "bigint", "tinyint"].includes(type)) {
                table_element.type = "number";
                } else if (["varchar", "datetime"].includes(type)) {
                table_element.type = "string";
                } else if (["text", "long"].includes(type)) {
                table_element.type = "string";
                table_element["inputType"] = "textarea";
                }
                // ------------------------------
              });
            });
            return new Response(JSON.stringify(new_result));
        } catch (error) {
            return new Response(JSON.stringify({ status: "error", message: error }));
        }
    }

    async getTableConfig(table_name : string){
        try {
            const result = await prisma.database_table.findMany({
                where : {
                    name : table_name
                },
                include : {
                    columns : {
                        include : {
                            type : true,
                            input_type : true,
                            create_crud_option : {
                                include : {
                                    InputType : true
                                }
                            },
                            read_crud_option :{
                                include : {
                                    InputType : true
                                }
                            },
                            update_crud_option :{
                                include : {
                                    InputType : true
                                }
                            }
                        }
                    }
                }
            })
            if(!result){ return new Response(JSON.stringify({message : ErrorMessages.TABLE_NOT_FOUND_ERROR()})); }
            return new Response(JSON.stringify(result));
        } catch (error) {
            return new Response(JSON.stringify({status : "error" , message : error}));
        }
    }

    async updateTableConfig(body : any){
        try {
            const tableData = body[0]
            const talbeDatas = Object.assign(tableData , new DatabaseTableDto())
            const deneme = await prisma.database_table.update({
                where : { id : tableData.id },
                data : {
                    name : tableData.name,
                    icon : tableData.icon,
                    is_hidden : tableData.is_hidden,
                    can_create : tableData.can_create,
                    can_update : tableData.can_update,
                    columns : {
                        set : talbeDatas.columns
                    }
                },
                include : {
                    columns : {
                        include : {
                            type : true,
                            input_type : true,
                            database_table : true,
                            create_crud_option : {
                                include : {
                                    InputType : true
                                }
                            },
                            read_crud_option :{
                                include : {
                                    InputType : true
                                }
                            },
                            update_crud_option :{
                                include : {
                                    InputType : true
                                }
                            }
                        }
                    }
                }
            })
            console.log("deneme ::",deneme)
            const columns = Object.values(talbeDatas.columns)
            //console.log({columns : columns})
            const result = await prisma.database_table.update({
                where : {
                    id : tableData.id
                },
                data : 
                {
                    name : tableData.name,
                    icon : tableData.icon,
                    is_hidden : tableData.is_hidden,
                    can_create : tableData.can_create,
                    can_update : tableData.can_update,
                    columns : {
                        updateMany : {
                            data : columns,
                            where : {
                                id : {
                                    in : columns.map((column : any) => column.id)
                                }
                            }
                        },
                    }
                },
                    
                include : {
                    columns : {
                        include : {
                            type : true,
                            input_type : true,
                            create_crud_option : {
                                include : {
                                    InputType : true
                                }
                            },
                            read_crud_option :{
                                include : {
                                    InputType : true
                                }
                            },
                            update_crud_option :{
                                include : {
                                    InputType : true
                                }
                            }
                        }
                    }
                }
            });
            if(!result){ return new Response(JSON.stringify({message : ErrorMessages.TABLE_UPDATE_FAILED_ERROR()})); }
            return new Response(JSON.stringify({message : ConfirmMessages.TABLE_CONFIG_DATA_UPDATE_SUCCESS_CONFIRM()}));
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({status : "error" , message : error}));
        }
    }
}