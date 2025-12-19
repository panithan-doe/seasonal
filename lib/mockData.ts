// Mock data for stock
export const seasonalStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, changePercent: 1.25, category: 'เทคโนโลยี', percentLoss: 1, isWatchlist: true, startDate: 12, duration: 13, signal: 'BUY', month: 8 },
  { symbol: 'TSLA', name: 'Tesla Motors', price: 210.00, changePercent: 2.40, category: 'ยานยนต์', percentLoss: 6, isWatchlist: false, startDate: 2, duration: 10, signal: 'SELL', month: 7 },
  { symbol: 'AMZN', name: 'Amazon.com', price: 128.90, changePercent: 0.85, category: 'อีคอมเมิร์ซ', percentLoss: 3, isWatchlist: false, startDate: 1, duration: 16, signal: 'HOLD', month: 8  },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 135.20, changePercent: 0.50, category: 'เทคโนโลยี', percentLoss: 6, isWatchlist: false, startDate: 15, duration: 10, signal: 'BUY', month: 8 },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 312.80, changePercent: 1.10, category: 'เทคโนโลยี', percentLoss: 5, isWatchlist: true, startDate: 20, duration: 7, signal: 'BUY', month: 8 },
  { symbol: 'NVDA', name: 'Nvidia Corp', price: 420.69, changePercent: 3.50, category: 'เทคโนโลยี', percentLoss: 4, isWatchlist: false, startDate: 8, duration: 15, signal: 'SELL', month: 8 },
  
  // Thai stock (.BK)
  { symbol: 'PTT.BK', name: 'PTT Public Company Limited', price: 34.00, changePercent: -0.50, category: 'พลังงาน', percentLoss: 2, isWatchlist: false },
  { symbol: 'AOT.BK', name: 'Airports of Thailand', price: 60.00, changePercent: 1.20, category: 'ขนส่ง', percentLoss: 1, isWatchlist: true },
  { symbol: 'DELTA.BK', name: 'Delta Electronics', price: 85.00, changePercent: 5.50, category: 'ชิ้นส่วนอิเล็กฯ', percentLoss: 8, isWatchlist: false },
];

// Mock data for news
export const marketNews = [
  { id: '1', date: '09:58', securities: ['AAPL'], source: 'Bloomberg', header: 'Apple เปิดตัวผลิตภัณฑ์ใหม่ที่น่าตื่นเต้นในงานอีเวนต์ล่าสุด' },
  { id: '2', date: '10:15', securities: ['AMZN'], source: 'Reuters', header: 'Amazon รายงานผลประกอบการไตรมาสที่แข็งแกร่งเกินคาด' },
  { id: '3', date: '11:30', securities: ['NVDA'], source: 'CNBC', header: 'Nvidia ประกาศความร่วมมือครั้งใหญ่กับบริษัทเทคโนโลยีชั้นนำ' },
  { id: '4', date: '12:45', securities: ['GOOGL'], source: 'TechCrunch', header: 'Google เปิดตัวฟีเจอร์ใหม่สำหรับแพลตฟอร์มโฆษณาของตน' },
  { id: '5', date: '14:00', securities: ['MSFT'], source: 'The Verge', header: 'Microsoft เปิดตัว Windows เวอร์ชันใหม่พร้อมคุณสมบัติที่ได้รับการปรับปรุง' },
];