import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Plus,
  MoreHorizontal,
  Search,
  Edit,
  Send,
  Printer,
  ChevronDown,
  FileText,
  PackagePlus,
  ShoppingCart,
  Factory,
  Package,
  Truck,
  Receipt,
  Check,
  CheckCircle,
  CreditCard,
  PackageCheck,
  HandCoins,
  ArrowRightLeft,
  Calendar,
  CalendarDays,
  Clock,
  Eye
} from 'lucide-react';

const ManufacturingOrderDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const tabs = ['Manufacturing Order', 'Job Cards'];
  const [activeTab, setActiveTab] = useState('Manufacturing Order');

  const steps = [
    { name: 'Quote', icon: PackagePlus, status: 'completed' },
    { name: 'Sales order', icon: FileText, status: 'completed' },
    { name: 'Production', icon: Factory, status: 'active' },
    { name: 'Package', icon: Package, status: 'pending' },
    { name: 'Ship', icon: Truck, status: 'pending' },
    { name: 'Invoice', icon: Receipt, status: 'pending' },
    { name: 'Delivered', icon: PackageCheck, status: 'pending' },
    { name: 'Payment', icon: HandCoins, status: 'pending' },
  ];

  return (
    <main className="flex-1 overflow-hidden bg-[#f4f7fb] flex flex-col relative p-1.5 gap-1.5">
      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'Job Cards') navigate('/production', { state: { tab: 'Job Cards' } });
              }}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab
                  ? 'border-[#1a233a] text-[#1a233a] font-bold'
                  : 'border-transparent text-gray-500 font-medium hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col gap-1.5 min-h-0">

        {/* Top Banner with Stepper */}
        <div className="bg-white px-6 py-4 md:px-8 md:py-5 flex flex-col items-start border border-gray-200 rounded-2xl shadow-sm shrink-0">
          <div className="flex items-center w-full relative px-4 sm:px-6 z-0">
            {/* Connecting Line */}
            <div className="absolute top-5 left-8 right-8 sm:left-10 sm:right-10 h-[2px] bg-gray-200 z-[-1]"></div>
            <div className="absolute top-5 left-8 sm:left-10 w-[calc((100%-4rem)*2/7)] sm:w-[calc((100%-5rem)*2/7)] h-[2px] bg-[#86efac] z-[-1]"></div>
            <div className="absolute top-5 h-[2px] bg-gradient-to-r from-[#d54a88] to-transparent z-[-1]" style={{ left: 'calc(2.5rem + ((100%-5rem)*2/7))', width: 'calc((100%-5rem)/7)' }}></div>

            <div className="flex items-start justify-between w-full">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = step.status === 'completed';
                const isActive = step.status === 'active';
                
                return (
                  <div key={step.name} className="flex flex-col items-center px-1 sm:px-2 relative w-[50px] sm:w-[60px]">
                    <div className="h-10 flex items-center justify-center mb-1 w-full">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center relative z-10 ${
                      isCompleted
                        ? 'bg-[#bbf7d0]'
                        : isActive
                          ? 'bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white shadow-md'
                          : 'bg-white border-2 border-gray-200 text-gray-400'
                      }`}>
                      {isCompleted ? (
                        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#22c55e] flex items-center justify-center">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                        </div>
                      ) : (
                        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                      )}
                      </div>
                    </div>
                    <span className={`text-[9px] sm:text-[11px] font-semibold text-center leading-tight ${
                      isCompleted ? 'text-[#16a34a]' : isActive ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Split View Content */}
        <div className="flex-1 flex overflow-hidden gap-1.5 mt-1.5">

          {/* Left Sidebar (MO List) */}
          <div className="w-[270px] bg-white rounded-2xl border border-gray-200 flex flex-col flex-shrink-0 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <h3 className="text-[16px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent">
                    All MO
                  </h3>
                  <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/production/manufacturing/new')}
                    className="w-7 h-7 bg-gray-900 hover:bg-black text-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="w-7 h-7 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full flex items-center justify-center transition-colors">
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
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg pl-8 pr-2 py-2 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/30 text-[#1a2337] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
              {/* Active Card */}
              <div className="bg-gradient-to-br from-[#fdf0f4] to-[#f4f2ff] rounded-xl px-3 py-3 cursor-pointer hover:shadow-md transition-all shadow-sm border border-[#c4b5fd] mb-2.5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[13px] font-extrabold text-[#111827]">MO-00001</span>
                  <span className="text-[9px] text-gray-400 font-medium">25/06/2026</span>
                </div>
                <h3 className="text-[10px] font-bold text-[#374151] mb-2 uppercase leading-snug truncate">
                  CLIMAMAX CONTROLS PRIVATE LIMITED
                </h3>
                <div className="flex justify-end mt-1">
                  <span className="text-[11px] font-semibold text-gray-500">₹100.00</span>
                </div>
              </div>

              {/* Inactive Card 1 */}
              <div className="bg-white rounded-xl px-3 py-3 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#fdf0f4] hover:to-[#f4f2ff] transition-all shadow-sm border border-gray-200 mb-2.5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[13px] font-extrabold text-[#111827]">MO-00002</span>
                  <span className="text-[9px] text-gray-400 font-medium">20/06/2026</span>
                </div>
                <h3 className="text-[10px] font-bold text-[#374151] mb-2 uppercase leading-snug truncate">
                  GLOBAL SUPPLIES INC
                </h3>
                <div className="flex justify-end mt-1">
                  <span className="text-[11px] font-semibold text-gray-500">₹12,500.00</span>
                </div>
              </div>
              
              {/* Inactive Card 2 */}
              <div className="bg-white rounded-xl px-3 py-3 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#fdf0f4] hover:to-[#f4f2ff] transition-all shadow-sm border border-gray-200 mb-2.5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[13px] font-extrabold text-[#111827]">MO-00003</span>
                  <span className="text-[9px] text-gray-400 font-medium">15/06/2026</span>
                </div>
                <h3 className="text-[10px] font-bold text-[#374151] mb-2 uppercase leading-snug truncate">
                  TECHHARDWARE LTD
                </h3>
                <div className="flex justify-end mt-1">
                  <span className="text-[11px] font-semibold text-gray-500">₹0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 flex flex-col gap-1.5 overflow-hidden min-h-0">
            {/* Detail Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <h2 className="text-[22px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent">
                  MO-00001
                </h2>
                <span className="bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold px-3 py-1 rounded-full">
                  Complete
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="w-9 h-9 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Send className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Printer className="w-4 h-4" />
                </button>
                <button className="flex items-center px-5 py-2 bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white rounded-full text-[13px] font-semibold transition-opacity shadow-sm">
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Convert to Package
                </button>
                <button className="w-9 h-9 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Details Containers */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-2 pr-1">
              <div className="space-y-2 min-h-full">

                {activeTab === 'Manufacturing Order' ? (
                  <>
                    {/* Top Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Customer Profile Box */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-5 py-4 border-b border-gray-50">
                      <h3 className="text-[15px] font-bold text-gray-900">Customer Profile</h3>
                    </div>
                    <div className="p-5 flex-1">
                      <div className="flex items-center mb-6 pb-6 border-b border-gray-50">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white flex items-center justify-center text-[15px] font-bold shadow-sm mr-4 flex-shrink-0">
                          CC
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-gray-900">Climamax Controls Pvt Ltd</h4>
                          <p className="text-[12px] font-medium text-gray-400 mt-0.5">CUST-00042</p>
                        </div>
                      </div>
                      <div className="space-y-4 px-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-medium text-gray-400">GSTIN</span>
                          <span className="text-[13px] font-bold text-[#111827]">29BGBBB2222B2Z2</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-medium text-gray-400">Point Of Contact</span>
                          <span className="text-[13px] font-bold text-[#111827]">Sarah Jenkins</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Box */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-5 py-4 border-b border-gray-50">
                      <h3 className="text-[15px] font-bold text-gray-900">Details</h3>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-center">
                      <div className="space-y-4 px-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-medium text-gray-400">Manufacturing Order Number</span>
                          <span className="text-[13px] font-bold text-[#111827]">QT-000001</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-medium text-gray-400">Order Date</span>
                          <span className="text-[13px] font-bold text-[#111827]">25/06/2026</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-medium text-gray-400">Expected Shipment</span>
                          <span className="text-[13px] font-bold text-[#111827]">10/07/2026</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-medium text-gray-400">Manufacturing Start Date</span>
                          <span className="text-[13px] font-bold text-[#111827]">25/08/2026</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-medium text-gray-400">Manufacturing End Date</span>
                          <span className="text-[13px] font-bold text-[#111827]">28/08/2026</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Specification Box */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                  <div className="px-5 py-4 border-b border-gray-50">
                    <h3 className="text-[15px] font-bold tracking-wide bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block">
                      Product Specification
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                      <div className="bg-[#f0f6ff] rounded-lg p-3.5 flex flex-col justify-center border border-gray-50">
                        <span className="text-[10px] font-medium text-gray-400 mb-1">Paper Type</span>
                        <span className="text-[14px] font-extrabold text-gray-900">NS</span>
                      </div>
                      <div className="bg-[#f0f6ff] rounded-lg p-3.5 flex flex-col justify-center border border-gray-50">
                        <span className="text-[10px] font-medium text-gray-400 mb-1">Box Type</span>
                        <span className="text-[14px] font-extrabold text-gray-900">Universal</span>
                      </div>
                      <div className="bg-[#f0f6ff] rounded-lg p-3.5 flex flex-col justify-center border border-gray-50">
                        <span className="text-[10px] font-medium text-gray-400 mb-1">Size</span>
                        <span className="text-[14px] font-extrabold text-gray-900">18 × 12 × 10</span>
                      </div>
                      <div className="bg-[#f0f6ff] rounded-lg p-3.5 flex flex-col justify-center border border-gray-50">
                        <span className="text-[10px] font-medium text-gray-400 mb-1">Ply</span>
                        <span className="text-[14px] font-extrabold text-gray-900">5 <span className="text-[10px] font-semibold text-gray-500">Ply</span></span>
                      </div>
                      <div className="bg-[#f0f6ff] rounded-lg p-3.5 flex flex-col justify-center border border-gray-50">
                        <span className="text-[10px] font-medium text-gray-400 mb-1">BF</span>
                        <span className="text-[14px] font-extrabold text-gray-900">18</span>
                      </div>
                      <div className="bg-[#f0f6ff] rounded-lg p-3.5 flex flex-col justify-center border border-gray-50">
                        <span className="text-[10px] font-medium text-gray-400 mb-1">Print</span>
                        <span className="text-[14px] font-extrabold text-gray-900">Color</span>
                      </div>
                      <div className="bg-[#f0f6ff] rounded-lg p-3.5 flex flex-col justify-center border border-gray-50">
                        <span className="text-[10px] font-medium text-gray-400 mb-1">Quantity</span>
                        <span className="text-[14px] font-extrabold text-gray-900">15,000 <span className="text-[10px] font-semibold text-gray-500">Boxes</span></span>
                      </div>
                      <div className="bg-[#f0f6ff] rounded-lg p-3.5 flex flex-col justify-center border border-gray-50">
                        <span className="text-[10px] font-medium text-gray-400 mb-1">Joint Type</span>
                        <span className="text-[14px] font-extrabold text-gray-900">GSM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Grid (Paper Details & Box Weight) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  
                  {/* Paper Details */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-5 py-4 border-b border-gray-50">
                      <h3 className="text-[15px] font-bold tracking-wide bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block">
                        Paper Details
                      </h3>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-[#f0f6ff] rounded-lg p-4 flex flex-col justify-center border border-gray-50">
                          <span className="text-[11px] font-medium text-gray-400 mb-1">Top Paper</span>
                          <span className="text-[15px] font-extrabold text-gray-900">145</span>
                        </div>
                        <div className="bg-[#f0f6ff] rounded-lg p-4 flex flex-col justify-center border border-gray-50">
                          <span className="text-[11px] font-medium text-gray-400 mb-1">Liner</span>
                          <span className="text-[15px] font-extrabold text-gray-900">180</span>
                        </div>
                        <div className="bg-[#f0f6ff] rounded-lg p-4 flex flex-col justify-center border border-gray-50">
                          <span className="text-[11px] font-medium text-gray-400 mb-1">Flute</span>
                          <span className="text-[15px] font-extrabold text-gray-900">120</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Box Weight */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-5 py-4 border-b border-gray-50">
                      <h3 className="text-[15px] font-bold tracking-wide bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block">
                        Box Weight
                      </h3>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#f0f6ff] rounded-lg p-4 flex flex-col justify-center border border-gray-50">
                          <span className="text-[11px] font-medium text-gray-400 mb-1">Box Weight</span>
                          <span className="text-[15px] font-extrabold text-gray-900">1.153 <span className="text-[11px] font-semibold text-gray-500">Gms</span></span>
                        </div>
                        <div className="bg-[#f0f6ff] rounded-lg p-4 flex flex-col justify-center border border-gray-50">
                          <span className="text-[11px] font-medium text-gray-400 mb-1">Total Weight</span>
                          <span className="text-[15px] font-extrabold text-gray-900">1.2 <span className="text-[11px] font-semibold text-gray-500">Ton</span></span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Board Details */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col mt-2">
                  <div className="px-5 py-4 border-b border-gray-50">
                    <h3 className="text-[15px] font-bold tracking-wide bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block">
                      Board Details
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-[#fffcf5] rounded-lg p-4 flex flex-col justify-center border border-[#ffedd5]">
                        <span className="text-[11px] font-medium text-gray-500 mb-1">Board Size</span>
                        <span className="text-[15px] font-extrabold text-gray-900">88 X 145</span>
                      </div>
                      <div className="bg-[#fffcf5] rounded-lg p-4 flex flex-col justify-center border border-[#ffedd5]">
                        <span className="text-[11px] font-medium text-gray-500 mb-1">No. Of Plies</span>
                        <span className="text-[15px] font-extrabold text-gray-900">1000 <span className="text-[11px] font-semibold text-gray-600">2Ply</span></span>
                      </div>
                      <div className="bg-[#fffcf5] rounded-lg p-4 flex flex-col justify-center border border-[#ffedd5]">
                        <span className="text-[11px] font-medium text-gray-500 mb-1">No. Of Papers</span>
                        <span className="text-[15px] font-extrabold text-gray-900">1000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Component Section */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                  <div className="px-5 py-4 border-b border-gray-50">
                    <h3 className="text-[15px] font-bold tracking-wide bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block">
                      Component
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      
                      {/* Input Material */}
                      <div className="border border-gray-100 rounded-xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-3.5 bg-white">
                          <span className="text-[13px] font-bold text-gray-900 ml-1">Input Material</span>
                          <button className="flex items-center bg-black text-white px-3.5 py-1.5 rounded-md text-[11px] font-medium hover:bg-gray-800 transition-colors">
                            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Input
                          </button>
                        </div>
                        <div className="w-full overflow-x-auto">
                          <table className="w-full text-left border-collapse min-w-[380px]">
                            <thead className="bg-[#f9f9f9] border-y border-gray-100">
                              <tr>
                                <th className="px-4 py-3.5 text-[11px] font-medium text-gray-400">Name</th>
                                <th className="px-4 py-3.5 text-[11px] font-medium text-gray-400">Required Qty</th>
                                <th className="px-4 py-3.5 text-[11px] font-medium text-gray-400">Consumed Qty</th>
                                <th className="px-4 py-3.5 text-[11px] font-medium text-gray-400">Committed Stock</th>
                                <th className="px-4 py-3.5 text-[11px] font-medium text-gray-400">Unit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-50">
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">Kraft Paper</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">500</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">0</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">500.00</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">Kg</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">Adhesive</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">10</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">0</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">10.00</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">Kg</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Output Material */}
                      <div className="border border-gray-100 rounded-xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-3.5 bg-white">
                          <span className="text-[13px] font-bold text-gray-900 ml-1">Output Material</span>
                          <button className="flex items-center bg-black text-white px-3.5 py-1.5 rounded-md text-[11px] font-medium hover:bg-gray-800 transition-colors">
                            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Output
                          </button>
                        </div>
                        <div className="w-full overflow-x-auto">
                          <table className="w-full text-left border-collapse min-w-[380px]">
                            <thead className="bg-[#f9f9f9] border-y border-gray-100">
                              <tr>
                                <th className="px-4 py-3.5 text-[11px] font-medium text-gray-400">Name</th>
                                <th className="px-4 py-3.5 text-[11px] font-medium text-gray-400">Required Qty</th>
                                <th className="px-4 py-3.5 text-[11px] font-medium text-gray-400">Consumed Qty</th>
                                <th className="px-4 py-3.5 text-[11px] font-medium text-gray-400">Committed Stock</th>
                                <th className="px-4 py-3.5 text-[11px] font-medium text-gray-400">Unit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-50">
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">Kraft Paper</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">500</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">0</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">500.00</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">Kg</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">Adhesive</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">10</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">0</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">10.00</td>
                                <td className="px-4 py-3 text-[12px] font-medium text-gray-600">Kg</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                    {/* Production Schedule */}
                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col mb-4 mt-4">
                      <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="text-[15px] font-bold tracking-wide bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block">
                          Production Schedule
                        </h3>
                      </div>
                      <div className="py-8 relative w-full flex justify-between px-4">
                        {/* Connecting line */}
                        <div className="absolute top-[3rem] left-[20%] right-[20%] h-[1px] bg-gray-300 z-[0]"></div>

                        <div className="flex flex-col items-center relative z-10 flex-1">
                          <div className="h-8 flex items-center justify-center bg-white px-4 mb-3">
                            <div className="w-[30px] h-[30px] rounded-full bg-[#75c977] flex items-center justify-center">
                              <CalendarDays className="w-4 h-4 text-white" strokeWidth={2} />
                            </div>
                          </div>
                          <span className="text-[14px] font-medium text-gray-900 mb-1">Work Start date</span>
                          <span className="text-[13px] font-medium text-[#2f9247] mb-1">Wed, 30 Jun, 2026</span>
                          <span className="text-[11px] font-medium text-gray-500">06:34 pm IST</span>
                        </div>

                        <div className="flex flex-col items-center relative z-10 flex-1">
                          <div className="h-8 flex items-center justify-center bg-white px-4 mb-3">
                            <div className="w-[30px] h-[30px] rounded-full bg-[#fbbc19] flex items-center justify-center">
                              <Clock className="w-4 h-4 text-white" strokeWidth={2} />
                            </div>
                          </div>
                          <span className="text-[14px] font-medium text-gray-900 mb-1">Estimate Time</span>
                          <span className="text-[13px] font-medium text-[#d39f15] mb-1">20 hrs</span>
                        </div>

                        <div className="flex flex-col items-center relative z-10 flex-1">
                          <div className="h-8 flex items-center justify-center bg-white px-4 mb-3">
                            <div className="w-[30px] h-[30px] rounded-full bg-[#f26c6d] flex items-center justify-center">
                              <CalendarDays className="w-4 h-4 text-white" strokeWidth={2} />
                            </div>
                          </div>
                          <span className="text-[14px] font-medium text-gray-900 mb-1">Work End date</span>
                          <span className="text-[13px] font-medium text-[#c44344] mb-1">Wed, 10 July, 2026</span>
                          <span className="text-[11px] font-medium text-gray-500">06:34 pm IST</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Card */}
                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col mb-4">
                      <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="text-[15px] font-bold tracking-wide bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block">
                          Job Card
                        </h3>
                      </div>
                      <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[750px]">
                          <thead>
                            <tr className="bg-[#fbfbfb] border-b border-gray-100">
                              <th className="px-5 py-3 text-[11px] font-bold text-gray-500 tracking-wide">Job Card Type</th>
                              <th className="px-5 py-3 text-[11px] font-bold text-gray-500 tracking-wide">Job Card No.</th>
                              <th className="px-5 py-3 text-[11px] font-bold text-gray-500 tracking-wide">Department</th>
                              <th className="px-5 py-3 text-[11px] font-bold text-gray-500 tracking-wide">Status</th>
                              <th className="px-5 py-3 text-[11px] font-bold text-gray-500 tracking-wide">Start Date</th>
                              <th className="px-5 py-3 text-[11px] font-bold text-gray-500 tracking-wide">EST. End Date</th>
                              <th className="px-5 py-3 text-[11px] font-bold text-gray-500 tracking-wide">Progress</th>
                              <th className="px-5 py-3 text-[11px] font-bold text-gray-500 tracking-wide text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">Corrugator Job Card</td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">CJC-2026-0912</td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">Corrugation</td>
                              <td className="px-5 py-3.5">
                                <span className="bg-[#dcfce7] text-[#16a34a] text-[9px] font-extrabold px-2 py-0.5 rounded-full inline-block">Released</span>
                              </td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">25 Jul 2025</td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">28 Jul 2025</td>
                              <td className="px-5 py-3.5 text-[12px] font-extrabold text-[#1a233a]">92%</td>
                              <td className="px-5 py-3.5 text-center">
                                <button onClick={() => navigate('/production/job-card/CJC-2026-0912')} className="text-[#8b5cf6] hover:text-[#7c3aed] transition-colors inline-block">
                                  <Eye className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">Downstream Job Card</td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">DJC-2026-1548</td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">Die Cutting</td>
                              <td className="px-5 py-3.5">
                                <span className="bg-[#ffedd5] text-[#ea580c] text-[9px] font-extrabold px-2 py-0.5 rounded-full inline-block">Pending</span>
                              </td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">27 Jul 2025</td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">29 Jul 2025</td>
                              <td className="px-5 py-3.5 text-[12px] font-extrabold text-[#1a233a]">43%</td>
                              <td className="px-5 py-3.5 text-center">
                                <button onClick={() => navigate('/production/job-card/DJC-2026-1548')} className="text-[#8b5cf6] hover:text-[#7c3aed] transition-colors inline-block">
                                  <Eye className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">QC Inspection Card</td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">QC-2026-2210</td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">Quality Control</td>
                              <td className="px-5 py-3.5">
                                <span className="bg-[#dcfce7] text-[#16a34a] text-[9px] font-extrabold px-2 py-0.5 rounded-full inline-block">Released</span>
                              </td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">28 Jul 2025</td>
                              <td className="px-5 py-3.5 text-[11px] font-medium text-gray-500">31 Jul 2025</td>
                              <td className="px-5 py-3.5 text-[12px] font-extrabold text-[#1a233a]">98%</td>
                              <td className="px-5 py-3.5 text-center">
                                <button onClick={() => navigate('/production/job-card/QC-2026-2210')} className="text-[#8b5cf6] hover:text-[#7c3aed] transition-colors inline-block">
                                  <Eye className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col p-8 text-center text-gray-500">
                    Content for Job Cards will go here
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManufacturingOrderDetailsPage;
