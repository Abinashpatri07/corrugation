import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Plus, MoreHorizontal, Cpu, Play, Pause, CheckSquare, Clock, User, Check, Droplets, Gauge, X, Layers, Ruler, FlaskConical, Droplet } from 'lucide-react';

const tabs = ['Manufacturing Order', 'Job Cards'];

const MachineIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="5" y1="6" x2="19" y2="6" />
    <path d="M7 6l2.5 4h5L17 6" />
    <rect x="10.5" y="10" width="3" height="2" />
    <rect x="3" y="12" width="18" height="5" rx="2" />
    <line x1="7" y1="14.5" x2="8" y2="14.5" />
    <line x1="11.5" y1="14.5" x2="12.5" y2="14.5" />
    <line x1="16" y1="14.5" x2="17" y2="14.5" />
    <path d="M5 17l1 3h12l1-3" />
  </svg>
);

const CorrugatorJobDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Job Cards');
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5">
      
      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-6">
        <nav className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'Manufacturing Order') navigate('/production', { state: { tab: 'Manufacturing Order' } });
              }}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-gray-500 font-medium hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-1 cursor-pointer" onClick={() => navigate('/production')}>
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">
            All Job Cards
          </h2>
          <ChevronDown className="w-4 h-4 text-[#8b5cf6]" />
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white px-3 py-1.5 rounded-full text-[12px] font-bold flex items-center transition-opacity shadow-sm">
            <Plus className="w-3 h-3 mr-1" strokeWidth={2.5} />
            New
          </button>
          <button className="w-7 h-7 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors">
            <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-1 pb-10 mt-2">
        
        {/* --- Single Page Document Wrapper --- */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-5 mb-6">

          {/* Status Card */}
          <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
            {/* Left Info */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] flex items-center justify-center shadow-md">
                <MachineIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-[18px] font-bold text-[#1a233a]">Corrugator Line 1</h2>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a] text-[12px] font-medium border border-[#bbf7d0]">
                    <span className="w-1 h-1 rounded-full bg-[#16a34a]"></span>
                    Progress
                  </span>
                </div>
                <p className="text-[13px] text-gray-500 mb-0.5">MC-001 <span className="mx-1">•</span> Bay 1, Plant A</p>
                <p className="text-[13px] text-gray-500">Job Card : JC-38621</p>
              </div>
            </div>
            
            {/* Action Buttons & Assignment */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-2.5">
                <button onClick={() => setIsChecklistModalOpen(true)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#bfdbfe] text-[#2563eb] font-semibold text-[13px] hover:bg-blue-300 hover:shadow-sm transition-all">
                  <Play className="w-3.5 h-3.5 fill-current" /> Start
                </button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#ffedd5] text-[#c2410c] font-semibold text-[13px] hover:bg-orange-200 transition-colors">
                  <Pause className="w-3.5 h-3.5 fill-current" /> Pause
                </button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#bbf7d0] text-[#16a34a] font-semibold text-[13px] hover:bg-green-300 transition-colors">
                  <CheckSquare className="w-3.5 h-3.5" /> Complete
                </button>
              </div>
              
              <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden h-8 shadow-sm w-full">
                <div className="px-2.5 py-1 bg-gray-50 text-gray-700 text-[13px] font-bold border-r border-gray-300 h-full flex items-center">
                  Assigned To:
                </div>
                <div className="flex-1 flex items-center px-2.5 relative">
                  <User className="w-3.5 h-3.5 text-gray-400 absolute left-2.5" />
                  <input 
                    type="text" 
                    placeholder="Select a shopfloor staff" 
                    className="w-full pl-5 text-[13px] text-gray-600 focus:outline-none placeholder-gray-400"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Timer Card */}
            <div className="bg-[#f8fafc] border border-blue-100 rounded-xl p-3 w-56 shadow-sm flex gap-3 items-center">
              <div>
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-0.5">Elapsed run Time</p>
                <p className="text-[24px] font-bold text-[#1a233a] leading-none mb-1">02:15:36</p>
                <p className="text-[12px] font-medium text-gray-500">Started at 08:00 Am</p>
              </div>
            </div>
          </div>

          {/* Middle Row (Customer Profile & Order Details) */}
          <div className="grid grid-cols-2 gap-5">
            
            {/* Customer Profile */}
            <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
              <h3 className="text-[16px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit mb-3">
                Customer Profile
              </h3>
              <div className="h-[1px] w-full bg-gray-100 mb-4"></div>
              
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white flex items-center justify-center font-bold text-[16px] shadow-sm">
                  CP
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#1a233a]">Century Pulp &amp; Paper</h4>
                  <p className="text-[12px] font-medium text-gray-400 uppercase">CLIC-01142</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex">
                  <span className="w-36 text-[13px] text-gray-500">Customer Code</span>
                  <span className="text-[13px] font-bold text-[#1a233a]">CLIC-01142</span>
                </div>
                <div className="flex">
                  <span className="w-36 text-[13px] text-gray-500">Customer Name</span>
                  <span className="text-[13px] font-bold text-[#1a233a]">Climamax Controls Pvt Ltd</span>
                </div>
                <div className="flex">
                  <span className="w-36 text-[13px] text-gray-500">GSTIN</span>
                  <span className="text-[13px] font-bold text-[#1a233a]">29BGBBB2222B2Z2</span>
                </div>
                <div className="flex">
                  <span className="w-36 text-[13px] text-gray-500">Point Of Contact</span>
                  <span className="text-[13px] font-bold text-[#1a233a]">Sarah Jenkins</span>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
              <h3 className="text-[16px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit mb-3">
                Order Details
              </h3>
              <div className="h-[1px] w-full bg-gray-100 mb-4"></div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Sale Order</span>
                  <span className="text-[13px] font-bold text-[#1a233a]">SO-11294</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Manufacturing Order</span>
                  <span className="text-[13px] font-bold text-[#1a233a]">MO-08217</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Scheduled Start Time</span>
                  <span className="text-[13px] font-bold text-[#1a233a]">25 Aug, 08:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Actual Start Time</span>
                  <span className="text-[13px] font-bold text-[#1a233a]">25 Aug, 09:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Scheduled End Time</span>
                  <span className="text-[13px] font-bold text-[#1a233a]">25 Aug, 14:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Actual End Time</span>
                  <span className="text-[13px] font-bold text-[#1a233a]">25 Aug, 15:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Specification */}
          <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-[16px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit mb-3">
              Product Specification
            </h3>
            <div className="h-[1px] w-full bg-gray-100 mb-4"></div>
            
            <div className="grid grid-cols-6 gap-4 mb-5">
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-1">Box Type</p>
                <p className="text-[13px] font-bold text-[#1a233a]">Universal</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-1">Paper Type</p>
                <p className="text-[13px] font-bold text-[#1a233a]">NS</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-1">Size</p>
                <p className="text-[13px] font-bold text-[#1a233a]">Large</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-1">Ply</p>
                <p className="text-[13px] font-bold text-[#1a233a]">5 Ply</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-1">Joint Type</p>
                <p className="text-[13px] font-bold text-[#1a233a]">Clean</p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-1">Print Type</p>
                <p className="text-[13px] font-bold text-[#1a233a]">2 Colour Flexo</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#f8fafc] rounded-lg px-3 py-2 flex justify-between items-center border border-gray-200">
                <span className="text-[13px] text-gray-500">Length</span>
                <span className="text-[13px] font-bold text-[#1a233a]">38 cm</span>
              </div>
              <div className="bg-[#f8fafc] rounded-lg px-3 py-2 flex justify-between items-center border border-gray-200">
                <span className="text-[13px] text-gray-500">Width</span>
                <span className="text-[13px] font-bold text-[#1a233a]">32 cm</span>
              </div>
              <div className="bg-[#f8fafc] rounded-lg px-3 py-2 flex justify-between items-center border border-gray-200">
                <span className="text-[13px] text-gray-500">Height</span>
                <span className="text-[13px] font-bold text-[#1a233a]">54 cm</span>
              </div>
            </div>
          </div>

          {/* Component */}
          <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-[16px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit mb-3">
              Component
            </h3>
            <div className="grid grid-cols-2 gap-5">
              
              {/* Input Material */}
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100 bg-white">
                  <h4 className="text-[13px] font-bold text-[#1a233a]">Input Material</h4>
                  <button className="flex items-center gap-1 px-2 py-1 bg-black text-white text-[12px] font-medium rounded-md hover:bg-gray-800 transition-colors">
                    <Plus className="w-3 h-3" /> Add Input
                  </button>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-[#f8fafc]">
                    <tr>
                      <th className="px-3 py-2 text-[12px] font-medium text-gray-400">Name</th>
                      <th className="px-3 py-2 text-[12px] font-medium text-gray-400">Required Qty</th>
                      <th className="px-3 py-2 text-[12px] font-medium text-gray-400">Consumed Qty</th>
                      <th className="px-3 py-2 text-[12px] font-medium text-gray-400">Committed Stock</th>
                      <th className="px-3 py-2 text-[12px] font-medium text-gray-400">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-3 py-2 text-[13px] text-gray-600 font-medium">Kraft Paper</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">500</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">0</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">500.00</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">Kg</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-[13px] text-gray-600 font-medium">Adhesive</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">10</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">0</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">10.00</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">Kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Output Material */}
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100 bg-white">
                  <h4 className="text-[13px] font-bold text-[#1a233a]">Output Material</h4>
                  <button className="flex items-center gap-1 px-2 py-1 bg-black text-white text-[12px] font-medium rounded-md hover:bg-gray-800 transition-colors">
                    <Plus className="w-3 h-3" /> Add Output
                  </button>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-[#f8fafc]">
                    <tr>
                      <th className="px-3 py-2 text-[12px] font-medium text-gray-400">Name</th>
                      <th className="px-3 py-2 text-[12px] font-medium text-gray-400">Required Qty</th>
                      <th className="px-3 py-2 text-[12px] font-medium text-gray-400">Consumed Qty</th>
                      <th className="px-3 py-2 text-[12px] font-medium text-gray-400">Committed Stock</th>
                      <th className="px-3 py-2 text-[12px] font-medium text-gray-400">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-3 py-2 text-[13px] text-gray-600 font-medium">Kraft Paper</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">500</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">0</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">500.00</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">Kg</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-[13px] text-gray-600 font-medium">Adhesive</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">10</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">0</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">10.00</td>
                      <td className="px-3 py-2 text-[13px] text-gray-600">Kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          {/* Manufacturing Specification */}
          <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-[16px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit mb-3">
              Manufacturing Specification
            </h3>
            <div className="grid grid-cols-2 gap-5">
              
              {/* Paper Details */}
              <div className="border border-gray-100 rounded-xl p-4">
                <h4 className="text-[13px] font-bold text-[#1a233a] mb-3">Paper Details</h4>
                <div className="h-[1px] w-full bg-gray-100 mb-3"></div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#f8fafc] rounded-lg p-3">
                    <p className="text-[12px] font-medium text-gray-500 mb-1">Top Paper</p>
                    <p className="text-[13px] font-bold text-[#1a233a]">145 GSM</p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-lg p-3">
                    <p className="text-[12px] font-medium text-gray-500 mb-1">Liner</p>
                    <p className="text-[13px] font-bold text-[#1a233a]">150 GSM</p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-lg p-3">
                    <p className="text-[12px] font-medium text-gray-500 mb-1">Flute</p>
                    <p className="text-[13px] font-bold text-[#1a233a]">120 GSM</p>
                  </div>
                </div>
              </div>

              {/* Board Details */}
              <div className="border border-gray-100 rounded-xl p-4">
                <h4 className="text-[13px] font-bold text-[#1a233a] mb-3">Board Details</h4>
                <div className="h-[1px] w-full bg-gray-100 mb-3"></div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#f8fafc] rounded-lg p-3">
                    <p className="text-[12px] font-medium text-gray-500 mb-1">Length</p>
                    <p className="text-[13px] font-bold text-[#1a233a]">88 cm</p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-lg p-3">
                    <p className="text-[12px] font-medium text-gray-500 mb-1">Width</p>
                    <p className="text-[13px] font-bold text-[#1a233a]">145 cm</p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-lg p-3">
                    <p className="text-[12px] font-medium text-gray-500 mb-1">BF</p>
                    <p className="text-[13px] font-bold text-[#1a233a]">18</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Manufacturing Checklist */}
          <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[16px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">
                Manufacturing Checklist
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center"></div>
                <span className="text-[12px] text-gray-500 font-medium">3 of 3 confirmed</span>
              </div>
            </div>
            
            <div className="relative mb-4">
              {/* Connecting Line */}
              <div className="absolute top-3.5 left-[10%] right-[10%] h-0.5 bg-[#22c55e]"></div>

              <div className="flex justify-between relative z-10 text-center">
                {/* Step 1 */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-7 h-7 rounded-full bg-[#22c55e] flex items-center justify-center text-white mb-2 ring-4 ring-white shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-[13px] font-bold text-[#1a233a]">GSM Verified</p>
                  <p className="text-[11px] text-gray-400">Top, liner and flute match spec</p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-7 h-7 rounded-full bg-[#22c55e] flex items-center justify-center text-white mb-2 ring-4 ring-white shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-[13px] font-bold text-[#1a233a]">Size Verified</p>
                  <p className="text-[11px] text-gray-400">Board dimensions match order</p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-7 h-7 rounded-full bg-[#22c55e] flex items-center justify-center text-white mb-2 ring-4 ring-white shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-[13px] font-bold text-[#1a233a]">Glue Verified</p>
                  <p className="text-[11px] text-gray-400">Adhesive specification check</p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-7 h-7 rounded-full bg-white border-2 border-[#22c55e] flex items-center justify-center text-[#22c55e] mb-2 ring-4 ring-white shadow-sm">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[13px] font-bold text-[#1a233a]">Moisture Content</p>
                  <p className="text-[11px] text-gray-400 mb-1.5">Recorded reading</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-600 w-14 text-right">
                      8.2
                    </div>
                    <span className="text-[12px] text-gray-500">%</span>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-7 h-7 rounded-full bg-white border-2 border-[#22c55e] flex items-center justify-center text-[#22c55e] mb-2 ring-4 ring-white shadow-sm">
                    <Gauge className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[13px] font-bold text-[#1a233a]">Machine avg speed</p>
                  <p className="text-[11px] text-gray-400 mb-1.5">Recorded reading</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-600 w-14 text-right">
                      180
                    </div>
                    <span className="text-[12px] text-gray-500">m/min</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-5 pt-3 border-t border-gray-100">
              <p className="text-[13px] font-bold text-[#1a233a]">Assign By: Rahul</p>
            </div>
          </div>
        
        </div>

      </div>

      {/* Checklist Modal */}
      {isChecklistModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-[500px] max-w-full rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] px-6 py-4 flex justify-between items-center text-white">
              <h2 className="text-xl font-bold">Manufacturing Checklist</h2>
              <X className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsChecklistModalOpen(false)} />
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="border border-gray-100 rounded-2xl p-2 space-y-2 shadow-sm">
                
                {/* GSM Verified */}
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f0fdf4] text-[#22c55e] flex items-center justify-center border border-[#dcfce7]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1a233a]">GSM Verified</h4>
                      <p className="text-[11px] text-gray-400">Top, liner and flute match spec</p>
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </div>

                {/* Size Verified */}
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f0fdf4] text-[#22c55e] flex items-center justify-center border border-[#dcfce7]">
                      <Ruler className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1a233a]">Size Verified</h4>
                      <p className="text-[11px] text-gray-400">Board dimensions match order</p>
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </div>

                {/* Glue Verified */}
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f0fdf4] text-[#22c55e] flex items-center justify-center border border-[#dcfce7]">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1a233a]">Glue Verified</h4>
                      <p className="text-[11px] text-gray-400">Adhesive specification check</p>
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </div>

                {/* Moisture content */}
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f0fdf4] text-[#22c55e] flex items-center justify-center border border-[#dcfce7]">
                      <Droplet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1a233a]">Moisture content</h4>
                      <p className="text-[11px] text-gray-400">Recorded reading</p>
                    </div>
                  </div>
                  <div className="flex border border-gray-200 rounded-md overflow-hidden h-8 w-24">
                    <input type="text" className="w-full text-right px-2 outline-none text-[13px] text-gray-700 font-medium" placeholder="0.0" />
                    <span className="bg-gray-50 border-l border-gray-200 px-2 flex items-center text-[12px] text-gray-500">%</span>
                  </div>
                </div>

                {/* Machine avg speed */}
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f0fdf4] text-[#22c55e] flex items-center justify-center border border-[#dcfce7]">
                      <Gauge className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1a233a]">Machine avg speed</h4>
                      <p className="text-[11px] text-gray-400">Recorded reading</p>
                    </div>
                  </div>
                  <div className="flex border border-gray-200 rounded-md overflow-hidden h-8 w-28">
                    <input type="text" className="w-full text-right px-2 outline-none text-[13px] text-gray-700 font-medium" placeholder="0" />
                    <span className="bg-gray-50 border-l border-gray-200 px-2 flex items-center text-[12px] text-gray-500">m/min</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CorrugatorJobDetailsPage;

