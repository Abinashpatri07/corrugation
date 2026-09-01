import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown, Plus, Minus, GripVertical, Bookmark, Check, HandCoins
} from 'lucide-react';

const CreatePurchaseOrderPage = () => {
  const navigate = useNavigate();

  const [customerType, setCustomerType] = useState('Organization');
  const [rows, setRows] = useState([{ id: 1 }]);

  const addRow = () => setRows(prev => [...prev, { id: Date.now() }]);
  const removeRow = (id) => setRows(prev => prev.filter(r => r.id !== id));

  const tabs = ['Expenses', 'Procurement', 'Purchase Order', 'Bills', 'Payment'];
  const activeTab = 'Purchase Order';

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-[#f4f7f9] p-1.5 gap-1.5">
      {/* ── Sub Navigation ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => navigate('/purchase', { state: { activeTab: tab } })}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab
                  ? 'text-[#1a233a] font-bold border-[#1a233a]'
                  : 'text-gray-500 font-medium border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-hidden flex flex-col gap-1.5">

        {/* Top Banner with Stepper */}
        <div className="bg-white px-6 py-2 md:px-8 md:py-3 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
          <h2 className="text-[17px] md:text-[18px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            Create Purchase Order
          </h2>

          <div className="flex items-center gap-0">
            {/* Step 1: Procurement */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-green-400 ring-2 ring-green-100 text-white flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-green-600">Procurement</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-green-400 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 2: Purchase order */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] ring-2 ring-pink-50 text-white flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-[10px] md:text-[11px] font-semibold text-[#1a233a] text-center leading-tight">Purchase order</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-gray-200 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 3: Bill */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-[10px] md:text-[11px] font-medium text-gray-500">Bill</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-gray-200 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 4: Payment */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <HandCoins className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="text-[10px] md:text-[11px] font-medium text-gray-500">Payment</span>
            </div>
          </div>
        </div>

        {/* ── Scrollable Form Area ── */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 custom-scrollbar">

          {/* ── Section 1: Product Details ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 shrink-0">
            <h3 className="text-[15px] font-bold text-[#1a233a] mb-4">Product Details</h3>


          <div className="grid grid-cols-2 gap-x-8 gap-y-4">

            {/* Customer Type */}
            <div className="col-span-2 flex items-center min-w-0">
              <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Customer Type <span className="text-red-500">*</span></label>
              <div className="flex items-center space-x-6">
                {['Organization', 'Customer'].map(type => (
                  <label key={type} className="flex items-center cursor-pointer text-[13px] text-gray-700 font-medium">
                    <div className={`flex items-center justify-center w-5 h-5 rounded-full mr-2.5 transition-all ${customerType === type ? 'bg-gradient-to-br from-[#ff3b30] to-[#b82db8]' : 'border border-gray-300'}`}>
                      {customerType === type && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={customerType === type}
                      onChange={() => setCustomerType(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Vendor */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#1a233a]">Vendor <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
            </div>

            {/* Purchase Order */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#1a233a]">Purchase Order</label>
              <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
            </div>

            {/* Order Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#1a233a]">Order Date <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
            </div>

            {/* Delivery Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#1a233a]">Delivery Date</label>
              <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
            </div>

            {/* Payment Terms */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#1a233a]">Payment Terms</label>
              <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
            </div>

            {/* Reference */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#1a233a]">Reference</label>
              <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
            </div>

            {/* Shipment Preference */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#1a233a]">Shipment Preference</label>
              <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
            </div>

            {/* Delivery Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#1a233a]">Delivery Address</label>
              <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
            </div>

          </div>
        </div>

        {/* ── Item Table ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[15px] font-bold text-[#1a233a]">Item Table</h2>
            <div className="relative">
              <button className="flex items-center gap-2 border border-gray-200 rounded-md px-4 py-2 text-[13px] font-semibold text-[#1a233a] bg-white hover:bg-gray-50 transition-colors shadow-sm">
                Bulk Action <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Table header */}
          <div className="grid gap-2 border-b border-gray-200 pb-2 mb-1"
            style={{ gridTemplateColumns: '32px 1fr 180px 130px 120px 120px 36px' }}>
            <div />
            <div className="text-[11px] font-semibold text-gray-500">Item Details</div>
            <div className="text-[11px] font-semibold text-gray-500">Account</div>
            <div className="text-[11px] font-semibold text-gray-500">Quantity</div>
            <div className="text-[11px] font-semibold text-gray-500">Rate</div>
            <div className="text-[11px] font-semibold text-gray-500">Amount</div>
            <div />
          </div>

          {/* Table rows */}
          {rows.map(row => (
            <div key={row.id} className="grid gap-2 items-center py-1.5 border-b border-gray-100"
              style={{ gridTemplateColumns: '32px 1fr 180px 130px 120px 120px 36px' }}>
              <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />

              {/* Item Details */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#d54a88] to-[#402de8] flex items-center justify-center text-white shadow-sm shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                  </svg>
                </div>
                <input type="text" className="flex-1 border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
              </div>

              {/* Account */}
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-md shadow-sm px-2 py-2 text-[12px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                  <option></option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>

              {/* Quantity */}
              <div className="flex items-center border border-gray-200 rounded-md shadow-sm overflow-hidden">
                <button className="px-2 py-2 hover:bg-gray-100 transition-colors text-gray-500">
                  <Minus className="w-3 h-3" />
                </button>
                <input type="number" defaultValue="1" className="flex-1 text-center text-[12px] py-2 focus:outline-none w-10" />
                <button className="px-2 py-2 hover:bg-gray-100 transition-colors text-gray-500">
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Rate */}
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-gray-400 text-[12px]">₹</span>
                <input type="number" className="w-full border border-gray-200 rounded-md shadow-sm pl-6 pr-2 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
              </div>

              {/* Amount */}
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-gray-400 text-[12px]">₹</span>
                <input type="number" className="w-full border border-gray-200 rounded-md shadow-sm pl-6 pr-2 py-2 text-[12px] focus:outline-none focus:border-blue-500 bg-gray-50" readOnly />
              </div>

              {/* Remove row */}
              <button onClick={() => removeRow(row.id)} className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none flex justify-center">
                ×
              </button>
            </div>
          ))}

          {/* Add Row + note */}
          <div className="flex items-center justify-between mt-3">
            <button onClick={addRow} className="flex items-center gap-1.5 text-[11px] text-white bg-black rounded-md px-3 py-1.5 hover:bg-gray-800 transition-colors font-semibold">
              Add new row <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
            <p className="text-[10px] text-gray-400">Items Selected Dynamically Synchronize With Central Ledger Accounts Automatically.</p>
          </div>
        </div>

        {/* ── Invoice Totals Console ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 shrink-0">
          <h2 className="text-[15px] font-bold text-[#1a233a] mb-5">Invoice Totals Console</h2>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Charges */}
            <div>
              <label className="block text-[13px] font-semibold text-[#1a233a] mb-2">Charges</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 text-[13px]">₹</span>
                <input type="text" defaultValue="20,00,00" className="w-full border border-gray-200 rounded-md shadow-sm pl-7 pr-12 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
                <span className="absolute right-3 top-2 text-gray-400 text-[13px]">INR</span>
              </div>
            </div>

            {/* Trade / Other Allowances */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-semibold text-[#1a233a]">Trade / Other Allowances</label>
                <div className="flex border border-gray-200 rounded shadow-sm overflow-hidden">
                  <button className="px-2 py-0.5 text-[11px] font-semibold bg-white text-gray-600 hover:bg-gray-50">%</button>
                  <button className="px-2 py-0.5 text-[11px] font-semibold bg-gradient-to-r from-[#d54a88] to-[#ff7a59] text-white border-l border-gray-200">₹</button>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 text-[13px]">₹</span>
                <input type="text" defaultValue="20,00,00" className="w-full border border-gray-200 rounded-md shadow-sm pl-7 pr-12 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
                <span className="absolute right-3 top-2 text-gray-400 text-[13px]">INR</span>
              </div>
            </div>

            {/* Volume Adjustment */}
            <div>
              <label className="block text-[13px] font-semibold text-[#1a233a] mb-2">Volume Adj.</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 text-[13px]">₹</span>
                <input type="text" defaultValue="50,00,00" className="w-full border border-gray-200 rounded-md shadow-sm pl-7 pr-12 py-2 text-[13px] focus:outline-none focus:border-blue-500" />
                <span className="absolute right-3 top-2 text-gray-400 text-[13px]">INR</span>
              </div>
            </div>
          </div>

          {/* Grand Total */}
          <div className="bg-gradient-to-r from-[#fff0f5] to-[#f3f0ff] rounded-xl px-5 py-3.5 flex justify-between items-center border border-[#f0eaff]">
            <div>
              <div className="text-[14px] font-bold text-[#1a233a]">Grand Total</div>
              <div className="text-[11px] text-gray-500 mt-0.5">(Charges - Allowances + Adjustment)</div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="bg-[#e9dbfa] text-[#6b2cc4] text-[9px] font-bold px-1.5 py-0.5 rounded">INR</span>
              <span className="text-[18px] font-bold text-[#5a32ea]">₹7,20,951.00</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Section: Notes + Terms ── */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 shrink-0 mb-4">
          {/* Customer Note */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5">
            <h2 className="text-[15px] font-bold text-gray-900 mb-3">Customer Note</h2>
            <textarea
              rows={5}
              className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2.5 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-300"
              placeholder="Enter your note here..."
            />
            <div className="flex justify-between mt-2">
              <p className="text-[11px] text-gray-400">It Will Not Be Shown In PDF</p>
              <p className="text-[11px] text-gray-400">0 / 500 Character</p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5">
            <h2 className="text-[15px] font-bold text-gray-900 mb-3">Terms &amp; Conditions</h2>
            
            <div className="border border-gray-200 rounded-md shadow-sm overflow-hidden">
              {/* Toolbar */}
              <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-4">
                <button className="text-gray-400 hover:text-gray-600 font-serif font-bold text-[14px]">B</button>
                <button className="text-gray-400 hover:text-gray-600 font-serif italic text-[14px]">I</button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01" /></svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </button>
              </div>
              
              {/* Textarea */}
              <textarea
                rows={3}
                className="w-full px-3 py-2.5 text-[13px] text-gray-600 focus:outline-none border-none placeholder-gray-300"
                placeholder="Enter terms & conditions..."
              />
            </div>
            
            <div className="flex justify-between mt-2">
              <p className="text-[11px] text-gray-400">It Will Not Be Shown In PDF</p>
              <p className="text-[11px] text-gray-400">0 / 1000 Character</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* ── Fixed Footer ── */}
      {/* ── Fixed Footer ── */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-3 flex justify-end items-center gap-3">
        <button 
          onClick={() => navigate('/purchase')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button 
          onClick={() => navigate('/purchase')}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-colors"
        >
          Save
        </button>
      </div>

    </main>
  );
};

export default CreatePurchaseOrderPage;
