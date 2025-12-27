import Link from "next/link";

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
          <thead className="bg-[#247AE0] text-xs uppercase text-white font-semibold">
            <tr>
              <th className="px-10 py-4 whitespace-nowrap">วันที่</th>
              <th className="px-10 py-4 whitespace-nowrap">เวลา</th>
              <th className="px-10 py-4 whitespace-nowrap">หลักทรัพย์</th>
              <th className="px-10 py-4 whitespace-nowrap">แหล่งข่าว</th>
              <th className="px-10 py-4 w-full">หัวข้อข่าว</th>
              <th className="px-10 py-4 whitespace-nowrap"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {news.map((item) => (
              <tr
                key={item.id}
                className="transition-colors duration-150 group"
              >
                {/* Date Column */}
                {/* TODO: Change this */}
                <td className="px-10 py-4 whitespace-nowrap font-medium text-[#247AE0]">
                  วันนี้
                </td>

                {/* Time Column */}
                <td className="px-10 py-4 whitespace-nowrap font-medium text-gray-900">
                  {item.date}
                </td>

                {/* Securities Column (Handles multiple stocks) */}
                <td className="px-10 py-4 whitespace-nowrap">
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
                <td className="px-10 py-4 whitespace-nowrap text-blue-600 font-medium">
                  {item.source}
                </td>

                {/* Header Column */}
                <td className="px-10 py-4">
                  <p className="font-medium text-gray-900 line-clamp-1">
                    {item.header}
                  </p>
                </td>

                {/* Action Column */}
                <td className="px-10 py-2 whitespace-nowrap">
                  <Link
                    href={`/news/${item.id}`}
                    className="inline-flex items-center px-3 py-1.5 bg-[#247AE0]/20 border border-[#247AE0] text-[#247AE0] text-sm font-medium rounded-full hover:bg-[#247AE0]/30 transition-colors"
                  >
                    อ่านเพิ่มเติม
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
