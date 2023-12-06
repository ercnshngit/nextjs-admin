import { DataTypeService } from "@/services/data-type.service"

export async function GET(
    req: Request,
) {
    const service = new DataTypeService();
    try {
        return await service.setInputDataTypes()
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}