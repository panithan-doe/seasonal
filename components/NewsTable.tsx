import Link from 'next/link';

interface NewsItem {
  id: string; // Needed for the link
  date: string;
  securities: string[];
  source: string;
  header: string;
}

interface NewsTableProps {
  news: NewsItem[];
}

const NewsTable = ({ news }: NewsTableProps) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Wrapper for responsive scrolling */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          
          {/* Table Header */}
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">วันที่/เวลา</th>
              <th className="px-6 py-4 whitespace-nowrap">หลักทรัพย์</th>
              <th className="px-6 py-4 whitespace-nowrap">แหล่งข่าว</th>
              <th className="px-6 py-4 w-full">หัวข้อข่าว</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {news.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-blue-50 transition-colors duration-150 group"
              >
                {/* Date Column */}
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  <span className='text-[#247AE0]'>วันนี้ </span>
                  <span>{item.date}</span>
                </td>

                {/* Securities Column (Handles multiple stocks) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {item.securities.map((sec, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-md border border-gray-200"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Source Column */}
                <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">
                  {item.source}
                </td>

                {/* Header Column (Clickable) */}
                <td className="px-6 py-4">
                  <Link href={`/news/${item.id}`} className="font-medium text-gray-900 group-hover:text-blue-700 block line-clamp-1">
                    {item.header}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Empty State Helper */}
      {news.length === 0 && (
        <div className="p-8 text-center text-gray-400">
          No news available at the moment.
        </div>
      )}
    </div>
  );
};

export default NewsTable;