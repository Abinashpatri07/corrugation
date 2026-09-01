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
  Store,
  Boxes,
  TrendingUp,
  Box,
  ShieldCheck
} from 'lucide-react';

const InventoryControlDetailPage = () => {
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
                ${tab.name === 'Inventory Control'
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

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col gap-1.5 min-h-0">

        {/* Top Banner with Stepper */}
        <div className="bg-white px-6 py-2 md:px-8 md:py-3 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
          <h2 className="text-[17px] md:text-[18px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            Inventory Control Details
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

        {/* Split View Content */}
        <div className="flex-1 flex overflow-hidden gap-1.5">

          {/* Left Sidebar (Bills List) */}
          <div className="w-[270px] bg-white rounded-2xl border border-gray-200 flex flex-col flex-shrink-0 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <h3 className="text-[15px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit leading-tight">
                    Inventory<br/>Adjustments
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/inventory/control/new')}
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
                    placeholder="Search adjustment..."
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg pl-8 pr-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/30 text-[#1a2337] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 p-3 space-y-2.5 overflow-y-auto custom-scrollbar">
              {/* Card 1 (Active) */}
              <div className="bg-gradient-to-r from-[#ffede1] via-[#fae8f8] to-[#efdfff] border border-[#d54a88]/30 rounded-2xl p-3 shadow-sm flex flex-col justify-between min-h-[76px] cursor-pointer">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <span className="text-[17px] font-medium text-[#111827] leading-tight">IC-0001</span>
                  <span className="text-[11px] text-gray-600 font-medium shrink-0 pt-0.5">10/08/2026</span>
                </div>
                <div className="flex justify-end items-center mt-auto">
                  <span className="text-[13px] font-bold text-[#111827]">₹42,322.00</span>
                </div>
              </div>

              {/* Card 2 (Hover/Selected state) */}
              <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between min-h-[76px] cursor-pointer hover:border-[#402de8]/40 hover:bg-gradient-to-br hover:from-[#fff5f2] hover:via-[#fcf5fd] hover:to-[#f6f5fe] hover:shadow-md transition-all">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <span className="text-[15px] font-medium text-[#111827] leading-tight">Stock Damage</span>
                  <span className="text-[11px] text-gray-400 font-medium shrink-0 pt-0.5">25/06/2026</span>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-bold bg-[#3b82f6] text-white">Adjusted</span>
                  <span className="text-[13px] font-bold text-[#111827]">₹2,322.00</span>
                </div>
              </div>

              {/* Card 3 (Default) */}
              <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between min-h-[76px] cursor-pointer hover:border-[#402de8]/40 hover:bg-gradient-to-br hover:from-[#fff5f2] hover:via-[#fcf5fd] hover:to-[#f6f5fe] hover:shadow-md transition-all">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <span className="text-[15px] font-medium text-[#111827] leading-tight">Stock Count Adjustment</span>
                  <span className="text-[11px] text-gray-400 font-medium shrink-0 pt-0.5">25/06/2026</span>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-bold bg-[#3b82f6] text-white">Adjusted</span>
                  <span className="text-[13px] font-bold text-[#111827]">₹1,322.00</span>
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
                  IC-0001
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#3b82f6] text-white">
                  Adjusted
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Printer className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Details Containers */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-2 pr-1 mt-3">
              <div className="flex flex-col gap-3 min-h-full">
                
                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Left Column (col-span-2) */}
                  <div className="md:col-span-2">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-full">
                      <h3 className="text-[17px] font-bold text-gray-900 mb-6">Adjustment Details</h3>
                      
                      <div className="space-y-4 relative pl-4 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-gradient-to-b before:from-[#ff9a9e] before:via-[#fecfef] before:to-[#a1c4fd] before:rounded-full">
                        <div className="flex justify-between items-center">
                          <div className="text-[13px] font-medium text-gray-500">Date</div>
                          <div className="text-[13px] font-bold text-gray-900">10/08/2026</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-[13px] font-medium text-gray-500">Reason</div>
                          <div className="text-[13px] font-bold text-gray-900">Inventory Revaluation</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-[13px] font-medium text-gray-500">Account</div>
                          <div className="text-[13px] font-bold text-gray-900">Cost Of Goods Sold</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-[13px] font-medium text-gray-500">Adjustment Type</div>
                          <div className="text-[13px] font-bold text-gray-900">Quantity</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-[13px] font-medium text-gray-500">Adjusted By</div>
                          <div className="text-[13px] font-bold text-gray-900">tiku.svia</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-[13px] font-medium text-gray-500">Created Time</div>
                          <div className="text-[13px] font-bold text-gray-900">10/08/2026 12:51 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (col-span-1) */}
                  <div className="md:col-span-1">
                    <div className="bg-gradient-to-br from-[#fff0e5] via-[#f8eaff] to-[#e6e9ff] rounded-xl border border-[#e5e7eb] shadow-sm p-6 h-full flex flex-col justify-between gap-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[13px] text-gray-500 font-medium mb-1">Total Value Impact</div>
                          <div className="text-[22px] font-medium text-gray-900">₹1,800.00</div>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff4d4d] to-[#9b27b0] flex items-center justify-center shadow-sm">
                           <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-start mt-2">
                        <div>
                          <div className="text-[13px] text-gray-500 font-medium mb-1">Quantity Adjusted</div>
                          <div className="text-[22px] font-medium text-gray-900">+50 Kg</div>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff4d4d] to-[#9b27b0] flex items-center justify-center shadow-sm">
                           <Box className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className="h-px w-full border-t border-dashed border-gray-300 my-1"></div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-[13px] text-gray-500 font-medium mb-2">Status</div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#a7f3d0] text-[#047857]">Adjusted</span>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff4d4d] to-[#9b27b0] flex items-center justify-center shadow-sm">
                           <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adjusted Item */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-1">
                  <h3 className="text-[17px] font-bold text-gray-900 mb-4">Adjusted Item</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="pb-3 px-4 font-medium text-gray-400 text-[13px]">Item Details</th>
                          <th className="pb-3 px-4 font-medium text-gray-400 text-[13px]">Quantity Adjusted</th>
                          <th className="pb-3 px-4 font-medium text-gray-400 text-[13px]">Cost Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="pt-3 px-4">
                            <div className="text-[13px] font-bold text-blue-500 mb-0.5">180 GSM - NS</div>
                            <div className="text-[11px] text-gray-400">SKU: 180GSM-NS-REE</div>
                          </td>
                          <td className="pt-3 px-4 text-[13px] font-bold text-gray-900">50 (Kg)</td>
                          <td className="pt-3 px-4 text-[13px] font-bold text-gray-900">₹36.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Inventory Adjustment By Quantity */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-1">
                  <h3 className="text-[17px] font-bold text-gray-900 mb-4">Inventory Adjustment By Quantity</h3>
                  <div className="overflow-x-auto border border-gray-100 rounded-lg">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[#f9fafb]">
                          <th className="py-3 px-4 font-medium text-gray-400 text-[13px]">Account</th>
                          <th className="py-3 px-4 font-medium text-gray-400 text-[13px]">Debit</th>
                          <th className="py-3 px-4 font-medium text-gray-400 text-[13px]">Credit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-100">
                          <td className="py-3 px-4 text-[13px] font-medium text-gray-800">Inventory Asset</td>
                          <td className="py-3 px-4 text-[13px] text-gray-500">1,300.00</td>
                          <td className="py-3 px-4 text-[13px] text-gray-500">0.00</td>
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="py-3 px-4 text-[13px] font-medium text-gray-800">Scrap & Spoilage Account</td>
                          <td className="py-3 px-4 text-[13px] text-gray-500">0.00</td>
                          <td className="py-3 px-4 text-[13px] text-gray-500">1,300.00</td>
                        </tr>
                        <tr className="border-t border-gray-100 bg-[#f9fafb]">
                          <td className="py-3 px-4 text-[13px] font-medium text-gray-800 text-center">Total</td>
                          <td className="py-3 px-4 text-[13px] font-bold text-gray-900">1,300.00</td>
                          <td className="py-3 px-4 text-[13px] font-bold text-gray-900">1,300.00</td>
                        </tr>
                      </tbody>
                    </table>
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

export default InventoryControlDetailPage;
