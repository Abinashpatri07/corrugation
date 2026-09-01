import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockQuotes = [
  {
    id: 1,
    date: '25/06/2026',
    quoteNo: 'QT-00001',
    customerName: 'CLIMAMAX PVT LTD',
    boxSpec: '5-Ply',
    quantity: '2,500',
    amount: '53,900',
  },
  {
    id: 2,
    date: '20/06/2026',
    quoteNo: 'QT-00002',
    customerName: 'NEXUS TECHNOLOGIES',
    boxSpec: '3-Ply',
    quantity: '1,000',
    amount: '12,500',
  },
  {
    id: 3,
    date: '15/06/2026',
    quoteNo: 'QT-00003',
    customerName: 'APEX INDUSTRIES',
    boxSpec: '5-Ply',
    quantity: '3,200',
    amount: '68,400',
  }
];

const QuotesTable = () => {
  const navigate = useNavigate();

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
          {mockQuotes.map((quote) => (
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
              <td className="py-4 px-6 text-[#1a233a] font-medium">{quote.customerName}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{quote.boxSpec}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{quote.quantity}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{quote.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuotesTable;
