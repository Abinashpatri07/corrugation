import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, Bookmark, UploadCloud, Calendar, User, FileText } from 'lucide-react';

const CreateExpensePage = () => {
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
                ${tab === 'Expenses'
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
            <h1 className="text-[22px] font-bold">Create Expense</h1>

            {/* Workflow steps */}
            <div className="flex items-center">
              {/* Step 1: Expenses */}
              <div className="flex items-center gap-2 bg-[#dcfce7] text-[#16a34a] rounded-full px-4 py-1.5 shadow-sm">
                <div className="w-5 h-5 rounded-full border border-[#16a34a] flex items-center justify-center">
                  <FileText className="w-3 h-3 text-[#16a34a]" />
                </div>
                <span className="text-[13px] font-semibold">Expenses</span>
              </div>

              {/* Line */}
              <div className="w-6 h-[1px] bg-gray-400"></div>

              {/* Step 2: Bills */}
              <div className="flex items-center gap-2 bg-[#5b8a9e] text-white rounded-full px-4 py-1.5 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#5b8a9e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="text-[13px] font-semibold">Bills</span>
              </div>

              {/* Line */}
              <div className="w-6 h-[1px] bg-gray-400"></div>

              {/* Step 3: Payment */}
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
          <div className="grid grid-cols-[1fr_400px] gap-6">
            
            {/* Left Column: Expense Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden p-8 flex flex-col gap-6">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3b82f6]" />
              
              {/* Header Title */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#1e293b]">Expense Information</h2>
                  <p className="text-[12px] text-gray-500">Required Details About This Expense</p>
                </div>
              </div>

              {/* Grid Fields */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                
                {/* Date */}
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Date *</label>
                  <div className="relative">
                    <input type="date" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 appearance-none bg-white" />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none hidden" />
                  </div>
                </div>

                {/* Expense Account */}
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Expense Account *</label>
                  <div className="relative">
                    <select className="w-full border border-gray-200 rounded-md pl-3 pr-8 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 appearance-none bg-white">
                      <option></option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Amount *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[13px] font-semibold text-gray-500">₹</span>
                    <input type="text" className="w-full border border-gray-200 rounded-md pl-7 pr-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                {/* Paid Through */}
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Paid Through *</label>
                  <div className="relative">
                    <select className="w-full border border-gray-200 rounded-md pl-3 pr-8 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 appearance-none bg-white">
                      <option></option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Vendor (Full Width) */}
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Vendor *</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md pl-3 pr-10 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 appearance-none bg-white">
                    <option></option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-8 top-2.5 pointer-events-none" />
                  <div className="absolute right-1 top-1 bottom-1 w-7 bg-blue-600 rounded flex items-center justify-center cursor-pointer pointer-events-auto">
                    <Search className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Invoice# */}
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Invoice#</label>
                <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
              </div>

              {/* NOTE */}
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2 uppercase">Note</label>
                <textarea rows={4} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 resize-none"></textarea>
              </div>
            </div>

            {/* Right Column: Receipt Upload */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden p-8 flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3b82f6]" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#1e293b]">Receipt Upload</h2>
                  <p className="text-[12px] text-gray-500">Attach The Receipt Or Invoice</p>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="flex-1 border-2 border-dashed border-blue-200 bg-[#eef5ff] rounded-xl flex flex-col items-center justify-center text-center p-6 mt-2 relative">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <UploadCloud className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-[15px] font-semibold text-[#1e293b] mb-1">Drag or Drop your Receipts</h3>
                <p className="text-[11px] text-gray-500 mb-6">Maximum file size allowed is 10MB</p>
                
                <button className="bg-white border border-gray-200 text-[#1e293b] font-semibold text-[13px] px-5 py-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors z-10">
                  Upload Your Files
                </button>
              </div>
            </div>

          </div>

          {/* ── Customer Information (Bottom Row) ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden p-8 flex flex-col gap-6">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3b82f6]" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-[16px] font-bold text-[#1e293b]">Customer Information</h2>
                <p className="text-[12px] text-gray-500">Link This Expense To A Customer, If Applicable</p>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Customer</label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-md pl-3 pr-10 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 appearance-none bg-white">
                  <option></option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-8 top-2.5 pointer-events-none" />
                <div className="absolute right-1 top-1 bottom-1 w-7 bg-blue-600 rounded flex items-center justify-center cursor-pointer pointer-events-auto">
                  <Search className="w-3.5 h-3.5 text-white" />
                </div>
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

export default CreateExpensePage;
