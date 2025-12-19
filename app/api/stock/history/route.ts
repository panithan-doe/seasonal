import { NextResponse } from "next/server";
import { getStockHistory } from "@/lib/services/stock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const range = searchParams.get("range") || "1D";

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  // เรียกใช้ Logic จาก services
  const data = await getStockHistory(symbol, range);

  if (!data || data.length === 0) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  return NextResponse.json(data);
}