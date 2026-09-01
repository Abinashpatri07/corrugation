import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus, FileText, Box, Calculator, Layers, Palette, ChevronDown, Calendar, Bookmark,
  Package, Truck, Receipt, CheckCircle, CreditCard, Factory, Search, Plus, UploadCloud, ClipboardList,
  PackagePlus, PackageCheck, HandCoins, Check, Phone
} from 'lucide-react';

const CreateQuotePage = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  const tabs = [
    { name: 'Quotes', path: '/sales/quotes' },
    { name: 'Sales Orders', path: '/sales/orders' },
    { name: 'Invoices', path: '/sales/invoices' },
    { name: 'Payments', path: '/sales/payments' }
  ];

  const steps = [
    { name: 'Quote', icon: PackagePlus, active: true },
    { name: 'Sales order', icon: FileText, active: false },
    { name: 'Production', icon: Factory, active: false },
    { name: 'Package', icon: Package, active: false },
    { name: 'Ship', icon: Truck, active: false },
    { name: 'Invoice', icon: Receipt, active: false },
    { name: 'Delivered', icon: PackageCheck, active: false },
    { name: 'Payment', icon: HandCoins, active: false },
  ];

  const materials = [
    { id: 1, name: 'Reel 121', spec: 'GSM 230-100x150 BF 18', weight: '1200 Kg', selected: true },
    { id: 2, name: 'Reel 122', spec: 'GSM 230-100x150 BF 18', weight: '1300 Kg', selected: false },
    { id: 3, name: 'Reel 123', spec: 'GSM 230-100x150 BF 18', weight: '1000 Kg', selected: true },
    { id: 4, name: 'Reel 124', spec: 'GSM 230-100x150 BF 18', weight: '800 Kg', selected: false },
    { id: 5, name: 'Reel 125', spec: 'GSM 230-100x150 BF 18', weight: '900 Kg', selected: false },
    { id: 6, name: 'Reel 126', spec: 'GSM 230-100x150 BF 18', weight: '1100 Kg', selected: false },
  ];

  const [selectedMaterials, setSelectedMaterials] = useState([1, 3]);

  const toggleMaterial = (id) => {
    if (selectedMaterials.includes(id)) {
      setSelectedMaterials(selectedMaterials.filter(mId => mId !== id));
    } else {
      setSelectedMaterials([...selectedMaterials, id]);
    }
  };

  return (
    <main className="flex-1 overflow-hidden bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5 font-sans">

      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap ${tab.name === 'Quotes'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col gap-1.5 min-h-0">
        {/* Header and Stepper */}
        <div className="bg-white px-6 py-2 rounded-xl border border-gray-200 shadow-sm shrink-0">
          <h2 className="text-[20px] font-bold tracking-tight bg-gradient-to-r from-[#ff6b6b] via-[#9333ea] to-[#4338ca] bg-clip-text text-transparent inline-block mb-1">
            Quote Creation
          </h2>

          <div className="flex items-center w-full relative px-6 z-0">
            {/* Connecting Line */}
            <div className="absolute top-4 left-10 right-10 h-[2px] bg-gray-200 z-[-1]"></div>
            <div className="absolute top-4 left-10 w-[calc(100%-5rem)] max-w-[calc(100%/7)] h-[2px] bg-gradient-to-r from-[#ff6b6b] via-[#9333ea] to-[#4338ca] z-[-1]"></div>

            <div className="flex items-center justify-between w-full">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.name} className="flex flex-col items-center px-2 relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 relative z-10 ${step.active
                        ? 'bg-gradient-to-br from-[#ff6b6b] via-[#9333ea] to-[#4338ca] text-white shadow-md'
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                      }`}>
                      <Icon className="w-3.5 h-3.5" strokeWidth={step.active ? 2.5 : 2} />
                    </div>
                    <span className={`text-[10px] font-semibold ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto custom-scrollbar pb-4 pr-1">

          {/* Section 1: Customer Selection */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-[#ff5a6e] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a233a]">Customer Selection</h3>
                <p className="text-xs text-gray-400 mt-1">Define corporate account details for dynamic tax and billing mapping.</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Search Customer <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm">
                  <option>ZAP Private Limited - GST: 27AABCU9603R1ZV | POC: Rahul Mehta</option>
                </select>
                <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-500 mb-2">Name</label>
                <div className="border border-gray-200 rounded-md px-3 py-2 bg-white flex items-center text-[13px] text-[#1a233a] shadow-sm">
                  <Box className="w-4 h-4 text-gray-400 mr-3" />
                  ZAP Private Limited
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-500 mb-2">GST</label>
                <div className="border border-gray-200 rounded-md px-3 py-2 bg-white flex items-center text-[13px] text-[#1a233a] shadow-sm">
                  <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 text-[10px] mr-3">$</span>
                  27AABCUJMSAIU462BC
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-500 mb-2">Phone</label>
                <div className="border border-gray-200 rounded-md px-3 py-2 bg-white flex items-center text-[13px] text-[#1a233a] shadow-sm">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" />
                  +91 764539543
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Quote Details */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-[#b649d8] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a233a]">Quote Details</h3>
                <p className="text-xs text-gray-400 mt-1">Determine product size limits, raw material configurations, and volume structures.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Quote <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Reference# <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Optional Reference" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Quote Date</label>
                <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Expire Date</label>
                <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Sales Persons</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none bg-white">
                    <option>Manoj Kumar</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Project Name</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none bg-white">
                    <option>Select Project</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Product Specification */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-[#7b46ef] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a233a]">Product Specification</h3>
                <p className="text-xs text-gray-400 mt-1">Determine product size limits, raw material configurations, and volume structures.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Row 1 */}
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Item Name <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Item Description <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Quantity <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Print type <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none bg-white">
                    <option>Plain</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Box Type <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none bg-white">
                    <option>Universal</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Box Size <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none bg-white">
                    <option>Medium</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Box Measurement <span className="text-[10px] text-gray-400 font-normal">(IN CM)</span> <span className="text-red-500">*</span></label>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <input type="text" defaultValue="" placeholder=" " className="peer w-full border border-gray-200 rounded-md px-2 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm text-center" />
                    <div className="absolute left-4 top-3 items-center space-x-1.5 text-gray-400 hidden peer-placeholder-shown:flex pointer-events-none">
                      <Box className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">L</span>
                    </div>
                  </div>
                  <span className="text-gray-300">×</span>
                  <div className="relative flex-1">
                    <input type="text" defaultValue="" placeholder=" " className="peer w-full border border-gray-200 rounded-md px-2 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm text-center" />
                    <div className="absolute left-4 top-3 items-center space-x-1.5 text-gray-400 hidden peer-placeholder-shown:flex pointer-events-none">
                      <Box className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">W</span>
                    </div>
                  </div>
                  <span className="text-gray-300">×</span>
                  <div className="relative flex-1">
                    <input type="text" defaultValue="" placeholder=" " className="peer w-full border border-gray-200 rounded-md px-2 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm text-center" />
                    <div className="absolute left-4 top-3 items-center space-x-1.5 text-gray-400 hidden peer-placeholder-shown:flex pointer-events-none">
                      <Box className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">H</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Paper <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none bg-white">
                    <option>NS</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                </div>
              </div>

              {/* Row 3 */}
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Ply Type <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none bg-white">
                    <option>5 Ply</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Top paper GSM <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Liner <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Flute <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Joint type <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none bg-white">
                    <option>Clean</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                </div>
              </div>

              {/* Row 4: Calculate Button */}
              <div className="md:col-span-4"></div>
              <div className="flex items-end justify-end">
                <button className="w-full px-6 py-2 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-md hover:opacity-90 transition-opacity">
                  Calculate
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Board Calculation */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start mb-5">
              <div className="w-10 h-10 bg-[#4f67ff] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a233a]">Board Calculation</h3>
                <p className="text-xs text-gray-400 mt-1">Calculate board dimensions, paper usage, and production requirements.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Left inputs */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Board Size (L x W)</label>
                  <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">BF (Board Factor)</label>
                  <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Top Paper GSM</label>
                  <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Two Ply GSM</label>
                  <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Box Weight (Per Box)</label>
                  <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Total Weight (Order)</label>
                  <input type="text" defaultValue="" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>
                </div>
              </div>

              {/* Right Summary */}
              <div className="w-full md:w-[350px] bg-gradient-to-br from-[#fff5f5] to-[#f5f3ff] rounded-2xl p-5 flex flex-col justify-center border border-white/50 shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-dashed border-[#dce4f0]">
                  <span className="text-[11px] font-semibold text-gray-500">Box Value</span>
                  <span className="text-[12px] font-medium text-[#1a233a]">₹62/BOX</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-[#dce4f0]">
                  <span className="text-[11px] font-semibold text-gray-500">Sub Total</span>
                  <span className="text-[12px] font-medium text-[#1a233a]">₹53,754.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-[#dce4f0]">
                  <span className="text-[11px] font-semibold text-gray-500">GST</span>
                  <span className="text-[12px] font-medium text-[#1a233a]">18%</span>
                </div>
                <div className="flex justify-between items-center py-2 mb-1">
                  <span className="text-[11px] font-semibold text-gray-500">Discount</span>
                  <div className="bg-white px-2.5 py-0.5 rounded text-[12px] font-medium text-[#1a233a] shadow-sm border border-gray-100">
                    ₹2,829.72
                  </div>
                </div>

                <div className="mt-0">
                  <span className="text-[11px] font-bold text-gray-500 block mb-0.5">ESTIMATED TOTAL</span>
                  <div className="text-[32px] leading-tight font-bold text-[#1a233a]">₹ 80,600</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Material Availability */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#089dd2] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a233a]">Material Availability</h3>
                  <p className="text-xs text-gray-400 mt-1">Check available stock and material readiness for production.</p>
                </div>
              </div>
              <div className="text-xs font-medium text-gray-400 mt-2">
                {selectedMaterials.length} of {materials.length} selected
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {materials.map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => toggleMaterial(mat.id)}
                  className={`border rounded-xl p-3 cursor-pointer transition-colors relative ${selectedMaterials.includes(mat.id)
                      ? 'border-[#8fc2d6] bg-[#f0f9ff]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-semibold text-[#1a233a] text-sm">{mat.name}</span>
                    <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${selectedMaterials.includes(mat.id) ? 'bg-[#3f7a8f]' : 'border border-gray-300'
                      }`}>
                      {selectedMaterials.includes(mat.id) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-400 mb-1.5">{mat.spec}</div>
                  <div className="text-[13px]">
                    <span className="font-bold text-[#1a233a]">{mat.weight}</span>
                    <span className="text-gray-400 ml-1 text-[11px]">in stock</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Print Specifications */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-[#15b79e] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a233a]">Print Specifications</h3>
                <p className="text-xs text-gray-400 mt-1">Required for printed boxes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Number of Colors <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">
                    <Palette className="w-4 h-4" />
                  </span>
                  <input type="text" defaultValue="" className="w-full min-w-0 border border-gray-200 rounded-md pl-10 pr-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Print Area <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">
                    <Layers className="w-4 h-4" />
                  </span>
                  <input type="text" defaultValue="" className="w-full min-w-0 border border-gray-200 rounded-md pl-10 pr-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Artwork Upload <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-[#a3c2fa] rounded-lg p-4 flex items-center bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <UploadCloud className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1a233a]">Drop artwork or click to upload</p>
                    <p className="text-[10px] text-gray-400 font-medium">PDF, AI, PSD, PNG or JPG up to 25 MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Printing Notes</label>
                <textarea
                  rows="3"
                  defaultValue=""
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none h-[76px]"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 7: Additional Information */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b6b] to-[#b649d8] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a233a]">Additional Information</h3>
                <p className="text-xs text-gray-400 mt-1">Delivery, priority and instructions.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Delivery Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="text" defaultValue="07/15/2026" className="w-full min-w-0 border border-gray-200 rounded-md px-3 pr-10 py-2 text-[13px] font-semibold text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                  <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Order Type <span className="text-red-500">*</span></label>
                <div className="flex items-center space-x-2 mt-1.5">
                  <button className="text-[11px] font-semibold text-gray-600 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors">Normal</button>
                  <button className="text-[11px] font-semibold text-[#f97316] bg-[#fff7ed] border border-[#fdba74]/50 px-4 py-1.5 rounded-full shadow-sm">Urgent</button>
                  <button className="text-[11px] font-semibold text-gray-600 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors">High Priority</button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Remarks / Special Instructions</label>
              <textarea
                rows="3"
                defaultValue="Batch requires additional edge reinforcing during custom slotting."
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none"
              ></textarea>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Footer Actions */}
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 px-6 py-2 flex items-center justify-end space-x-3 z-50 mt-auto">
        <button
          onClick={() => navigate('/sales/quotes')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-opacity"
        >
          Save
        </button>
      </div>

      {/* Live Order Summary Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4">
          <div className="bg-[#f4f7fb] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh]">

            {/* Header */}
            <div className="bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] px-6 py-4 flex justify-between items-center rounded-t-xl">
              <div>
                <p className="text-white/80 text-xs font-medium mb-0.5">Live Order Summary</p>
                <h3 className="text-2xl font-bold text-white tracking-wide">Preview</h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <Package className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">

              {/* Customer */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#1a233a]">Customer</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">Name</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">ZAP Private Limited</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">GST Number</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">22AAAAA0000A1Z5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-gray-500 font-medium">Phone</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">+91 98765 43210</span>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#1a233a]">Product Specifications</h4>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Box Type</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">Printed</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Box Size</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">Medium</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Box Measurement</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">998 × 654 × 663</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Paper</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">NS</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Ply Type</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">5 Ply</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Top Paper</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">GSM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Liner</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">145</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Fluter</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">120</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Print Type</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">Plain</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Joint Type</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">Clean</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-[12px] text-gray-500 font-medium">Dispatch Date</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">20.8.2026</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-[12px] text-gray-500 font-medium">Quantity</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">5000</span>
                  </div>
                </div>
              </div>

              {/* Board Calculation */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#1a233a]">Board Calculation</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">Board</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">88 × 145</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">BF</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">18</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">TOP Paper</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">1300</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">Two-Ply</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">2600</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">Box Weight</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">1.153 Kg</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">Total Weight</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">1 Ton</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-[13px] text-gray-500 font-medium">Box Value</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">62</span>
                  </div>
                </div>
              </div>

              {/* Material Available */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#1a233a]">Material Available</h4>
                </div>

                <div className="space-y-4">
                  {/* Reel 125 */}
                  <div className="border border-gray-100 rounded-xl p-4 bg-[#fafbfc]">
                    <h5 className="text-[14px] font-bold text-[#1a233a] mb-4">Reel 125</h5>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Type</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">NS</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">GSM</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">230</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Size</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">100 × 150</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">BF</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">18</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Available</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">1500 Kg</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Required</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">800 Kg</p>
                      </div>
                    </div>
                  </div>

                  {/* Reel 126 */}
                  <div className="border border-gray-100 rounded-xl p-4 bg-[#fafbfc]">
                    <h5 className="text-[14px] font-bold text-[#1a233a] mb-4">Reel 126</h5>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Type</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">NS</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">GSM</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">230</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Size</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">100 × 150</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">BF</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">18</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Available</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">1500 Kg</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Required</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">800 Kg</p>
                      </div>
                    </div>
                  </div>

                  {/* Reel 127 */}
                  <div className="border border-gray-100 rounded-xl p-4 bg-[#fafbfc]">
                    <h5 className="text-[14px] font-bold text-[#1a233a] mb-4">Reel 127</h5>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Type</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">NS</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">GSM</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">230</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Size</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">100 × 150</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">BF</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">18</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Available</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">1500 Kg</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-semibold mb-1">Required</p>
                        <p className="text-[13px] text-[#1a233a] font-bold">800 Kg</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 px-2 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] text-[#1a233a] font-bold">Total Reels</span>
                      <span className="text-[14px] text-[#1a233a] font-bold">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] text-[#1a233a] font-bold">Total Quantity Allocated</span>
                      <span className="text-[14px] text-[#1a233a] font-bold">2400 Kg</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimated Total Block */}
              <div className="bg-[#fff1f2] rounded-xl p-5 flex justify-between items-end border border-[#ffe4e6]">
                <div>
                  <p className="text-[11px] font-bold text-[#ff6b6b] uppercase tracking-wider mb-2">Estimated Total</p>
                  <h2 className="text-[32px] leading-none font-bold text-[#1a233a]">₹ 80,600</h2>
                </div>
                <div className="text-[14px] font-bold text-gray-500">
                  @ ₹62 /BOX
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-between items-center pt-4 pb-2">
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-[48%] py-3 bg-white text-[#1a233a] rounded-full text-sm font-bold border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm flex items-center justify-center"
                >
                  Edit Order
                </button>
                <button
                  onClick={() => {
                    setShowPreview(false);
                    navigate('/sales/quotes');
                  }}
                  className="w-[48%] py-3 bg-gradient-to-r from-[#f86583] to-[#4534e1] text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center"
                >
                  Confirm Order
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      </main>
  );
};

export default CreateQuotePage;
