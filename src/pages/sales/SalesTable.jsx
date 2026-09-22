import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SalesTable = () => {
  const navigate = useNavigate();
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesOrders = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/sales-orders');
        const data = await res.json();
        setSalesOrders(data);
      } catch (err) {
        console.error('Failed to fetch sales orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSalesOrders();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-medium w-full">Loading sales orders...</div>;
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
            <th className="py-4 px-6 font-bold text-[#6b778c] whitespace-nowrap">Sales Order#</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Reference#</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Customer Name</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Order Status</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Payment</th>
            <th className="py-4 pr-8 pl-6 font-bold text-[#6b778c] text-center">Packed</th>
          </tr>
        </thead>
        <tbody>
          {salesOrders.map((order) => (
            <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px]">
              <td className="py-4 pl-8 pr-6 text-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
              </td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{order.date}</td>
              <td 
                className="py-4 px-6 text-blue-600 font-medium cursor-pointer hover:underline whitespace-nowrap"
                onClick={() => navigate(`/sales/order/${order.id}`)}
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
