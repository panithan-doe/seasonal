// API นี้จะส่งข้อมูลกราฟ และ ข้อมูลรายละเอียดหุ้น
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const range = searchParams.get("range") || "1D";

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  // @ts-ignore
  const yfModule = require('yahoo-finance2');
  
  const mixed = yfModule.default || yfModule;
  let yahooFinance;


  if (typeof mixed === 'function') {
    yahooFinance = new mixed(); 
  } else {
    yahooFinance = mixed;
  }

  // กำหนด Options
  const now = new Date();
  let queryOptions: any = { period1: new Date(), interval: "1d" };

  switch (range) {
    case "1D":
      queryOptions.period1 = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000); 
      queryOptions.interval = "15m"; 
      break;
    case "1W":
      queryOptions.period1 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      queryOptions.interval = "1h";
      break;
    case "1M":
      queryOptions.period1 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      queryOptions.interval = "1d";
      break;
    case "1Y":
      const oneYearAgo = new Date(now);
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      queryOptions.period1 = oneYearAgo;
      queryOptions.interval = "1wk";
      break;
    default:
      queryOptions.period1 = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      queryOptions.interval = "15m";
  }

  try {
    // ปิด warning (ถ้ามี)
    if (yahooFinance.suppressNotices) {
        yahooFinance.suppressNotices(['jit', 'ripFinancials', 'ripHistorical']);
    }

    const result = await yahooFinance.chart(symbol, queryOptions);
    return NextResponse.json(result.quotes);
    

  } catch (error: any) {
    console.error("Yahoo Finance Error Details:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", details: error.message }, 
      { status: 500 }
    );
  }
}