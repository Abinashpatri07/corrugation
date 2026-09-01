import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Upload, Package, FileText, ShoppingCart, Box, List, Bookmark } from 'lucide-react';

const CreateInventoryItemPage = () => {
  const navigate = useNavigate();
  
  const tabs = [
    { name: 'Items', path: '/inventory', active: true },
    { name: 'Inventory Control', path: '/inventory/control', active: false }
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
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap ${
                tab.active
                  ? 'text-[#1a233a] font-bold border-[#1a233a]'
                  : 'text-gray-500 font-medium border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.name === 'Items' && <ChevronDown className="w-3.5 h-3.5 ml-1" />}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-hidden flex flex-col gap-1.5">

        {/* Top Banner with Stepper */}
        <div className="bg-white px-6 py-2 md:px-8 md:py-3 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
          <h2 className="text-[17px] md:text-[18px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            Create Inventory Item
          </h2>

          <div className="flex items-center gap-0">
            {/* Step 1: Item Creation */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] ring-2 ring-pink-50 text-white flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <Box className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="text-[10px] md:text-[11px] font-semibold text-[#1a233a] text-center leading-tight">Item Creation</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-gray-200 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 2: Item Listed */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <List className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="text-[10px] md:text-[11px] font-medium text-gray-500 text-center leading-tight">Item Listed</span>
            </div>
          </div>
        </div>

        {/* ── Scrollable Form Area ── */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 custom-scrollbar">
          <div className="flex flex-col gap-1.5 pb-2">
            
            {/* Top Section: Basic Info & Upload Document */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1a233a]">Basic Information</h3>
              </div>
              
              <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Form */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                      Item Description
                    </label>
                    <div className="relative">
                      <textarea 
                        className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white min-h-[60px] resize-y"
                        placeholder="Enter description..."
                      ></textarea>
                      <div className="absolute bottom-2 right-3 text-[11px] text-gray-400">0 / 500 Character</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white text-gray-500">
                          <option>Select Category</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                        Unit <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white text-gray-500">
                          <option>Select or type to add</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white text-gray-500">
                        <option>Select Brand</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Right Upload Document */}
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
                </div>
              </div>
            </div>

            {/* Paper Specification */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1a233a]">Paper Specification</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Paper Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option></option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Size <span className="text-red-500">*</span>
                    </label>
                    <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      GSM <span className="text-red-500">*</span>
                    </label>
                    <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      BF <span className="text-red-500">*</span>
                    </label>
                    <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1a233a]">Purchase Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Cost Price <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <input type="text" className="w-full border border-r-0 border-gray-200 rounded-l-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                      <span className="bg-gray-50 border border-gray-200 rounded-r-md px-3 py-2 text-[12px] text-gray-500 font-medium">INR</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Account <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option></option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Description
                    </label>
                    <textarea 
                      className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white min-h-[80px] resize-y"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Preferred Vendor
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option></option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Track Inventory for this Item */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-1">
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                  <Box className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1a233a]">Track Inventory for this Item</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Inventory Account <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option></option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Inventory Valuation Method <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option></option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Good Received Not Invoiced Account <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option></option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Reorder Point
                    </label>
                    <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Opening Stock
                    </label>
                    <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Opening Stock Rate/ Unit
                    </label>
                    <div className="flex">
                      <input type="text" className="w-full border border-r-0 border-gray-200 rounded-l-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                      <span className="bg-gray-50 border border-gray-200 rounded-r-md px-3 py-2 text-[12px] text-gray-500 font-medium">INR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Fixed Footer ── */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-3 flex justify-end items-center gap-3">
        <button 
          onClick={() => navigate('/inventory')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button 
          onClick={() => navigate('/inventory')}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-colors"
        >
          Save
        </button>
      </div>

    </main>
  );
};

export default CreateInventoryItemPage;
