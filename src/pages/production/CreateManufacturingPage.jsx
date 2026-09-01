import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, Bookmark, Calendar, GripVertical, Package, Database } from 'lucide-react';

const CreateManufacturingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Components');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f4f7f9]">
      
      {/* ── Sub Navigation ── */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white px-6">
        <nav className="flex space-x-1">
          {['Machine', 'Manufacturing', 'Corrugator Job', 'QC'].map(tab => (
            <button
              key={tab}
              className={`flex items-center gap-1 px-4 py-4 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap
                ${tab === 'Manufacturing'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
            <h1 className="text-[22px] font-bold">Create Manufacturing</h1>

            {/* Workflow steps */}
            <div className="flex items-center gap-4">
              {/* Step 1: Manufacturing (Active) */}
              <div className="flex items-center gap-2 bg-white text-[#254754] rounded-full px-4 py-1.5 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-[#254754] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-[13px] font-semibold">Manufacturing</span>
              </div>

              {/* Step 2: Job Cards */}
              <div className="flex items-center gap-2 bg-[#5b8a9e] text-white rounded-full px-4 py-1.5 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#5b8a9e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-[13px] font-semibold">Job Cards</span>
              </div>

              {/* Step 3: Shopfloor */}
              <div className="flex items-center gap-2 bg-[#5b8a9e] text-white rounded-full px-4 py-1.5 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#5b8a9e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-[13px] font-semibold">Shopfloor</span>
              </div>

              {/* Step 4: Manufacturing Calendar */}
              <div className="flex items-center gap-2 bg-[#5b8a9e] text-white rounded-full px-4 py-1.5 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#5b8a9e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[13px] font-semibold">Manufacturing Calendar</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Form Layout ── */}
        <div className="px-8 pb-24 pt-4 space-y-6">
          
          {/* Main Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3b82f6]" />
            
            {/* Header Area */}
            <div className="p-8 pb-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-[20px] font-bold text-[#1e293b]">New Manufacturing Order</h2>
                  <p className="text-[13px] text-gray-400">Set up a new production workflow.</p>
                </div>
                <span className="px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[11px] font-bold rounded-full border border-green-200">
                  Draft — Auto-saving
                </span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                  <label className="text-[13px] font-bold text-[#1a233a]">Item To Produce</label>
                  <div className="relative">
                    <select className="w-full border border-gray-200 rounded-md pl-3 pr-10 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 appearance-none bg-white">
                      <option></option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                  <label className="text-[13px] font-bold text-[#1a233a]">Reference#</label>
                  <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
                </div>

                <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                  <label className="text-[13px] font-bold text-[#1a233a]">Manufacturing Order#</label>
                  <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
                </div>

                <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                  <label className="text-[13px] font-bold text-[#1a233a]">Start Date</label>
                  <div className="relative">
                    <input type="text" className="w-full border border-gray-200 rounded-md pl-3 pr-10 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                  <label className="text-[13px] font-bold text-[#1a233a]">Add Sales Order</label>
                  <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
                </div>

                <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                  <label className="text-[13px] font-bold text-[#1a233a]">Assigned Owner</label>
                  <div className="relative">
                    <select className="w-full border border-gray-200 rounded-md pl-3 pr-10 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 appearance-none bg-white">
                      <option></option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                  <label className="text-[13px] font-bold text-[#1a233a]">Quantity To Produce</label>
                  <div className="relative">
                    <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500" />
                    <div className="absolute right-0 top-0 bottom-0 border-l border-gray-200 flex flex-col w-6 bg-gray-50 rounded-r-md">
                      <button className="flex-1 flex items-center justify-center border-b border-gray-200 hover:bg-gray-100">
                        <ChevronDown className="w-3 h-3 text-gray-500 rotate-180" />
                      </button>
                      <button className="flex-1 flex items-center justify-center hover:bg-gray-100">
                        <ChevronDown className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section (Tabs & Table) */}
            <div className="mt-4 flex-1 flex flex-col">
              {/* Inner Tabs */}
              <div className="flex border-b border-gray-200 px-8 bg-[#f8fafc]">
                <button
                  onClick={() => setActiveTab('Components')}
                  className={`px-6 py-3 text-[14px] font-medium border-b-2 transition-colors ${
                    activeTab === 'Components' ? 'border-black text-black font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Components
                </button>
                <button
                  onClick={() => setActiveTab('Operations')}
                  className={`px-6 py-3 text-[14px] font-medium border-b-2 transition-colors ${
                    activeTab === 'Operations' ? 'border-black text-black font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Operations
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                <h3 className="text-[18px] font-bold text-[#1a233a] mb-6">Add Component</h3>

                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left min-w-[800px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 font-medium text-gray-500 text-[13px] w-8"></th>
                        <th className="py-3 font-medium text-gray-500 text-[13px] w-1/2">Name</th>
                        <th className="py-3 font-medium text-gray-500 text-[13px] w-64">Quantity</th>
                        <th className="py-3 font-medium text-gray-500 text-[13px] w-48">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-4 pr-2">
                          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                        </td>
                        <td className="py-4 pr-6">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded bg-[#eef2ff] flex items-center justify-center shrink-0">
                              <Package className="w-5 h-5 text-[#1e1b4b]" />
                            </div>
                            <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] h-9" />
                          </div>
                        </td>
                        <td className="py-4 pr-6">
                          <div className="flex items-center border border-gray-200 rounded-md h-9">
                            <button className="px-3 text-gray-400 hover:bg-gray-50 border-r border-gray-200 py-1.5 flex items-center justify-center text-[16px]">-</button>
                            <input type="text" className="w-full text-center py-1.5 text-[13px] outline-none" />
                            <button className="px-3 text-gray-400 hover:bg-gray-50 border-l border-gray-200 py-1.5 flex items-center justify-center text-[16px]">+</button>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="relative">
                            <input type="text" className="w-full border border-gray-200 rounded-md pl-9 pr-3 py-2 text-[13px] h-9" />
                            <Database className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
          onClick={() => navigate('/production')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button 
          onClick={() => navigate('/production')}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-colors"
        >
          Save
        </button>
      </div>

    </div>
  );
};

export default CreateManufacturingPage;
