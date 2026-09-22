import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuotesTable = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/quotes');
        const data = await response.json();
        if (data.success) {
          setQuotes(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-medium">Loading quotes...</div>;
  }

  if (quotes.length === 0) {
    return <div className="p-8 text-center text-gray-500 font-medium">No quotes found. Create a new quote to get started.</div>;
  }

  return (
    <div className="flex-1 overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#f4f6f8] border-b border-gray-200 text-sm">
            <th className="py-4 pl-8 pr-6 font-bold text-[#6b778c] w-16 text-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
            </th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Date</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Quote Number</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Customer Name</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Box Spec</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Quantity</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Amount</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px]">
              <td className="py-4 pl-8 pr-6 text-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
              </td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{quote.date}</td>
              <td 
                className="py-4 px-6 text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => navigate(`/sales/quotes/${quote.id}`)}
              >
                {quote.quoteNo}
              </td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{quote.customerName || 'N/A'}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{quote.boxSpec || 'N/A'}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{quote.quantity || 0}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{quote.amount || '0.00'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuotesTable;
