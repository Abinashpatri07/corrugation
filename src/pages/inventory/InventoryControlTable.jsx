import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockControlData = [
  {
    id: 1,
    date: '05/07/2026',
    reason: 'Stock Correction',
    description: 'Physical Count Variance Adjusted For Kraft Paper 150 GSM',
    status: 'Approved',
    referenceNumber: 'ADJ-000012',
    type: 'Inventory Adjustment',
    createdBy: 'Suresh Kulkarni',
    createdTime: '10:32 AM',
    lastModifiedBy: 'Suresh Kulkarni',
    lastModifiedTime: '11:15 AM'
  }
];

const InventoryControlTable = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-x-auto w-full">
      <table className="w-full text-left border-collapse min-w-[1200px]">
        <thead>
          <tr className="bg-[#f9fafb] border-b border-gray-200 text-[13px]">
            <th className="py-2 pl-4 pr-2 w-10">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            </th>
            <th className="py-2 px-4 font-bold text-[#6b778c] whitespace-nowrap">Date</th>
            <th className="py-2 px-4 font-bold text-[#6b778c] whitespace-nowrap">Reason</th>
            <th className="py-2 px-4 font-bold text-[#6b778c] whitespace-nowrap min-w-[300px]">Description</th>
            <th className="py-2 px-4 font-bold text-[#6b778c] whitespace-nowrap">Status</th>
            <th className="py-2 px-4 font-bold text-[#6b778c] whitespace-nowrap">Reference Number</th>
            <th className="py-2 px-4 font-bold text-[#6b778c] whitespace-nowrap">Type</th>
            <th className="py-2 px-4 font-bold text-[#6b778c] whitespace-nowrap">Created By</th>
            <th className="py-2 px-4 font-bold text-[#6b778c] whitespace-nowrap">Created Time</th>
            <th className="py-2 px-4 font-bold text-[#6b778c] whitespace-nowrap">Last Modified By</th>
            <th className="py-2 pr-4 pl-4 font-bold text-[#6b778c] whitespace-nowrap">Last Modified Time</th>
          </tr>
        </thead>
        <tbody>
          {mockControlData.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px]">
              <td className="py-2 pl-4 pr-2">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </td>
              <td className="py-2 px-4 font-medium text-[#1a233a] whitespace-nowrap">{item.date}</td>
              <td 
                className="py-2 px-4 text-blue-500 font-medium cursor-pointer hover:underline whitespace-nowrap"
                onClick={() => navigate(`/inventory/control/${item.id}`)}
              >
                {item.reason}
              </td>
              <td className="py-2 px-4 text-[#1a233a] font-medium leading-relaxed">
                {item.description}
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {item.status}
                </span>
              </td>
              <td className="py-2 px-4 text-[#1a233a] font-medium whitespace-nowrap">{item.referenceNumber}</td>
              <td className="py-2 px-4 text-[#1a233a] font-medium whitespace-nowrap">{item.type}</td>
              <td className="py-2 px-4 text-[#1a233a] font-medium whitespace-nowrap">{item.createdBy}</td>
              <td className="py-2 px-4 text-[#1a233a] font-medium whitespace-nowrap">{item.createdTime}</td>
              <td className="py-2 px-4 text-[#1a233a] font-medium whitespace-nowrap">{item.lastModifiedBy}</td>
              <td className="py-2 pr-4 pl-4 text-[#1a233a] font-medium whitespace-nowrap">{item.lastModifiedTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryControlTable;
