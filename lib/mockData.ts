// Mock data for seasonal stocks
export const seasonalStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, changePercent: 1.25, category: '💻 เทคโนโลยี', isWatchlist: true },
  { symbol: 'TSLA', name: 'Tesla Motors', price: 210.00, changePercent: 2.40, category: '🚗 ยานยนต์', isWatchlist: false  },
  { symbol: 'AMZN', name: 'Amazon.com', price: 128.90, changePercent: 0.85, category: '🛒 อีคอมเมิร์ซ', isWatchlist: false  },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 135.20, changePercent: 0.50, category: '💻 เทคโนโลยี', isWatchlist: false  },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 312.80, changePercent: 1.10, category: '💻 เทคโนโลยี', isWatchlist: true  },
  { symbol: 'NVDA', name: 'Nvidia Corp', price: 420.69, changePercent: 3.50, category: '💻 เทคโนโลยี', isWatchlist: false  },
];

// Mock data for news
export const marketNews = [
  { id: '1', date: '09:58', securities: ['AAPL'], source: 'Bloomberg', header: 'Apple เปิดตัวผลิตภัณฑ์ใหม่ที่น่าตื่นเต้นในงานอีเวนต์ล่าสุด' },
  { id: '2', date: '10:15', securities: ['AMZN'], source: 'Reuters', header: 'Amazon รายงานผลประกอบการไตรมาสที่แข็งแกร่งเกินคาด' },
  { id: '3', date: '11:30', securities: ['NVDA'], source: 'CNBC', header: 'Nvidia ประกาศความร่วมมือครั้งใหญ่กับบริษัทเทคโนโลยีชั้นนำ' },
  { id: '4', date: '12:45', securities: ['GOOGL'], source: 'TechCrunch', header: 'Google เปิดตัวฟีเจอร์ใหม่สำหรับแพลตฟอร์มโฆษณาของตน' },
  { id: '5', date: '14:00', securities: ['MSFT'], source: 'The Verge', header: 'Microsoft เปิดตัว Windows เวอร์ชันใหม่พร้อมคุณสมบัติที่ได้รับการปรับปรุง' },
];
