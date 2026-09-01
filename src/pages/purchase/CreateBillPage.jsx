import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, Bookmark, UploadCloud, Calendar, User, FileText, Plus, GripVertical, CheckCircle, Percent } from 'lucide-react';

const CreateBillPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f4f7f9] p-1.5 gap-1.5">
      
      {/* ── Sub Navigation ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {['Expenses', 'Procurement', 'Purchase Order', 'Bills', 'Payment'].map(tab => (
            <button
              key={tab}
              onClick={() => navigate('/purchase', { state: { activeTab: tab } })}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap
                ${tab === 'Bills'
                  ? 'border-[#1a233a] text-[#1a233a] font-bold'
                  : 'border-transparent text-gray-500 font-medium hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Scrollable Form Body ── */}
      <div className="flex-1 overflow-y-auto relative bg-[#f8fafc]">
        
        {/* ── Sticky Header Wrapper ── */}
        <div className="sticky top-0 z-50 px-8 pt-6 pb-2 bg-[#f8fafc]">
          <div className="bg-[#254754] text-white px-8 py-5 rounded-2xl flex items-center justify-between shadow-sm">
            <h1 className="text-[22px] font-bold">Create Bills</h1>

            {/* Workflow steps */}
            <div className="flex items-center">
              {/* Step 1: Expenses (Completed) */}
              <div className="flex items-center gap-2 bg-[#dcfce7] text-[#16a34a] rounded-full px-4 py-1.5 shadow-sm">
                <div className="w-5 h-5 rounded-full border border-[#16a34a] flex items-center justify-center">
                  <FileText className="w-3 h-3 text-[#16a34a]" />
                </div>
                <span className="text-[13px] font-semibold">Expenses</span>
              </div>

              {/* Line */}
              <div className="w-6 h-[1px] bg-gray-400"></div>

              {/* Step 2: Bills (Active) */}
              <div className="flex items-center gap-2 bg-white text-[#254754] rounded-full px-4 py-1.5 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-[#254754] flex items-center justify-center">
                  <FileText className="w-3 h-3 text-white" />
                </div>
                <span className="text-[13px] font-semibold">Bills</span>
              </div>

              {/* Line */}
              <div className="w-6 h-[1px] bg-gray-400"></div>

              {/* Step 3: Payment (Upcoming) */}
              <div className="flex items-center gap-2 bg-[#5b8a9e] text-white rounded-full px-4 py-1.5 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#5b8a9e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[13px] font-semibold">Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Form Layout ── */}
        <div className="px-8 pb-24 pt-4 space-y-6">
          
          {/* Bill Header */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden p-8">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3b82f6]" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-[18px] font-bold text-[#1e293b]">Bill Header</h2>
                <p className="text-[12px] text-gray-500">Core identification and posting details</p>
              </div>
              <span className="px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[11px] font-bold rounded-full border border-green-200">
                Draft — Auto-saving
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <div className="col-span-2">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Vendor Name <span className="text-gray-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md pl-3 pr-10 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 appearance-none bg-white">
                    <option></option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Bill# <span className="text-gray-500">*</span></label>
                <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Order Number<span className="text-gray-500">*</span></label>
                <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Bill Date <span className="text-gray-500">*</span></label>
                <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Due Date<span className="text-gray-500">*</span></label>
                <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Accounts Payable <span className="text-gray-500">*</span></label>
                <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Payment Terms <span className="text-gray-500">*</span></label>
                <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
              </div>

              <div className="col-span-2">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Subject <span className="text-red-500">*</span></label>
                <textarea rows={3} placeholder="Enter subject within 250 words" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* Item Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden p-8">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3b82f6]" />
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[18px] font-bold text-[#1e293b]">Item Table</h2>
              <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-[13px] font-semibold hover:bg-blue-50">
                Bulk Action <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full overflow-x-auto border-b border-gray-200 pb-2 mb-4">
              <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 font-medium text-gray-500 text-[13px] w-8"></th>
                    <th className="py-3 font-medium text-gray-500 text-[13px] w-64">Item Details</th>
                    <th className="py-3 font-medium text-gray-500 text-[13px] w-48">Account</th>
                    <th className="py-3 font-medium text-gray-500 text-[13px] w-32">Quantity</th>
                    <th className="py-3 font-medium text-gray-500 text-[13px] w-32">Rate</th>
                    <th className="py-3 font-medium text-gray-500 text-[13px] w-48">Customer Details</th>
                    <th className="py-3 font-medium text-gray-500 text-[13px]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-transparent">
                    <td className="py-3 pr-2">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-2">
                        <div className="w-9 h-9 rounded bg-[#f1f5f9] flex items-center justify-center shrink-0">
                          <div className="w-4 h-4 bg-indigo-500 rounded-sm"></div>
                        </div>
                        <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px]" />
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="relative">
                        <select className="w-full border border-gray-200 rounded-md pl-3 pr-8 py-2 text-[13px] appearance-none bg-white">
                          <option></option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button className="px-2 text-gray-500 hover:bg-gray-50">-</button>
                        <input type="text" className="w-full text-center py-2 text-[13px] outline-none" />
                        <button className="px-2 text-gray-500 hover:bg-gray-50">+</button>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-[13px] text-gray-500">₹</span>
                        <input type="text" className="w-full border border-gray-200 rounded-md pl-7 pr-3 py-2 text-[13px]" />
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="relative">
                        <select className="w-full border border-gray-200 rounded-md pl-3 pr-8 py-2 text-[13px] appearance-none bg-white">
                          <option></option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-[13px] text-gray-500">₹</span>
                        <input type="text" className="w-full border border-gray-200 rounded-md pl-7 pr-3 py-2 text-[13px]" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-2">
              <button className="flex items-center gap-2 text-blue-600 text-[13px] font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200">
                Add New Row <Plus className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-gray-500">Items Selected Dynamically Synchronize With Central Ledger Accounts Automatically.</p>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-6">
            
            {/* Left Col: Upload & Remarks */}
            <div className="space-y-6">
              
              {/* Receipts Dropzone */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center p-12">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#a5f3fc]" />
                <div className="absolute inset-2 border-2 border-dashed border-blue-200 bg-[#f4fbff] rounded-xl z-0" />
                <div className="z-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <UploadCloud className="w-6 h-6 text-blue-500" />
                  </div>
                  <h4 className="text-[16px] font-semibold text-[#1e293b] mb-1">Drag or Drop your Receipts</h4>
                  <p className="text-[12px] text-gray-500 mb-6">Maximum file size allowed is 10MB</p>
                  <button className="bg-blue-600 text-white font-semibold text-[13px] px-6 py-2 rounded-full shadow-sm hover:bg-blue-700">
                    Upload Your Files
                  </button>
                </div>
              </div>

              {/* Remarks */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden p-6">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3b82f6]" />
                <h3 className="text-[16px] font-bold text-[#1e293b] mb-4">Remarks & Note</h3>
                <textarea rows={6} className="w-full border border-gray-200 rounded-md p-3 text-[13px] focus:outline-none focus:border-blue-500 resize-none"></textarea>
                <p className="text-[11px] text-gray-500 mt-2">It Will Not Be Shown In PDF</p>
              </div>

            </div>

            {/* Right Col: Totals Console */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden p-6 flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3b82f6]" />
              <h3 className="text-[18px] font-bold text-[#1a233a] mb-6">Invoice Totals Console</h3>
              
              <div className="space-y-5 flex-1">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[13px] font-bold text-[#1a233a]">Discount</label>
                    <div className="flex border border-gray-200 rounded-md overflow-hidden bg-white">
                      <button className="px-2 py-0.5 text-[12px] text-gray-600 hover:bg-gray-50 border-r border-gray-200">%</button>
                      <button className="px-2 py-0.5 text-[12px] text-white bg-blue-600">₹</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="text" className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-[13px]" />
                    <span className="text-[13px] font-bold text-gray-700 w-16 text-right">-$0.00</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[13px] font-bold text-[#1a233a]">Tax Allocation Mapping</label>
                    <div className="flex items-center gap-3 text-[12px] text-gray-600">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="tax_type" className="w-3.5 h-3.5 text-blue-600" />
                        TDS
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="tax_type" className="w-3.5 h-3.5 text-blue-600" defaultChecked />
                        TCS
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="text" className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-[13px]" />
                    <span className="text-[13px] font-bold text-gray-700 w-16 text-right">-$0.00</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Manual Adjustments</label>
                  <div className="flex items-center gap-3">
                    <input type="text" className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-[13px]" />
                    <span className="text-[13px] font-bold text-gray-700 w-16 text-right">-$0.00</span>
                  </div>
                </div>
              </div>

              {/* Grand Total */}
              <div className="mt-6 bg-[#4a3b69] rounded-xl p-6 text-white flex justify-between items-center">
                <span className="text-[16px] font-medium opacity-90">Grand Total</span>
                <span className="text-[24px] font-bold">₹7,20,951.00</span>
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

    </div>
  );
};

export default CreateBillPage;
