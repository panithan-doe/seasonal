// Mock data for stock
export const seasonalStocks = [
  // ===== Q1 (มกราคม-มีนาคม, month: 0-2) =====
  { symbol: 'META', name: 'Meta Platforms', price: 385.50, changePercent: 2.15, category: 'เทคโนโลยี', percentLoss: 2, isWatchlist: true, startDate: 5, duration: 12, signal: 'BUY', month: 0, volume: '25M' },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 452.30, changePercent: 1.85, category: 'บันเทิง', percentLoss: 3, isWatchlist: false, startDate: 15, duration: 10, signal: 'HOLD', month: 0, volume: '18M' },
  { symbol: 'INTC', name: 'Intel Corporation', price: 42.75, changePercent: -0.65, category: 'เทคโนโลยี', percentLoss: 5, isWatchlist: false, startDate: 8, duration: 14, signal: 'SELL', month: 1, volume: '30M' },
  { symbol: 'AMD', name: 'AMD Inc.', price: 118.60, changePercent: 3.25, category: 'เทคโนโลยี', percentLoss: 4, isWatchlist: true, startDate: 20, duration: 15, signal: 'BUY', month: 1, volume: '45M' },
  { symbol: 'DIS', name: 'Walt Disney', price: 95.40, changePercent: 1.50, category: 'บันเทิง', percentLoss: 2, isWatchlist: false, startDate: 3, duration: 8, signal: 'HOLD', month: 2, volume: '22M' },
  { symbol: 'BABA', name: 'Alibaba Group', price: 78.90, changePercent: 2.80, category: 'อีคอมเมิร์ซ', percentLoss: 6, isWatchlist: false, startDate: 12, duration: 18, signal: 'BUY', month: 2, volume: '35M' },

  // ===== Q2 (เมษายน-มิถุนายน, month: 3-5) =====
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 152.30, changePercent: 0.95, category: 'การเงิน', percentLoss: 1, isWatchlist: true, startDate: 10, duration: 12, signal: 'BUY', month: 3, volume: '20M' },
  { symbol: 'BAC', name: 'Bank of America', price: 33.85, changePercent: 1.25, category: 'การเงิน', percentLoss: 2, isWatchlist: false, startDate: 5, duration: 10, signal: 'HOLD', month: 3, volume: '28M' },
  { symbol: 'V', name: 'Visa Inc.', price: 245.70, changePercent: 1.75, category: 'การเงิน', percentLoss: 3, isWatchlist: true, startDate: 18, duration: 14, signal: 'BUY', month: 4, volume: '15M' },
  { symbol: 'MA', name: 'Mastercard Inc.', price: 398.20, changePercent: 1.60, category: 'การเงิน', percentLoss: 2, isWatchlist: false, startDate: 8, duration: 16, signal: 'BUY', month: 4, volume: '12M' },
  { symbol: 'PYPL', name: 'PayPal Holdings', price: 64.50, changePercent: -1.20, category: 'การเงิน', percentLoss: 8, isWatchlist: false, startDate: 22, duration: 15, signal: 'SELL', month: 5, volume: '18M' },
  { symbol: 'SQ', name: 'Block Inc.', price: 72.40, changePercent: 2.90, category: 'การเงิน', percentLoss: 7, isWatchlist: false, startDate: 14, duration: 13, signal: 'HOLD', month: 5, volume: '22M' },

  // ===== Q3 (กรกฎาคม-กันยายน, month: 6-8) =====
  { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, changePercent: 1.25, category: 'เทคโนโลยี', percentLoss: 1, isWatchlist: true, startDate: 21, duration: 15, signal: 'BUY', month: 6, volume: '50M' },
  { symbol: 'TSLA', name: 'Tesla Motors', price: 210.00, changePercent: 2.40, category: 'ยานยนต์', percentLoss: 6, isWatchlist: false, startDate: 2, duration: 10, signal: 'SELL', month: 7, volume: '80M' },
  { symbol: 'AMZN', name: 'Amazon.com', price: 128.90, changePercent: 0.85, category: 'อีคอมเมิร์ซ', percentLoss: 3, isWatchlist: false, startDate: 1, duration: 16, signal: 'HOLD', month: 7, volume: '40M' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 135.20, changePercent: 0.50, category: 'เทคโนโลยี', percentLoss: 6, isWatchlist: false, startDate: 25, duration: 12, signal: 'BUY', month: 8, volume: '35M' },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 312.80, changePercent: 1.10, category: 'เทคโนโลยี', percentLoss: 5, isWatchlist: true, startDate: 20, duration: 7, signal: 'BUY', month: 8, volume: '45M' },
  { symbol: 'NVDA', name: 'Nvidia Corp', price: 420.69, changePercent: 3.50, category: 'เทคโนโลยี', percentLoss: 4, isWatchlist: false, startDate: 15, duration: 20, signal: 'SELL', month: 7, volume: '60M' },

  // ===== Q4 (ตุลาคม-ธันวาคม, month: 9-11) =====
  { symbol: 'WMT', name: 'Walmart Inc.', price: 158.70, changePercent: 1.35, category: 'ค้าปลีก', percentLoss: 2, isWatchlist: true, startDate: 5, duration: 10, signal: 'BUY', month: 9, volume: '25M' },
  { symbol: 'HD', name: 'Home Depot', price: 325.40, changePercent: 0.95, category: 'ค้าปลีก', percentLoss: 3, isWatchlist: false, startDate: 12, duration: 14, signal: 'HOLD', month: 9, volume: '18M' },
  { symbol: 'NKE', name: 'Nike Inc.', price: 102.50, changePercent: -0.85, category: 'แฟชั่น', percentLoss: 5, isWatchlist: false, startDate: 8, duration: 12, signal: 'SELL', month: 10, volume: '22M' },
  { symbol: 'COST', name: 'Costco Wholesale', price: 612.30, changePercent: 1.80, category: 'ค้าปลีก', percentLoss: 1, isWatchlist: true, startDate: 18, duration: 15, signal: 'BUY', month: 10, volume: '15M' },
  { symbol: 'TGT', name: 'Target Corporation', price: 142.85, changePercent: 1.45, category: 'ค้าปลีก', percentLoss: 4, isWatchlist: false, startDate: 25, duration: 11, signal: 'HOLD', month: 11, volume: '20M' },
  { symbol: 'SBUX', name: 'Starbucks Corp', price: 95.60, changePercent: 2.10, category: 'อาหารและเครื่องดื่ม', percentLoss: 3, isWatchlist: false, startDate: 10, duration: 18, signal: 'BUY', month: 11, volume: '30M' },

  // Thai stock (.BK) - กระจายไปแต่ละไตรมาส
  { symbol: 'PTT.BK', name: 'PTT Public Company Limited', price: 34.00, changePercent: -0.50, category: 'พลังงาน', percentLoss: 2, isWatchlist: false, startDate: 5, duration: 10, signal: 'HOLD', month: 6, volume: '10M' },
  { symbol: 'AOT.BK', name: 'Airports of Thailand', price: 60.00, changePercent: 1.20, category: 'ขนส่ง', percentLoss: 1, isWatchlist: true, startDate: 15, duration: 12, signal: 'BUY', month: 3, volume: '8M' },
  { symbol: 'DELTA.BK', name: 'Delta Electronics', price: 85.00, changePercent: 5.50, category: 'ชิ้นส่วนอิเล็กฯ', percentLoss: 8, isWatchlist: false, startDate: 20, duration: 14, signal: 'BUY', month: 0, volume: '5M' },
];

// Mock data for news
export const marketNews = [
  { id: '1', date: '09:58', securities: ['AAPL'], source: 'Bloomberg', header: 'Apple เปิดตัวผลิตภัณฑ์ใหม่ที่น่าตื่นเต้นในงานอีเวนต์ล่าสุด' },
  { id: '2', date: '10:15', securities: ['AMZN'], source: 'Reuters', header: 'Amazon รายงานผลประกอบการไตรมาสที่แข็งแกร่งเกินคาด' },
  { id: '3', date: '11:30', securities: ['NVDA'], source: 'CNBC', header: 'Nvidia ประกาศความร่วมมือครั้งใหญ่กับบริษัทเทคโนโลยีชั้นนำ' },
  { id: '4', date: '12:45', securities: ['GOOGL'], source: 'TechCrunch', header: 'Google เปิดตัวฟีเจอร์ใหม่สำหรับแพลตฟอร์มโฆษณาของตน' },
  { id: '5', date: '14:00', securities: ['MSFT'], source: 'The Verge', header: 'Microsoft เปิดตัว Windows เวอร์ชันใหม่พร้อมคุณสมบัติที่ได้รับการปรับปรุง' },
];
