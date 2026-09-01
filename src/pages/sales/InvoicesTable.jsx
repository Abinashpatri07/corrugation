import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockInvoices = [
  {
    id: 1,
    date: '25/06/2026',
    invoice: 'INV-00001',
    orderNo: 'SL-00001',
    customerName: 'CLIMAMAX PVT LTD',
    status: 'PAID',
    dueDate: '25/07/2026',
    amount: '₹53,900.00',
    balanceDue: '₹0.00',
  },
  {
    id: 2,
    date: '20/06/2026',
    invoice: 'INV-00002',
    orderNo: 'SL-00002',
    customerName: 'NEXUS TECHNOLOGIES',
    status: 'SENT',
    dueDate: '20/07/2026',
    amount: '₹12,500.00',
    balanceDue: '₹12,500.00',
  },
  {
    id: 3,
    date: '15/06/2026',
    invoice: 'INV-00003',
    orderNo: 'SL-00003',
    customerName: 'APEX INDUSTRIES',
    status: 'DRAFT',
    dueDate: '15/07/2026',
    amount: '₹68,400.00',
    balanceDue: '₹68,400.00',
  }
];

const InvoicesTable = () => {
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
            <th className="py-4 px-6 font-bold text-[#6b778c]">Invoice</th>
            <th className="py-4 px-6 font-bold text-[#6b778c] whitespace-nowrap">Order Number</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Customer Name</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Status</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Due Date</th>
            <th className="py-4 px-6 font-bold text-[#6b778c]">Amount</th>
            <th className="py-4 pr-8 pl-6 font-bold text-[#6b778c] whitespace-nowrap">Balance Due</th>
          </tr>
        </thead>
        <tbody>
          {mockInvoices.map((inv) => (
            <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px]">
              <td className="py-4 pl-8 pr-6 text-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
              </td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{inv.date}</td>
              <td 
                className="py-4 px-6 text-blue-600 font-medium cursor-pointer hover:underline whitespace-nowrap"
                onClick={() => navigate(`/sales/invoices/${inv.id}`)} // Placeholder route
              >
                {inv.invoice}
              </td>
              <td className="py-4 px-6 text-[#1a233a] font-medium whitespace-nowrap">{inv.orderNo}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium max-w-[200px] truncate" title={inv.customerName}>
                {inv.customerName}
              </td>
              <td className="py-4 px-6 text-gray-400 font-medium">{inv.status}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{inv.dueDate}</td>
              <td className="py-4 px-6 text-[#1a233a] font-medium">{inv.amount}</td>
              <td className="py-4 pr-8 pl-6 text-[#1a233a] font-medium">{inv.balanceDue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
