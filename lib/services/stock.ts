
function getQueryOptions(range: string) {
  const now = new Date();
  const queryOptions: any = { period1: new Date(), interval: "1d" };

  switch (range) {
    case "1D":
      queryOptions.period1 = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
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
  return queryOptions;
}

// GET: yahoo-finance2
function getYahooFinance() {
  // @ts-ignore
  const yfModule = require('yahoo-finance2');
  const mixed = yfModule.default || yfModule;
  const yahooFinance = typeof mixed === 'function' ? new mixed() : mixed;
  
  if (yahooFinance.suppressNotices) {
     yahooFinance.suppressNotices(['jit', 'ripFinancials', 'ripHistorical']);
  }
  return yahooFinance;
}

// GET: All Data
export async function getStockData(symbol: string, range: string = "1D") {
  try {
    const yahooFinance = getYahooFinance();
    const queryOptions = getQueryOptions(range);

    const [chartResult, quoteResult] = await Promise.all([
      yahooFinance.chart(symbol, queryOptions),
      yahooFinance.quote(symbol)
    ]);

    return {
      history: chartResult.quotes,
      info: quoteResult
    };
  } catch (error: any) {
    console.error("Yahoo Service Error:", error);
    return null;
  }
}

// GET: Stock Graph
export async function getStockHistory(symbol: string, range: string = "1D") {
    try {
      const yahooFinance = getYahooFinance();
      const queryOptions = getQueryOptions(range);
      
      const result = await yahooFinance.chart(symbol, queryOptions);
      return result.quotes;
    } catch (error: any) {
      console.error("Yahoo Chart Error:", error);
      return [];
    }
  }