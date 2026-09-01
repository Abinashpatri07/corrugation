import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockSalesOrders = [
  {
    id: 1,
    date: '25/06/2026',
    salesOrderNo: 'SL-00001',
    referenceNo: 'QT-00001',
    customerName: 'CLIMAMAX PVT LTD',
    orderStatus: 'Accepted',
    payment: '53,900',
    packed: '...',
  },
  {
    id: 2,
    date: '20/06/2026',
    salesOrderNo: 'SL-00002',
    referenceNo: 'QT-00002',
    customerName: 'NEXUS TECHNOLOGIES',
    orderStatus: 'Accepted',
    payment: '12,500',
    packed: '...',
  },
  {
    id: 3,
    date: '15/06/2026',
    salesOrderNo: 'SL-00003',
    referenceNo: 'QT-00003',
    customerName: 'APEX INDUSTRIES',
    orderStatus: 'Draft',
    payment: '68,400',
    packed: '...',
  }
];

const SalesTable = () => {
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
            <th className="py-4 px-6 font-bold text-[#6b778c] whitespace-nowrap">Sales Order#</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Reference#</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Customer Name</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Order Status</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Payment</th>
            <th className="py-4 pr-8 pl-6 font-bold text-[#6b778c] text-center">Packed</th>
          </tr>
        </thead>
        <tbody>
          {mockSalesOrders.map((order) => (
            <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px]">
              <td className="py-4 pl-8 pr-6 text-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
              </td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{order.date}</td>
              <td 
                className="py-4 px-6 text-blue-600 font-medium cursor-pointer hover:underline whitespace-nowrap"
                onClick={() => navigate(`/sales/order/${order.salesOrderNo}`)}
              >
                {order.salesOrderNo}
              </td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{order.referenceNo}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium max-w-[200px] truncate" title={order.customerName}>
                {order.customerName}
              </td>
              <td className="py-4 px-6 text-green-500 font-medium">{order.orderStatus}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{order.payment}</td>
              <td className="py-4 pr-8 pl-6 text-gray-900 font-bold text-center text-lg">{order.packed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
