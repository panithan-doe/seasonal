import Header from '@/components/Header';
import QuarterHeader from '@/components/QuarterHeader';

export default function NewsPage() {
  return (
    <main>
      <Header/>
      
      <QuarterHeader/>
      
      <div className="min-h-screen bg-gray-50 p-6 md:p-12 flex justify-center items-center">
        <p className='text-gray-800'>
          handbook page
        </p>
      </div>
      
    </main>
  );
}