import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Store, Boxes, GripVertical, Box, Trash2, Plus, Upload, Bookmark, FileText, List } from 'lucide-react';
import { getInventoryItems } from '../../services/inventoryItemListApi';
import { createInventoryAdjustment } from '../../services/createInventoryAdjustmentApi';

const CreateInventoryControlPage = () => {
  const navigate = useNavigate();
  const [modeOfAdjustment, setModeOfAdjustment] = useState('QUANTITY');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [accountId, setAccountId] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  
  const [items, setItems] = useState([
    { item_name: '', inv_item_id: '', quantity_available: 0, new_quantity_on_hand: 0, quantity_adjusted: 0, previous_value: 0, new_value: 0, value_adjusted: 0 }
  ]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getInventoryItems({ limit: 100 });
        setInventoryItems(response.data || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { item_name: '', inv_item_id: '', quantity_available: 0, new_quantity_on_hand: 0, quantity_adjusted: 0, previous_value: 0, new_value: 0, value_adjusted: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    if (field === 'inv_item_id') {
      const selectedItem = inventoryItems.find(i => String(i.invItemId) === String(value));
      if (selectedItem) {
        if (modeOfAdjustment === 'QUANTITY') {
          newItems[index].quantity_available = selectedItem.openingStock || 0;
          newItems[index].new_quantity_on_hand = selectedItem.openingStock || 0;
          newItems[index].quantity_adjusted = 0;
        } else {
          newItems[index].previous_value = 0;
          newItems[index].new_value = 0;
          newItems[index].value_adjusted = 0;
        }
      }
    }
    
    if (modeOfAdjustment === 'QUANTITY' && (field === 'new_quantity_on_hand' || field === 'quantity_adjusted' || field === 'quantity_available')) {
        if (field === 'new_quantity_on_hand') {
            const newQty = parseFloat(value) || 0;
            newItems[index].quantity_adjusted = newQty - parseFloat(newItems[index].quantity_available || 0);
        } else if (field === 'quantity_adjusted') {
            const adj = parseFloat(value) || 0;
            newItems[index].new_quantity_on_hand = parseFloat(newItems[index].quantity_available || 0) + adj;
        } else if (field === 'quantity_available') {
            const qtyAvail = parseFloat(value) || 0;
            const newQty = parseFloat(newItems[index].new_quantity_on_hand || 0);
            newItems[index].quantity_adjusted = newQty - qtyAvail;
        }
    }
    
    if (modeOfAdjustment === 'VALUE' && (field === 'new_value' || field === 'value_adjusted' || field === 'previous_value')) {
        if (field === 'new_value') {
            const newVal = parseFloat(value) || 0;
            newItems[index].value_adjusted = newVal - parseFloat(newItems[index].previous_value || 0);
        } else if (field === 'value_adjusted') {
            const adj = parseFloat(value) || 0;
            newItems[index].new_value = parseFloat(newItems[index].previous_value || 0) + adj;
        } else if (field === 'previous_value') {
            const prevVal = parseFloat(value) || 0;
            const newVal = parseFloat(newItems[index].new_value || 0);
            newItems[index].value_adjusted = newVal - prevVal;
        }
    }
    
    setItems(newItems);
  };

  const handleSave = async (status = 'POSTED') => {
    try {
      setIsLoading(true);
      const payload = {
        adjustment_mode: modeOfAdjustment,
        reference_number: referenceNumber,
        adjustment_date: date,
        account_id: accountId ? parseInt(accountId) : null,
        reason: reason,
        description: description,
        status: status,
        items: items.map(item => ({
            inv_item_id: parseInt(item.inv_item_id),
            quantity_available: parseFloat(item.quantity_available || 0),
            new_quantity_on_hand: parseFloat(item.new_quantity_on_hand || 0),
            quantity_adjusted: parseFloat(item.quantity_adjusted || 0),
            previous_value: parseFloat(item.previous_value || 0),
            new_value: parseFloat(item.new_value || 0),
            value_adjusted: parseFloat(item.value_adjusted || 0),
        }))
      };
      await createInventoryAdjustment(payload);
      navigate('/inventory/control');
    } catch (error) {
      console.error("Save error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { name: 'Items', path: '/inventory', active: false },
    { name: 'Inventory Control', path: '/inventory/control', active: true }
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-[#f4f7f9] p-1.5 gap-1.5">
      {/* ── Sub Navigation ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap ${tab.active
                  ? 'text-[#1a233a] font-bold border-[#1a233a]'
                  : 'text-gray-500 font-medium border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.name}
              {tab.name === 'Items' && <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-400" />}
              {tab.name === 'Inventory Control' && <ChevronDown className="w-3.5 h-3.5 ml-1" />}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-hidden flex flex-col gap-1.5">

        {/* Top Banner with Stepper */}
        <div className="bg-white px-6 py-2 md:px-8 md:py-3 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
          <h2 className="text-[17px] md:text-[18px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            New Adjustment
          </h2>

          <div className="relative flex items-start justify-between w-64 md:w-72">
            {/* Connecting Line */}
            <div className="absolute top-4 left-16 right-16 h-[2px] bg-gray-200 z-0" />

            {/* Step 1: Inventory Control Creation */}
            <div className="flex flex-col items-center w-32 z-10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] ring-2 ring-pink-50 text-white flex items-center justify-center font-semibold relative shadow-sm bg-white">
                <Store className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="mt-2 text-[10px] md:text-[11px] font-semibold text-[#1a233a] text-center leading-tight whitespace-nowrap">Inventory Control Creation</span>
            </div>

            {/* Step 2: Inventory Adjust */}
            <div className="flex flex-col items-center w-32 z-10">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-semibold relative shadow-sm">
                <Boxes className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="mt-2 text-[10px] md:text-[11px] font-medium text-gray-500 text-center leading-tight whitespace-nowrap">Inventory Adjust</span>
            </div>
          </div>
        </div>

        {/* ── Scrollable Form Area ── */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 custom-scrollbar">
          <div className="flex flex-col gap-1.5">

            {/* New Adjustment Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1a233a]">Adjustment Details</h3>
              </div>

              <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Form */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-6 mb-2">
                    <label className="text-[13px] font-bold text-[#1a233a]">
                      Mode Of Adjustment <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center cursor-pointer text-[15px] text-[#1a233a] font-medium">
                        <div className={`flex items-center justify-center w-5 h-5 rounded-full mr-2.5 transition-all ${modeOfAdjustment === 'QUANTITY' ? 'bg-gradient-to-br from-[#ff3b30] to-[#b82db8]' : 'border border-gray-300'}`}>
                          {modeOfAdjustment === 'QUANTITY' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          checked={modeOfAdjustment === 'QUANTITY'}
                          onChange={() => {
                            setModeOfAdjustment('QUANTITY');
                            setItems([{ item_name: '', inv_item_id: '', quantity_available: 0, new_quantity_on_hand: 0, quantity_adjusted: 0, previous_value: 0, new_value: 0, value_adjusted: 0 }]);
                          }}
                        />
                        Quantity Adjustment
                      </label>
                      <label className="flex items-center cursor-pointer text-[15px] text-[#1a233a] font-medium">
                        <div className={`flex items-center justify-center w-5 h-5 rounded-full mr-2.5 transition-all ${modeOfAdjustment === 'VALUE' ? 'bg-gradient-to-br from-[#ff3b30] to-[#b82db8]' : 'border border-gray-300'}`}>
                          {modeOfAdjustment === 'VALUE' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          checked={modeOfAdjustment === 'VALUE'}
                          onChange={() => {
                            setModeOfAdjustment('VALUE');
                            setItems([{ item_name: '', inv_item_id: '', quantity_available: 0, new_quantity_on_hand: 0, quantity_adjusted: 0, previous_value: 0, new_value: 0, value_adjusted: 0 }]);
                          }}
                        />
                        Value Adjustment
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                        Reference Number
                      </label>
                      <input 
                        type="text" 
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        className="w-full border border-gray-200 rounded-md shadow-inner px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full border border-gray-200 rounded-md shadow-inner px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white placeholder-gray-400" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                        Account <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          value={accountId}
                          onChange={(e) => setAccountId(e.target.value)}
                          className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white text-gray-500"
                        >
                          <option value="">Select Account</option>
                          <option value="1">Inventory Asset</option>
                          <option value="2">Cost of Goods Sold</option>
                          <option value="3">Inventory Adjustment</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                        Reason <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white text-gray-500"
                        >
                          <option value="">Select Reason</option>
                          <option value="Stock on fire">Stock on fire</option>
                          <option value="Stolen goods">Stolen goods</option>
                          <option value="Damaged goods">Damaged goods</option>
                          <option value="Stock Written off">Stock Written off</option>
                          <option value="Inventory Revaluation">Inventory Revaluation</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-200 rounded-md shadow-inner px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white min-h-[60px] resize-y placeholder-gray-400"
                        placeholder="Enter description..."
                      ></textarea>
                      <div className="absolute bottom-2 right-3 text-[11px] text-gray-400">{description.length} / 500 Character</div>
                    </div>
                  </div>
                </div>

                {/* Right Upload Document */}
                <div className="lg:col-span-1">
                  <h3 className="text-[15px] font-bold text-[#1a233a] mb-3">Upload Document</h3>

                  {/* Outer Box */}
                  <div className="relative rounded-2xl p-5 flex flex-col gap-4">
                    {/* Faint Background Gradient for Outer Box */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f64f59]/5 via-[#c471ed]/5 to-[#5a32fa]/5 rounded-2xl pointer-events-none"></div>

                    {/* Gradient Dashed Border for Outer Box */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                      <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="15" fill="none" stroke="url(#uploadGrad)" strokeWidth="1.5" strokeDasharray="10 8" />
                      <defs>
                        <linearGradient id="uploadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f64f59" />
                          <stop offset="50%" stopColor="#c471ed" />
                          <stop offset="100%" stopColor="#5a32fa" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Front View Section */}
                    <div className="relative z-10 w-full flex flex-col">
                      <span className="text-[13px] font-medium text-[#1a233a] mb-2">Front View</span>

                      {/* Inner Box 1 */}
                      <div className="relative rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/40 transition-colors min-h-[90px]">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="11" fill="none" stroke="url(#uploadGrad)" strokeWidth="1" strokeDasharray="8 6" />
                        </svg>
                        <Upload className="w-5 h-5 text-gray-500 mb-1.5 relative z-10" strokeWidth={1.5} />
                        <span className="text-[12px] text-gray-600 font-medium relative z-10">Upload Front Image</span>
                      </div>
                    </div>

                    {/* Rear View Section */}
                    <div className="relative z-10 w-full flex flex-col">
                      <span className="text-[13px] font-medium text-[#1a233a] mb-2">Rear View</span>

                      {/* Inner Box 2 */}
                      <div className="relative rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/40 transition-colors min-h-[90px]">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="11" fill="none" stroke="url(#uploadGrad)" strokeWidth="1" strokeDasharray="8 6" />
                        </svg>
                        <Upload className="w-5 h-5 text-gray-500 mb-1.5 relative z-10" strokeWidth={1.5} />
                        <span className="text-[12px] text-gray-600 font-medium relative z-10">Upload Rear Image</span>
                      </div>
                    </div>

                  </div>
                  <p className="text-[11px] text-gray-500 mt-3 px-1">
                    Photos Of Damaged Stock, Count Sheets, Etc. — Up To 5 Files, 10MB Each.
                  </p>
                </div>
              </div>
            </div>

            {/* Item Table Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                    <List className="w-4 h-4" />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#1a233a]">Item Table</h3>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-[12px] font-medium text-[#1a233a] hover:bg-gray-50 transition-colors">
                  Bulk Action <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-5">
                <div className="overflow-x-auto border border-gray-100 rounded-lg mb-4">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-[#f9fafb] border-b border-gray-100 text-[12px]">
                        <th className="py-2.5 px-4 font-semibold text-gray-500 w-[40%]">Item Details</th>
                        <th className="py-2.5 px-4 font-semibold text-gray-500 text-center w-[20%]">{modeOfAdjustment === 'QUANTITY' ? 'Quantity Available' : 'Previous Value'}</th>
                        <th className="py-2.5 px-4 font-semibold text-gray-500 text-center w-[20%]">{modeOfAdjustment === 'QUANTITY' ? 'New Quantity On Hand' : 'New Value'}</th>
                        <th className="py-2.5 px-4 font-semibold text-gray-500 w-[20%]">Adjusted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                          <div className="w-7 h-7 rounded-md bg-gray-50 flex items-center justify-center border border-gray-200 shrink-0">
                            <Box className="w-3.5 h-3.5 text-[#1a233a]" />
                          </div>
                          <div className="relative flex-1">
                            <select
                              value={item.inv_item_id}
                              onChange={(e) => handleItemChange(index, 'inv_item_id', e.target.value)}
                              className="w-full border border-gray-200 rounded-md shadow-inner px-3 py-1.5 text-[13px] focus:outline-none focus:border-blue-400 bg-white appearance-none pr-8"
                            >
                              <option value="">Select item</option>
                              {inventoryItems.map((invItem) => (
                                <option key={invItem.invItemId} value={invItem.invItemId}>
                                  {invItem.itemName || `Item #${invItem.invItemId}`}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <input 
                            type="number" 
                            value={modeOfAdjustment === 'QUANTITY' ? item.quantity_available : item.previous_value}
                            onChange={(e) => handleItemChange(index, modeOfAdjustment === 'QUANTITY' ? 'quantity_available' : 'previous_value', e.target.value)}
                            className="w-full border border-gray-200 rounded-md shadow-inner px-3 py-1.5 text-[13px] focus:outline-none focus:border-blue-400 bg-white text-center" 
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input 
                            type="number" 
                            value={modeOfAdjustment === 'QUANTITY' ? item.new_quantity_on_hand : item.new_value}
                            onChange={(e) => handleItemChange(index, modeOfAdjustment === 'QUANTITY' ? 'new_quantity_on_hand' : 'new_value', e.target.value)}
                            className="w-full border border-gray-200 rounded-md shadow-inner px-3 py-1.5 text-[13px] focus:outline-none focus:border-blue-400 bg-white text-center" 
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <input 
                              type="number" 
                              value={modeOfAdjustment === 'QUANTITY' ? item.quantity_adjusted : item.value_adjusted}
                              onChange={(e) => handleItemChange(index, modeOfAdjustment === 'QUANTITY' ? 'quantity_adjusted' : 'value_adjusted', e.target.value)}
                              placeholder="Eg. +10 -10" 
                              className="flex-1 border border-gray-200 rounded-md shadow-inner px-3 py-1.5 text-[13px] focus:outline-none focus:border-blue-400 placeholder-gray-400 bg-white" 
                            />
                            <button 
                              onClick={() => handleRemoveItem(index)}
                              className="w-7 h-7 rounded-md bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-colors shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      ))}
                      {items.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center py-6 text-gray-400 text-sm">Click 'Add New Row' to add items.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between">
                  <button 
                    onClick={handleAddItem}
                    className="flex items-center gap-2 bg-[#1a233a] text-white px-3.5 py-1.5 rounded-md text-[12px] font-medium hover:bg-gray-800 transition-colors"
                  >
                    Add New Row <Plus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-gray-500">Items Selected Dynamically Synchronize With Central Ledger Accounts Automatically.</span>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>

      {/* ── Fixed Footer ── */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-3 flex justify-end items-center gap-3">
        <button
          onClick={() => navigate('/inventory/control')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button 
          onClick={() => handleSave('DRAFT')}
          disabled={isLoading}
          className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm disabled:opacity-50"
        >
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button
          onClick={() => handleSave('POSTED')}
          disabled={isLoading}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </main>
  );
};

export default CreateInventoryControlPage;
