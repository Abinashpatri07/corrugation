import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown, Plus, Minus, GripVertical, Bookmark, Check, HandCoins, UploadCloud, User, Trash2
} from 'lucide-react';

const CreateBillPage = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([{ id: 1 }]);

  const addRow = () => setRows(prev => [...prev, { id: Date.now() }]);
  const removeRow = (id) => setRows(prev => prev.filter(r => r.id !== id));

  const tabs = ['Expenses', 'Procurement', 'Purchase Order', 'Bills', 'Payment'];
  const activeTab = 'Bills';

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
            Create Bill
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
              <div className="w-8 h-8 rounded-full bg-green-400 ring-2 ring-green-100 text-white flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-green-600">Purchase order</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-green-400 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 3: Bill (Active) */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] ring-2 ring-pink-50 text-white flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-[10px] md:text-[11px] font-semibold text-[#1a233a] text-center leading-tight">Bill</span>
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
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 custom-scrollbar">

          {/* ── Section 1: Bill Header ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5 shrink-0">
            <h3 className="text-[16px] font-bold text-[#1a233a] mb-5">Vendor Name</h3>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              
              {/* Vendor Name */}
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-gray-600">Vendor Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-blue-200 rounded-md bg-[#f8faff] text-blue-600 pl-3 pr-10 py-2.5 text-[13px] shadow-sm focus:outline-none focus:border-blue-500 appearance-none">
                    <option>ZAP Private Limited</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-blue-600 pointer-events-none" />
                </div>
                
                {/* Billing Address Card */}
                <div className="mt-3 w-[300px] border border-blue-200 rounded-lg p-4 bg-[#f8faff] shadow-sm">
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1a233a]">Mr Ramnath</h4>
                      <p className="text-[13px] text-[#1a233a] leading-relaxed mt-1">
                        Silk Board<br/>
                        Bangalore<br/>
                        Karnataka 560068<br/>
                        India<br/>
                        Phone: +91-9876543222
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bill# */}
              <div className="flex items-center gap-4">
                <label className="w-32 text-[12px] font-bold text-gray-700 shrink-0">Bill <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Bill Number" className="flex-1 border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
              </div>

              {/* Order Number */}
              <div className="flex items-center gap-4">
                <label className="w-32 text-[12px] font-bold text-gray-700 shrink-0">Order Number <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Order Number" className="flex-1 border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
              </div>

              {/* Bill Date */}
              <div className="flex items-center gap-4">
                <label className="w-32 text-[12px] font-bold text-gray-700 shrink-0">Bill Date <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Bill Date" className="flex-1 border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-4">
                <label className="w-32 text-[12px] font-bold text-gray-700 shrink-0">Due Date <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Due Date" className="flex-1 border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
              </div>

              {/* Accounts Payable */}
              <div className="flex items-center gap-4">
                <label className="w-32 text-[12px] font-bold text-gray-700 shrink-0">Accounts Payable</label>
                <input type="text" className="flex-1 border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
              </div>

              {/* Subject */}
              <div className="flex items-center gap-4">
                <label className="w-32 text-[12px] font-bold text-gray-700 shrink-0">Subject</label>
                <input type="text" placeholder="Enter 250 Character Subject" className="flex-1 border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
              </div>

            </div>
          </div>

          {/* ── Item Table ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5 shrink-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[16px] font-bold text-[#1a233a]">Item Table</h2>
              <div className="relative">
                <button className="flex items-center gap-2 border border-gray-200 rounded-md px-4 py-1.5 text-[12px] font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                  Bulk Action <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Table header */}
            <div className="grid gap-2 border-b border-gray-200 pb-2 mb-2"
              style={{ gridTemplateColumns: '32px 1fr 140px 140px 180px 140px 32px' }}>
              <div />
              <div className="text-[12px] font-semibold text-gray-500">Item Details</div>
              <div className="text-[12px] font-semibold text-gray-500">Quantity</div>
              <div className="text-[12px] font-semibold text-gray-500">Rate</div>
              <div className="text-[12px] font-semibold text-gray-500">Customer Details</div>
              <div className="text-[12px] font-semibold text-gray-500">Amount</div>
              <div />
            </div>

            {/* Table rows */}
            {rows.map(row => (
              <div key={row.id} className="grid gap-2 items-center py-2"
                style={{ gridTemplateColumns: '32px 1fr 140px 140px 180px 140px 32px' }}>
                <GripVertical className="w-4 h-4 text-gray-300 cursor-grab mx-auto" />

                {/* Item Details */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#d54a88] to-[#ff7a59] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                    </svg>
                  </div>
                  <input type="text" className="flex-1 border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
                </div>

                {/* Quantity */}
                <div className="flex items-center border border-gray-200 rounded-md shadow-sm overflow-hidden bg-white">
                  <button className="px-2 py-2 hover:bg-gray-50 text-gray-400">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input type="number" defaultValue="1" className="flex-1 text-center text-[12px] py-2 focus:outline-none w-10 border-none" />
                  <button className="px-2 py-2 hover:bg-gray-50 text-gray-400">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Rate */}
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400 text-[12px]">₹</span>
                  <input type="number" className="w-full border border-gray-200 rounded-md shadow-sm pl-7 pr-3 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
                </div>

                {/* Customer Details */}
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm pl-8 pr-3 py-2 text-[12px] focus:outline-none focus:border-blue-500" />
                </div>

                {/* Amount */}
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400 text-[12px]">₹</span>
                  <input type="number" className="w-full border border-gray-200 rounded-md shadow-sm pl-7 pr-3 py-2 text-[12px] focus:outline-none focus:border-blue-500 bg-gray-50" readOnly />
                </div>

                {/* Remove row */}
                <button onClick={() => removeRow(row.id)} className="w-7 h-7 rounded bg-red-50 text-red-400 shadow-sm hover:text-red-500 hover:bg-red-100 transition-colors flex items-center justify-center mx-auto">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add Row + note */}
            <div className="flex justify-between items-center mt-6 border-t border-gray-100 pt-4">
              <button onClick={addRow} className="flex items-center gap-1.5 text-[12px] text-white bg-gradient-to-r from-[#ff7a59] to-[#d54a88] rounded-md px-4 py-2 hover:opacity-90 transition-opacity font-semibold shadow-sm">
                Add new row <Plus className="w-3.5 h-3.5" strokeWidth={3} />
              </button>
              <p className="text-[10px] text-gray-400">Items Selected Dynamically Synchronize With Central Ledger Accounts Automatically.</p>
            </div>
          </div>

          {/* ── Bottom Section ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-6 shrink-0 pb-4">
            
            {/* Left Column: Upload & Remarks */}
            <div className="flex flex-col gap-4">
              
              {/* Upload Box */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                  <UploadCloud className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#1a233a]">click here to Upload</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Supporting Format IMG, PDF, JPG, PNG Format (Max 10 Mb)</p>
                </div>
              </div>

              {/* Remarks */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex-1 flex flex-col">
                <h3 className="text-[15px] font-bold text-[#1a233a] mb-4">Remarks & Note</h3>
                <textarea 
                  className="w-full flex-1 border border-gray-200 rounded-md shadow-sm p-3 text-[13px] resize-none focus:outline-none focus:border-blue-500 min-h-[120px]" 
                  placeholder="Enter remarks..."
                />
                <p className="text-[11px] text-gray-400 mt-3">It Will Not Be Shown In PDF</p>
              </div>

            </div>

            {/* Right Column: Invoice Totals */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col">
              <h3 className="text-[16px] font-bold text-[#1a233a] mb-6">Invoice Totals</h3>

              <div className="flex justify-between items-center text-[13px] font-bold text-[#1a233a] mb-6">
                <span>Total Quantity : 1</span>
              </div>

              <div className="flex items-center gap-4 mb-6 text-[12px] font-bold text-gray-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="tax_type" className="w-3.5 h-3.5 text-pink-500 shadow-sm" />
                  TDS
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-[#d54a88]">
                  <input type="radio" name="tax_type" className="w-3.5 h-3.5 accent-[#d54a88] shadow-sm" defaultChecked />
                  TCS
                </label>
              </div>

              <div className="flex flex-col gap-5 flex-1">
                {/* Discount */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[12px] font-bold text-[#1a233a]">Discount</label>
                    <div className="flex border border-gray-200 rounded shadow-sm overflow-hidden">
                      <button className="px-2 py-0.5 text-[11px] font-bold text-gray-500 bg-white hover:bg-gray-50">%</button>
                      <button className="px-2 py-0.5 text-[11px] font-bold text-white bg-gradient-to-r from-[#d54a88] to-[#ff7a59]">₹</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <input type="text" defaultValue="0.00" className="w-[70%] border border-gray-200 shadow-sm rounded-md px-3 py-2 text-[12px] focus:outline-none" />
                    <span className="text-[13px] font-bold text-[#1a233a]">0.00</span>
                  </div>
                </div>

                {/* Tax */}
                <div>
                  <label className="block text-[12px] font-bold text-[#1a233a] mb-2">Tax</label>
                  <div className="flex items-center justify-between">
                    <div className="relative w-[70%]">
                      <select className="w-full border border-gray-200 rounded-md shadow-sm pl-3 pr-8 py-2 text-[12px] focus:outline-none appearance-none bg-white text-gray-400">
                        <option>Select Tax</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    </div>
                    <span className="text-[13px] font-bold text-[#1a233a]">- 0.00</span>
                  </div>
                </div>
              </div>

              {/* Grand Total */}
              <div className="mt-6 bg-[#f8f5ff] rounded-xl px-5 py-4 shadow-sm border border-[#eee8fc] flex justify-between items-center">
                <div>
                  <div className="text-[15px] font-bold text-[#1a233a]">Grand Total</div>
                  <div className="text-[10px] text-gray-500 mt-1">(Charges - Allowances + Adjustment)</div>
                </div>
                <div className="text-[20px] font-bold text-[#5a32ea]">
                  ₹7,20,951.00
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

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

export default CreateBillPage;
