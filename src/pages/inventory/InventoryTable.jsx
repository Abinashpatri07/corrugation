import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const mockInventory = [
  {
    id: 1,
    itemName: 'NS-89-180.18',
    availableFull: '10',
    fullWeight: '1,400 Kg',
    availablePartial: '3',
    partialWeight: '100 Kg',
    availableWeight: '1,500 Kg',
    value: '10,00,000',
    breakdown: [
      { id: 101, plant: 'Bangalore', availableFull: '7', availablePartial: '1', availableWeight: '1000', value: '8,00,000' },
      { id: 102, plant: 'Pune', availableFull: '3', availablePartial: '2', availableWeight: '', value: '' },
    ]
  },
  {
    id: 2,
    itemName: 'KP-42-150.09',
    availableFull: '18',
    fullWeight: '2,520 Kg',
    availablePartial: '5',
    partialWeight: '280 Kg',
    availableWeight: '2,800 Kg',
    value: '16,80,000',
    breakdown: []
  }
];

const InventoryTable = () => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState([]); // Do not expand any row by default

  const toggleRow = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#f4f6f8] border-b border-gray-200 text-[13px]">
            <th className="py-4 pl-8 pr-2 w-10"></th>
            <th className="py-4 px-6 font-bold text-[#6b778c] whitespace-nowrap">Item Name</th>
            <th className="py-4 px-6 font-bold text-[#6b778c] whitespace-nowrap">Available Full</th>
            <th className="py-4 px-6 font-bold text-[#6b778c] whitespace-nowrap">Full Weight</th>
            <th className="py-4 px-6 font-bold text-[#6b778c] whitespace-nowrap">Available Partial</th>
            <th className="py-4 px-6 font-bold text-[#6b778c] whitespace-nowrap">Partial Weight</th>
            <th className="py-4 px-6 font-bold text-[#6b778c] whitespace-nowrap">Available Weight</th>
            <th className="py-4 pr-8 pl-6 font-bold text-[#6b778c] whitespace-nowrap">Value</th>
          </tr>
        </thead>
        <tbody>
          {mockInventory.map((item) => {
            const isExpanded = expandedRows.includes(item.id);
            return (
              <React.Fragment key={item.id}>
                {/* Main Row */}
                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px]">
                  <td className="py-4 pl-8 pr-2">
                    <button onClick={() => toggleRow(item.id)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </td>
                  <td 
                    className="py-4 px-6 text-blue-500 font-medium cursor-pointer hover:underline"
                    onClick={() => navigate(`/inventory/${item.id}`)}
                  >
                    {item.itemName}
                  </td>
                  <td className="py-4 px-6 text-[#1a233a] font-medium">{item.availableFull}</td>
                  <td className="py-4 px-6 text-[#1a233a] font-medium">{item.fullWeight}</td>
                  <td className="py-4 px-6 text-[#1a233a] font-medium">{item.availablePartial}</td>
                  <td className="py-4 px-6 text-[#1a233a] font-medium">{item.partialWeight}</td>
                  <td className="py-4 px-6 text-[#1a233a] font-medium">{item.availableWeight}</td>
                  <td className="py-4 pr-8 pl-6 text-[#1a233a] font-medium">{item.value}</td>
                </tr>

                {/* Expanded Row Content */}
                {isExpanded && item.breakdown && item.breakdown.length > 0 && (
                  <tr className="bg-white">
                    <td colSpan="8" className="px-8 py-4 border-b border-gray-100">
                      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-white px-5 py-4 border-b border-gray-200">
                          <h4 className="text-[14px] font-bold text-gray-500">Plant-Wise Breakdown</h4>
                        </div>
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-[#f9fafb] text-[12px] border-b border-gray-100">
                              <th className="py-3 px-6 font-bold text-[#6b778c] w-[20%]">Plant</th>
                              <th className="py-3 px-6 font-bold text-[#6b778c] w-[20%]">Available Full</th>
                              <th className="py-3 px-6 font-bold text-[#6b778c] w-[20%]">Available Partial</th>
                              <th className="py-3 px-6 font-bold text-[#6b778c] w-[20%]">Available Weight</th>
                              <th className="py-3 px-6 font-bold text-[#6b778c] w-[20%]">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.breakdown.map((plantItem, idx) => (
                              <tr key={plantItem.id} className={`${idx !== item.breakdown.length - 1 ? 'border-b border-gray-100' : ''} text-[13px]`}>
                                <td className="py-4 px-6 text-[#1a233a] font-medium">{plantItem.plant}</td>
                                <td className="py-4 px-6 text-[#1a233a] font-medium">{plantItem.availableFull}</td>
                                <td className="py-4 px-6 text-[#1a233a] font-medium">{plantItem.availablePartial}</td>
                                <td className="py-4 px-6 text-[#1a233a] font-medium">{plantItem.availableWeight}</td>
                                <td className="py-4 px-6 text-[#1a233a] font-medium">{plantItem.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
