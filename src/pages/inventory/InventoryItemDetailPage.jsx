import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import chatgptImageFront from '../../assets/chatgpt_image_front.png';
import chatgptImageRear from '../../assets/chatgpt_image_rear.png';
import {
  Plus,
  MoreHorizontal,
  Search,
  Edit,
  Send,
  Printer,
  Download,
  Check,
  HandCoins,
  ArrowRightLeft,
  ChevronDown,
  FileText,
  Box,
  List
} from 'lucide-react';

const InventoryItemDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const tabs = [
    { name: 'Items', path: '/inventory' },
    { name: 'Inventory Control', path: '/inventory/control' }
  ];

  return (
    <main className="flex-1 overflow-hidden bg-[#f4f7fb] flex flex-col relative p-1.5 gap-1.5">
      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap
                ${tab.name === 'Items'
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

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col gap-1.5 min-h-0">

        {/* Top Banner with Stepper */}
        <div className="bg-white px-6 py-2 md:px-8 md:py-3 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
          <h2 className="text-[17px] md:text-[18px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            Item Details
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

        {/* Split View Content */}
        <div className="flex-1 flex overflow-hidden gap-1.5">

          {/* Left Sidebar (Bills List) */}
          <div className="w-[270px] bg-white rounded-2xl border border-gray-200 flex flex-col flex-shrink-0 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <h3 className="text-[15px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">All Items</h3>
                  <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/purchase/procurement/new')}
                    className="w-7 h-7 bg-gray-900 hover:bg-black text-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="w-7 h-7 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full flex items-center justify-center transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customer, product or item..."
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg pl-8 pr-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/30 text-[#1a2337] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
              {/* Card 1 (Active) */}
              <div className="bg-gradient-to-r from-[#ffede1] via-[#fae8f8] to-[#efdfff] border border-[#d54a88]/30 rounded-2xl p-3 shadow-sm flex flex-col justify-between min-h-[70px]">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[13px] font-bold text-[#111827] leading-tight line-clamp-2">A 180 GSM Kraft Liner Roll (Virgin Kraft)</span>
                  <span className="text-[11px] text-gray-500 font-medium shrink-0 pt-0.5">25/06/2026</span>
                </div>
                <div className="flex justify-end mt-2">
                  <span className="text-[12px] font-bold text-[#111827]">₹42,322.00</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-3 cursor-pointer hover:border-[#402de8]/40 hover:bg-gradient-to-br hover:from-[#fff5f2] hover:via-[#fcf5fd] hover:to-[#f6f5fe] hover:shadow-md transition-all flex flex-col justify-between min-h-[70px]">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[13px] font-bold text-gray-900 leading-tight line-clamp-2">A 180 GSM Kraft Liner Roll (Virgin Kraft)</span>
                  <span className="text-[11px] text-gray-400 font-medium shrink-0 pt-0.5">25/06/2026</span>
                </div>
                <div className="flex justify-end mt-2">
                  <span className="text-[12px] font-bold text-gray-900">₹42,322.00</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-3 cursor-pointer hover:border-[#402de8]/40 hover:bg-gradient-to-br hover:from-[#fff5f2] hover:via-[#fcf5fd] hover:to-[#f6f5fe] hover:shadow-md transition-all flex flex-col justify-between min-h-[70px]">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[13px] font-bold text-gray-900 leading-tight line-clamp-2">A 180 GSM Kraft Liner Roll (Virgin Kraft)</span>
                  <span className="text-[11px] text-gray-400 font-medium shrink-0 pt-0.5">25/06/2026</span>
                </div>
                <div className="flex justify-end mt-2">
                  <span className="text-[12px] font-bold text-gray-900">₹42,322.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 flex flex-col gap-1.5 overflow-hidden min-h-0">
            {/* Detail Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-2.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">
                  A 180 GSM Kraft Liner Roll (Virgin Kraft)
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Printer className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                </button>
                <button className="flex items-center px-4 py-1.5 bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white rounded-full text-xs font-bold transition-opacity shadow-sm">
                  Adjust Stock
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 flex items-center gap-8 mt-1.5 flex-shrink-0">
              <button className="py-3 border-b-2 border-gray-900 text-[13px] font-bold text-gray-900">Overview</button>
              <button className="py-3 border-b-2 border-transparent text-[13px] font-medium text-gray-500 hover:text-gray-700 transition-colors">Transactions</button>
              <button className="py-3 border-b-2 border-transparent text-[13px] font-medium text-gray-500 hover:text-gray-700 transition-colors">History</button>
            </div>

            {/* Main Details Containers */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-2 pr-1 mt-1.5">
              <div className="flex flex-col gap-3 min-h-full">
                
                {/* Top Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {/* Left Column (col-span-2) */}
                  <div className="lg:col-span-2">
                    {/* Primary Details */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-full">
                      <h3 className="text-[17px] font-bold text-gray-900 mb-6">Primary Details</h3>
                      
                      <div className="space-y-5 relative pl-4 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-gradient-to-b before:from-[#ff9a9e] before:via-[#fecfef] before:to-[#a1c4fd] before:rounded-full">
                        <div className="flex">
                          <div className="w-1/2 text-[13px] font-medium text-gray-500">Item Name</div>
                          <div className="w-1/2 text-[13px] font-bold text-blue-500">260CMS-180GSM-18BF-NS</div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 text-[13px] font-medium text-gray-500">Item Type</div>
                          <div className="w-1/2 text-[13px] font-bold text-gray-900">Inventory Items</div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 text-[13px] font-medium text-gray-500">Category</div>
                          <div className="w-1/2 text-[13px] font-bold text-gray-900">Paper Reels</div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 text-[13px] font-medium text-gray-500">Unit</div>
                          <div className="w-1/2 text-[13px] font-bold text-gray-900">Kg</div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 text-[13px] font-medium text-gray-500">Created Source</div>
                          <div className="w-1/2 text-[13px] font-bold text-gray-900">User</div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 text-[13px] font-medium text-gray-500">Inventory Account</div>
                          <div className="w-1/2 text-[13px] font-bold text-gray-900">Inventory Asset</div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 text-[13px] font-medium text-gray-500">Inventory Valuation Method</div>
                          <div className="w-1/2 text-[13px] font-bold text-gray-900">FIFO (First In First Out)</div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 text-[13px] font-medium text-gray-500">Goods Received Not Invoiced Account</div>
                          <div className="w-1/2 text-[13px] font-bold text-gray-900">Inventory Asset</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (col-span-1) */}
                  <div className="lg:col-span-1">
                    {/* Images */}
                    <div className="bg-gradient-to-b from-[#fbf8ff] to-white rounded-xl border border-pink-200/50 shadow-sm p-4 h-full">
                      <div className="mb-4">
                        <h4 className="text-[12px] font-bold text-gray-800 mb-2">Front View</h4>
                        <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                          <img src={chatgptImageFront} alt="Front View" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[12px] font-bold text-gray-800 mb-2">Rear View</h4>
                        <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                          <img src={chatgptImageRear} alt="Rear View" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {/* Purchase Information */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-6">Purchase Information</h3>
                    <div className="space-y-4.5">
                      <div className="flex relative pl-4 before:absolute before:left-0 before:top-0.5 before:bottom-0.5 before:w-0.5 before:bg-transparent before:rounded-full">
                        <div className="w-1/2 text-[13px] font-medium text-gray-500">Cost Price</div>
                        <div className="w-1/2 text-[13px] font-bold text-gray-900">₹38,578.00</div>
                      </div>
                      <div className="flex relative pl-4 before:absolute before:left-0 before:top-0.5 before:bottom-0.5 before:w-0.5 before:bg-transparent before:rounded-full">
                        <div className="w-1/2 text-[13px] font-medium text-gray-500">Purchase Account</div>
                        <div className="w-1/2 text-[13px] font-bold text-gray-900">Materials</div>
                      </div>
                      <div className="flex relative pl-4 before:absolute before:left-0 before:top-0.5 before:bottom-0.5 before:w-0.5 before:bg-transparent before:rounded-full">
                        <div className="w-1/2 text-[13px] font-medium text-gray-500">Preferred Vendor</div>
                        <div className="w-1/2 text-[13px] font-bold text-gray-900">Shree Paper Mills</div>
                      </div>
                    </div>
                  </div>

                  {/* Stock Details */}
                  <div className="bg-gradient-to-br from-[#fff5f0] via-[#fdf5fb] to-[#f4f2ff] rounded-xl border border-purple-100 shadow-sm p-5 flex flex-col">
                    <div className="border-b border-gray-300/40 pb-3 mb-3">
                      <h3 className="text-[17px] font-bold text-gray-900">
                        Available Stock : <span className="bg-gradient-to-r from-[#ff7a59] to-[#6366f1] bg-clip-text text-transparent">220.00</span>
                      </h3>
                    </div>
                    
                    <h4 className="text-[15px] font-bold text-gray-900 mb-4">Stock Details</h4>
                    
                    <div className="flex gap-4 flex-1">
                      <div className="flex-1 space-y-5 relative pr-5 before:absolute before:right-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-gradient-to-b before:from-[#ff9a9e] before:via-[#eeb3e6] before:to-[#a1c4fd] before:rounded-full">
                        <div className="flex justify-between">
                          <span className="text-[12px] font-medium text-gray-500">Opening Stock</span>
                          <span className="text-[13px] font-bold text-gray-900">100.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[12px] font-medium text-gray-500">Stock On Hand</span>
                          <span className="text-[13px] font-bold text-gray-900">120.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[12px] font-medium text-gray-500">Committed Stock</span>
                          <span className="text-[13px] font-bold text-gray-900">0.00</span>
                        </div>
                      </div>
                      
                      <div className="w-28 space-y-3">
                        <div className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm">
                          <span className="text-[10px] text-gray-400 block mb-0.5 leading-none">To be Recitable</span>
                          <div className="text-[17px] font-bold text-gray-900 leading-none mt-1.5">1000<span className="text-[9px] font-medium text-gray-400 ml-1">Qty</span></div>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm">
                          <span className="text-[10px] text-gray-400 block mb-0.5 leading-none">To be Billed</span>
                          <div className="text-[17px] font-bold text-gray-900 leading-none mt-1.5">0<span className="text-[9px] font-medium text-gray-400 ml-1">Qty</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InventoryItemDetailPage;
