import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, Plus, MoreHorizontal, Edit, Send, FileText, UploadCloud, File } from 'lucide-react';

const ExpenseDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f4f7f9] overflow-hidden p-1.5 gap-1.5">
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
        {/* Sticky Header Wrapper */}
        <div className="sticky top-0 z-50 px-6 lg:px-8 pt-6 pb-2 bg-[#f8fafc]">
          <div className="bg-[#254754] text-white px-6 lg:px-8 py-5 rounded-2xl flex items-center justify-between shadow-sm">
            <h1 className="text-[22px] font-bold">Expense</h1>

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

        {/* ── Main Layout (Split View) ── */}
        <div className="px-6 lg:px-8 pb-24 pt-4 flex flex-col lg:flex-row gap-6 relative">
          
          {/* Left Sidebar: List of Expenses (Sticky & Independently Scrollable) */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 lg:sticky lg:top-[110px] lg:h-[calc(100vh-220px)] lg:overflow-y-auto hide-scrollbar">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 cursor-pointer">
                <h2 className="text-[16px] font-bold text-[#1a233a]">All Expenses</h2>
                <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate('/purchase/expense/new')}
                  className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-md border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative">
              <input 
                type="text" 
                placeholder="Search customer, product or item..."
                className="w-full pl-8 pr-3 py-2 text-[12px] bg-gray-100 border border-transparent rounded-md focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pb-3 mt-3">
              {/* Active Card */}
              <div className="bg-gradient-to-br from-[#ffede1] via-[#fae8f8] to-[#efdfff] rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md transition-all shadow-sm border border-transparent mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">EXP-00001</span>
                  <span className="text-[9px] text-gray-400 font-medium tracking-wide">25/06/2026</span>
                </div>
                <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                  CENTURY PULP & PAPER
                </h3>
                <div className="text-right">
                  <span className="text-[14px] font-bold text-[#111827]">₹53,900.00</span>
                </div>
              </div>

              {/* Inactive Card 1 */}
              <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">EXP-00002</span>
                  <span className="text-[9px] text-gray-400 font-medium tracking-wide">20/06/2026</span>
                </div>
                <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                  GLOBAL SUPPLIES INC
                </h3>
                <div className="text-right">
                  <span className="text-[14px] font-bold text-[#111827]">₹12,500.00</span>
                </div>
              </div>

              {/* Inactive Card 2 */}
              <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">EXP-00003</span>
                  <span className="text-[9px] text-gray-400 font-medium tracking-wide">15/06/2026</span>
                </div>
                <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                  TECHHARDWARE LTD
                </h3>
                <div className="text-right">
                  <span className="text-[14px] font-bold text-[#111827]">₹0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Area: Expense Details */}
          <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#1a233a]">Expense Details</h2>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-[13px] font-semibold text-gray-700 hover:bg-gray-50">
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-[13px] font-semibold text-gray-700 hover:bg-gray-50">
                  <Send className="w-3.5 h-3.5" />
                  Send <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-[13px] font-semibold text-gray-700 hover:bg-gray-50">
                  <File className="w-3.5 h-3.5" />
                  PDF/ Print
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Details Content */}
            <div className="p-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Amount Card */}
                <div className="bg-[#f8fafc] rounded-lg p-6 border border-gray-100 flex flex-col justify-center">
                  <p className="text-[12px] text-gray-500 font-medium mb-1">Expense Amount</p>
                  <div className="flex items-end gap-3 mb-4">
                    <h1 className="text-[28px] font-bold text-red-500 leading-none">₹7,46,452.00</h1>
                    <span className="text-[13px] text-gray-600 mb-1">on 30/06/2026</span>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 text-[10px] font-bold text-blue-500 bg-blue-50 border border-blue-200 rounded-full">
                      NON-BILLABLE
                    </span>
                  </div>
                </div>

                {/* Receipts Dropzone */}
                <div>
                  <h3 className="text-[14px] font-bold text-[#1a233a] mb-3">Receipts</h3>
                  <div className="border-2 border-dashed border-blue-200 bg-[#eef5ff] rounded-xl flex flex-col items-center justify-center text-center p-6 relative">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                      <UploadCloud className="w-4 h-4 text-blue-500" />
                    </div>
                    <h4 className="text-[14px] font-semibold text-[#1e293b] mb-1">Drag or Drop your Receipts</h4>
                    <p className="text-[11px] text-gray-500 mb-4">Maximum file size allowed is 10MB</p>
                    <button className="bg-white border border-gray-200 text-[#1e293b] font-semibold text-[12px] px-4 py-1.5 rounded-full shadow-sm hover:bg-gray-50">
                      Upload Your Files
                    </button>
                  </div>
                </div>
              </div>

              {/* Category & Paid Through */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-[13px] text-gray-500 font-medium mb-2">Category</p>
                  <span className="inline-block px-3 py-1 text-[12px] text-blue-500 border border-blue-200 rounded-full">
                    Materials
                  </span>
                </div>
                <div>
                  <p className="text-[13px] text-gray-500 font-medium mb-2">Paid Through</p>
                  <p className="text-[14px] font-bold text-[#1a233a] mb-1">Undeposited Funds</p>
                  <p className="text-[13px] text-gray-500">Cash Account</p>
                </div>
              </div>

              {/* Journal Section */}
              <div>
                <div className="flex border-b border-gray-200 mb-4">
                  <button className="px-4 py-2 text-[13px] font-bold text-blue-600 border-b-2 border-blue-600">
                    Journal
                  </button>
                </div>

                <div className="bg-[#f0fdf4] text-[#16a34a] px-4 py-2.5 rounded-md text-[12px] font-medium mb-4">
                  <span className="text-gray-600">Amount Is Displayed In Your Base Currency</span> <span className="font-bold text-[#1a233a]">INR</span>
                </div>

                {/* Journal Table */}
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 font-bold text-[#1a233a] text-[13px]">Expense</th>
                      <th className="py-3 font-bold text-[#1a233a] text-[13px]"></th>
                      <th className="py-3 font-bold text-[#1a233a] text-[13px]"></th>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 font-bold text-[#1a233a] text-[13px]">Account</th>
                      <th className="py-3 font-bold text-[#1a233a] text-[13px]">Debit</th>
                      <th className="py-3 font-bold text-[#1a233a] text-[13px]">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 text-[13px] text-gray-700">Materials</td>
                      <td className="py-4 text-[13px] text-gray-700">4,67,254.00</td>
                      <td className="py-4 text-[13px] text-gray-700">0.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 text-[13px] text-gray-700">Undeposited Funds</td>
                      <td className="py-4 text-[13px] text-gray-700">0.00</td>
                      <td className="py-4 text-[13px] text-gray-700">4,67,254.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExpenseDetailPage;
