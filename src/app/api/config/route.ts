import { TableService } from "@/services/table.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const tableService = new TableService();
  try {
    return await tableService.getConfigs();
  } catch (error) {
    const message =
      (error as { message?: string }).message || "Something went wrong";
    return NextResponse.json(
      {
        message: message,
      },
      {
        status: 400,
      }
    );
  }
}
