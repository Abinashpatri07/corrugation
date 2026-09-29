import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Loader2 } from 'lucide-react';
import { getInventoryItems } from '../../services/inventoryItemListApi';

const InventoryTable = () => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState([]); // Do not expand any row by default
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getInventoryItems();
        if (response.success) {
          setItems(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-red-500 font-medium">
        Error loading items: {error}
      </div>
    );
  }

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
          {items.length === 0 ? (
            <tr>
              <td colSpan="8" className="py-8 text-center text-gray-500">
                No inventory items found.
              </td>
            </tr>
          ) : items.map((item) => {
            const isExpanded = expandedRows.includes(item.invItemId);
            
            // Format value safely
            let itemValue = "0.00";
            if (item.openingStock && item.openingStockRate) {
               itemValue = (Number(item.openingStock) * Number(item.openingStockRate)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else if (item.purPrice) {
               itemValue = Number(item.purPrice).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            // Map frontend presentation
            const presItem = {
              id: item.invItemId,
              itemName: `${item.itemName} (${item.itemCode})`,
              availableFull: '-',
              fullWeight: '-',
              availablePartial: '-',
              partialWeight: '-',
              availableWeight: `${Number(item.openingStock || 0)} ${item.unit || ''}`,
              value: itemValue,
              breakdown: [
                { 
                  id: `${item.invItemId}-1`, 
                  plant: 'Bangalore', 
                  availableFull: '-', 
                  availablePartial: '-', 
                  availableWeight: `${Number(item.openingStock || 0)} ${item.unit || ''}`, 
                  value: itemValue 
                }
              ]
            };

            return (
              <React.Fragment key={presItem.id}>
                {/* Main Row */}
                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px]">
                  <td className="py-4 pl-8 pr-2">
                    <button onClick={() => toggleRow(presItem.id)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </td>
                  <td 
                    className="py-4 px-6 text-blue-500 font-medium cursor-pointer hover:underline"
                    onClick={() => navigate(`/inventory/${presItem.id}`)}
                  >
                    {presItem.itemName}
                  </td>
                  <td className="py-4 px-6 text-[#1a233a] font-medium">{presItem.availableFull}</td>
                  <td className="py-4 px-6 text-[#1a233a] font-medium">{presItem.fullWeight}</td>
                  <td className="py-4 px-6 text-[#1a233a] font-medium">{presItem.availablePartial}</td>
                  <td className="py-4 px-6 text-[#1a233a] font-medium">{presItem.partialWeight}</td>
                  <td className="py-4 px-6 text-[#1a233a] font-medium">{presItem.availableWeight}</td>
                  <td className="py-4 pr-8 pl-6 text-[#1a233a] font-medium">{presItem.value}</td>
                </tr>

                {/* Expanded Row Content */}
                {isExpanded && presItem.breakdown && presItem.breakdown.length > 0 && (
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
                            {presItem.breakdown.map((plantItem, idx) => (
                              <tr key={plantItem.id} className={`${idx !== presItem.breakdown.length - 1 ? 'border-b border-gray-100' : ''} text-[13px]`}>
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
