import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Settings, Clock, Package, CheckCircle, TrendingUp, AlertCircle, FileText, Activity, Box, Search, Plus, MoreHorizontal, ChevronDown, X, Factory, Gauge, Zap, Layers, Weight, Ruler, Battery, Power, Wrench, Briefcase, User, Timer, Download, Eye } from 'lucide-react';

const BAR_DATA = [
  { day: 'Mon', value: 120, height: '120px', color: '#34d399' },
  { day: 'Tue', value: 200, height: '200px', color: '#fbbf24' },
  { day: 'Wed', value: 150, height: '150px', color: '#84cc16' },
  { day: 'Thu', value: 80, height: '80px', color: '#0ea5e9' },
  { day: 'Fri', value: 70, height: '70px', color: '#a855f7' },
  { day: 'Sat', value: 110, height: '110px', color: '#6366f1' },
  { day: 'Sun', value: 130, height: '130px', color: '#14b8a6' },
];
const MAX_VAL = 200;


const utilizationData = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 110 },
  { day: 'Wed', value: 140 },
  { day: 'Thu', value: 40 },
  { day: 'Fri', value: 70 },
  { day: 'Sat', value: 140 },
  { day: 'Sun', value: 180 }
];

const MachineDetailsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const { id } = useParams();

  const productionReportData = Array(5).fill({
    date: '20 Jul 2026',
    todaysHours: 24,
    weeklyOff: 0,
    workingDay: 'Yes',
    plannedHours: 12,
    reportedHours: 11,
    idleHours: '01',
    downtime: '0.5 hrs',
    utilization: '92%'
  });

  return (
    <div className="flex h-full bg-[#f4f7f9] p-1.5 gap-1.5 overflow-hidden">
      
      {/* ── Left Sidebar (List) ── */}
      <div className="w-full lg:w-[260px] shrink-0 flex flex-col bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1 cursor-pointer">
              <h2 className="text-xl tracking-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]">All Machinery</h2>
              <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/machine/new')}
                className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search machine..."
              className="w-full pl-8 pr-3 py-2 text-[12px] bg-gray-100 border border-transparent rounded-md focus:bg-white focus:border-blue-500 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3 hide-scrollbar">
          {/* Active Machine */}
          <div className="bg-gradient-to-br from-[#ffede1] via-[#fae8f8] to-[#efdfff] rounded-[14px] px-3 py-2 cursor-pointer shadow-sm border border-transparent mb-2">
            <div className="flex justify-between items-start mb-0.5">
              <span className="text-[12px] font-medium text-[#374151]">MC-001</span>
              <span className="text-[9px] text-gray-500 font-medium">25/06/2026</span>
            </div>
            <h3 className="text-[11px] font-semibold text-[#111827] mb-1 truncate">
              Bobst Die Cutting Machine
            </h3>
            <span className="inline-block px-2 py-[2px] opacity-0 pointer-events-none text-[9px] font-medium rounded-full leading-none">
              Placeholder
            </span>
          </div>

          {/* Inactive Machine 1 */}
          <div className="bg-white rounded-[14px] px-3 py-2 cursor-pointer shadow-sm border border-gray-200 mb-2 hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all">
            <div className="flex justify-between items-start mb-0.5">
              <span className="text-[12px] font-medium text-[#374151]">MC-002</span>
              <span className="text-[9px] text-gray-400 font-medium">25/06/2026</span>
            </div>
            <h3 className="text-[11px] font-semibold text-[#111827] mb-1 truncate">
              Heidelberg Offset Printer
            </h3>
            <span className="inline-block px-2 py-[2px] bg-[#e6fce5] text-[#16a34a] text-[9px] font-bold rounded-full leading-none uppercase">
              Active
            </span>
          </div>

          {/* Inactive Machine 2 */}
          <div className="bg-white rounded-[14px] px-3 py-2 cursor-pointer shadow-sm border border-gray-200 mb-2 hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all">
            <div className="flex justify-between items-start mb-0.5">
              <span className="text-[12px] font-medium text-[#374151]">MC-003</span>
              <span className="text-[9px] text-gray-400 font-medium">25/06/2026</span>
            </div>
            <h3 className="text-[11px] font-semibold text-[#111827] mb-1 truncate">
              Polar Guillotine Cutter
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-[3px] bg-orange-50 text-[#ea580c] text-[10px] font-bold rounded-full leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></span>
              Idle
            </span>
          </div>
          
        </div>
      </div>

      {/* ── Right Area (Details) ── */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-transparent">
        
        {/* Top Header Card */}
        <div className="bg-white shrink-0 border border-gray-100 rounded-[20px] shadow-sm mb-1">
          <div className="px-3 lg:px-4 p-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ef4444] to-[#a855f7] flex items-center justify-center text-white shadow-sm shrink-0">
                  <Factory className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <div className="flex items-center gap-2">
                    <h1 className="text-[16px] font-medium text-[#111827] leading-none tracking-tight">Corrugation</h1>
                    <span className="px-2 py-[2px] bg-[#e6fce5] text-[#16a34a] text-[10px] font-medium rounded-full leading-none">
                      Active
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6b7280] font-medium tracking-wide leading-none">
                    CODE • MC-001
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gray-100 my-3"></div>

            {/* Stat Cards */}
            <div className="flex gap-4 overflow-x-auto hide-scrollbar">
              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[170px] flex-1">
                <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center bg-[#e5fce3] text-[#16a34a]">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-[#4b5563] font-medium mb-1 truncate">Today's Runtime</div>
                <div className="text-[18px] font-semibold text-[#111827] leading-none flex items-baseline gap-1">
                  9 <span className="text-[11px] font-medium text-[#4b5563]">Hours</span>
                </div>
              </div>

              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[170px] flex-1">
                <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center bg-[#eef2ff] text-[#4f46e5]">
                  <Box className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-[#4b5563] font-medium mb-1 truncate">Today's Production</div>
                <div className="text-[18px] font-semibold text-[#111827] leading-none flex items-baseline gap-1">
                  4,250 <span className="text-[11px] font-medium text-[#4b5563]">Boxes</span>
                </div>
              </div>

              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[170px] flex-1">
                <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center bg-[#fae8ff] text-[#c026d3]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-[#4b5563] font-medium mb-1 truncate">Reported Hours</div>
                <div className="text-[18px] font-semibold text-[#111827] leading-none flex items-baseline gap-1">
                  216 <span className="text-[11px] font-medium text-[#4b5563]">Hours</span>
                </div>
              </div>

              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[170px] flex-1">
                <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center bg-[#ffedd5] text-[#ea580c]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-[#4b5563] font-medium mb-1 truncate">Machine Utilization</div>
                <div className="text-[18px] font-semibold text-[#111827] leading-none flex items-baseline gap-1">
                  96%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Content Card */}
        <div className="bg-white flex-1 flex flex-col overflow-hidden border border-gray-100 rounded-[20px] shadow-sm">
          
          {/* Tabs */}
          <div className="flex gap-6 px-3 lg:px-4 pt-3 shrink-0 border-b border-gray-100">
            {['Overview', 'Utilization', 'Maintenance', 'Document'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-[13px] transition-colors ${activeTab === tab
                  ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]'
                  : 'font-semibold text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Scrollable Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-3 lg:p-4 bg-[#f8fafc] rounded-b-[20px]">
            {activeTab === 'Overview' && (
              <div className="space-y-6 max-w-7xl mx-auto">
            

            
            {/* 1. Machine Details */}
            <div className="bg-white rounded-[12px] p-6 mb-6">
              <div className="flex items-center gap-3 mb-4 shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">
                  <Box className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-[16px] font-bold text-[#111827]">Machine Details</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Machine Code</span>
                  <span className="text-[13px] font-semibold text-[#111827]">MC-001</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Machine Name</span>
                  <span className="text-[13px] font-semibold text-[#111827]">AD 1228_5C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Machine Category</span>
                  <span className="text-[13px] font-semibold text-[#111827]">Corrugation Machinery</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Machine Type</span>
                  <span className="text-[13px] font-semibold text-[#111827]">Corrugator</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Brand</span>
                  <span className="text-[13px] font-semibold text-[#111827]">BHS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Model</span>
                  <span className="text-[13px] font-semibold text-[#111827]">BHS-009541</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Serial Number</span>
                  <span className="text-[13px] font-semibold text-[#111827]">SN-789456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Manufacturing Date</span>
                  <span className="text-[13px] font-semibold text-[#111827]">02 Jan 2019</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Vendor / Supplier</span>
                  <span className="text-[13px] font-semibold text-[#111827]">BHS Service Pvt Ltd</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Purchase Date</span>
                  <span className="text-[13px] font-semibold text-[#111827]">20 Jan 2019</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Purchase Price</span>
                  <span className="text-[13px] font-semibold text-[#111827]">₹48,50,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Warranty Period</span>
                  <span className="text-[13px] font-semibold text-[#111827]">24 Month (Expire 14Feb)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Installation Date</span>
                  <span className="text-[13px] font-semibold text-[#111827]">14 Feb 2019</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Location</span>
                  <span className="text-[13px] font-semibold text-[#111827]">Plant A, Line A</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Department</span>
                  <span className="text-[13px] font-semibold text-[#111827]">Corrugation</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Machine Status <span className="text-red-500">*</span></span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-4.5 bg-[#16a34a] rounded-full p-[2px] flex items-center shadow-inner relative cursor-pointer transition-colors">
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm absolute right-[2px]"></div>
                    </div>
                    <span className="text-[13px] font-semibold text-[#111827]">Active</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                <span className="text-[13px] text-gray-500 block mb-2">Description</span>
                <div className="bg-[#f9fafb] border border-gray-100 rounded-[12px] p-4">
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    High-speed corrugator unit installed for core paper board production. Operates on 3-shift cycle supporting Line A daily output target of 6,000 boxes.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Technical Specification */}
            <div className="bg-white rounded-[12px] p-6">
              <div className="flex items-center gap-3 mb-4 shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-[16px] font-bold text-[#111827]">Technical specification</h2>
              </div>
              
              <div className="grid grid-cols-3 gap-4 auto-rows-fr">
                {/* Speed */}
                <div className="bg-yellow-50 rounded-[12px] p-4 flex items-center gap-4 h-full">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-0.5">Speed</div>
                    <div className="text-[15px] font-semibold text-[#111827]">180 RPM</div>
                  </div>
                </div>
                
                {/* Voltage */}
                <div className="bg-purple-50 rounded-[12px] p-4 flex items-center gap-4 h-full">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-0.5">Voltage</div>
                    <div className="text-[15px] font-semibold text-[#111827]">415 V</div>
                  </div>
                </div>
                
                {/* Capacity */}
                <div className="bg-blue-50 rounded-[12px] p-4 flex items-center gap-4 h-full">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-0.5">Capacity</div>
                    <div className="text-[15px] font-semibold text-[#111827]">6,000 Boxes/day</div>
                  </div>
                </div>
                
                {/* Power */}
                <div className="bg-pink-50 rounded-[12px] p-4 flex items-center gap-4 h-full">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                    <Power className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-0.5">power</div>
                    <div className="text-[15px] font-semibold text-[#111827]">45 KW</div>
                  </div>
                </div>
                
                {/* Weight */}
                <div className="bg-green-50 rounded-[12px] p-4 flex items-center gap-4 h-full">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <Weight className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-0.5">Weight</div>
                    <div className="text-[15px] font-semibold text-[#111827]">6,200 Kg</div>
                  </div>
                </div>
                
                {/* Dimensions */}
                <div className="bg-cyan-50 rounded-[12px] p-4 flex items-center gap-4 h-full">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-0.5">Dimensions (L × W × H)</div>
                    <div className="text-[15px] font-semibold text-[#111827]">12.5m × 2.8m × 3.2m</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}

      
            {activeTab === 'Maintenance' && (
              <div className="space-y-6 max-w-7xl mx-auto">
                
                {/* Top Row: Maintenance & Last Maintenance */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
                  {/* Maintenance Info */}
                  <div className="flex flex-col lg:col-span-5">
                    <div className="flex items-center gap-3 mb-4 shrink-0">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">
                        <Wrench className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[#111827]">Maintenance</h2>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 px-3 py-5 border border-gray-100 rounded-[12px] bg-white shadow-sm flex-1 items-center">
                      <span className="text-[13px] text-gray-500">Maintenance Type</span><span className="text-[13px] font-semibold text-[#111827]">Preventive</span>
                      <span className="text-[13px] text-gray-500">Maintenance Status</span><span className="text-[13px] font-semibold text-[#111827]">Scheduled</span>
                      <span className="text-[13px] text-gray-500">Service Vendor</span><span className="text-[13px] font-semibold text-[#111827]">sunservice PVT.LTD</span>
                      <span className="text-[13px] text-gray-500">Maintenance contact</span><span className="text-[13px] font-semibold text-[#111827]">+ 91 7643542763</span>
                      <span className="text-[13px] text-gray-500">last Service Cost</span><span className="text-[13px] font-semibold text-[#111827]">18,456.00</span>
                      <span className="text-[13px] text-gray-500">Note</span><span className="text-[13px] font-semibold text-[#111827]">Monthly repair</span>
                    </div>
                  </div>
                  
                  {/* Last Maintenance */}
                  <div className="flex flex-col lg:col-span-7">
                    <div className="flex items-center gap-3 mb-4 shrink-0">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">
                        <Briefcase className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[#111827]">Last Maintenance</h2>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 px-3 py-5 border border-gray-100 rounded-[12px] bg-white shadow-sm flex-1 items-start">
                      <span className="text-[13px] text-gray-500 pt-0.5">Maintenance date</span><span className="text-[13px] font-semibold text-[#111827]">4.5 Hrs</span>
                      <span className="text-[13px] text-gray-500 pt-0.5">Maintenance Type</span><span className="text-[13px] font-semibold text-[#111827]">18,500</span>
                      <span className="text-[13px] text-gray-500 pt-0.5">Duration</span><span className="text-[13px] font-semibold text-[#111827]">4.5 Hrs</span>
                      <span className="text-[13px] text-gray-500 pt-0.5">Cost</span><span className="text-[13px] font-semibold text-[#111827]">18,500</span>
                      <span className="text-[13px] text-gray-500 pt-0.5">Technician</span><span className="text-[13px] font-semibold text-[#111827]">Rajesh Kumar</span>
                      <span className="text-[13px] text-gray-500 pt-0.5">Work Performed</span><span className="text-[13px] font-semibold text-[#111827] leading-relaxed">Oil Replacement, lubrication, inspection, mechanical and electrical check.</span>
                    </div>
                  </div>
                </div>

                {/* Second Row: Vendor & Upcoming Maintenance */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
                  {/* Vendor Info */}
                  <div className="flex flex-col lg:col-span-5">
                    <div className="flex items-center gap-3 mb-4 shrink-0">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[#111827]">Vendor</h2>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 px-3 py-5 border border-gray-100 rounded-[12px] bg-white shadow-sm flex-1 items-center">
                      <span className="text-[13px] text-gray-500">Service Vendor</span><span className="text-[13px] font-semibold text-[#111827]">Bobst India Pvt Ltd</span>
                      <span className="text-[13px] text-gray-500">Vendor Contact</span><span className="text-[13px] font-semibold text-[#111827]">+91 8041235678</span>
                      <span className="text-[13px] text-gray-500">Email</span><span className="text-[13px] font-semibold text-[#111827]">service@bobstindia.com</span>
                      <span className="text-[13px] text-gray-500">service Agreement</span>
                      <div><div className="inline-flex bg-[#dcfce7] text-[#16a34a] text-[11px] font-bold px-3 py-1 rounded-full">Active</div></div>
                    </div>
                  </div>
                  
                  {/* Upcoming Maintenance */}
                  <div className="flex flex-col lg:col-span-7">
                    <div className="flex items-center gap-3 mb-4 shrink-0">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">
                        <Timer className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[#111827]">Upcoming Maintanance</h2>
                    </div>
                    <div className="px-3 py-5 border border-gray-100 rounded-[12px] bg-white shadow-sm flex-1 flex flex-col justify-between">
                      <div className="grid grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_auto_1fr] gap-x-6 gap-y-3 items-center">
                        <span className="text-[13px] text-gray-500">Next Maintenance Date</span>
                        <span className="text-[13px] font-bold text-red-500">15/07/2026</span>
                        
                        <span className="text-[13px] text-gray-500">Priority</span>
                        <div><span className="inline-block bg-orange-50 text-orange-600 text-[11px] font-bold px-3 py-1 rounded-full border border-orange-100">Medium</span></div>
                        
                        <span className="text-[13px] text-gray-500">Estimated Duration</span>
                        <span className="text-[13px] font-semibold text-[#111827]">4.0 Hrs</span>
                        
                        <span className="text-[13px] text-gray-500">Maintenance Type</span>
                        <span className="text-[13px] font-semibold text-[#111827]">Preventive</span>
                      </div>
                      <div className="mt-8 bg-orange-50/50 p-2.5 rounded-[8px] flex items-center justify-between border border-orange-50">
                        <span className="text-[12px] text-yellow-700 font-medium ml-2">Maintenance is due in 21 days</span>
                        <button className="text-[10px] font-semibold text-blue-600 bg-white border border-blue-200 px-3 py-1.5 rounded-[4px] shadow-sm">Schedule Maintenance</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Frequency Section */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[#111827]">Frequency</h2>
                    </div>
                    
                    <div className="p-1">
                      <div className="grid grid-cols-4 gap-4 bg-white border border-gray-100 rounded-[12px] p-4 shadow-sm">
                        <div className="bg-[#f8fafc] p-3 rounded-[10px]">
                          <div className="text-[11px] text-gray-500 mb-1">Maintenance frequency</div>
                          <div className="text-[15px] font-semibold text-[#111827]">Montly</div>
                        </div>
                        <div className="bg-[#f8fafc] p-3 rounded-[10px]">
                          <div className="text-[11px] text-gray-500 mb-1">Next Cycle Due In</div>
                          <div className="inline-block bg-orange-100 text-orange-600 text-[13px] font-bold px-2 py-0.5 rounded-[6px]">21 Days</div>
                        </div>
                        <div className="bg-[#f8fafc] p-3 rounded-[10px]">
                          <div className="text-[11px] text-gray-500 mb-1">Average Duration</div>
                          <div className="text-[15px] font-semibold text-[#111827]">4.0 Hrs</div>
                        </div>
                        <div className="bg-[#f8fafc] p-3 rounded-[10px]">
                          <div className="text-[11px] text-gray-500 mb-1">Cycle</div>
                          <div className="text-[15px] font-semibold text-[#111827]">Every 30 Days</div>
                        </div>
                      </div>
                    </div>
                </div>

                {/* Maintenance History Table */}
                <div className="pb-6">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[#111827]">Maintenance History</h2>
                    </div>
                    
                    <div className="bg-white rounded-[12px] shadow-sm border border-gray-100 overflow-hidden">
                       <table className="w-full text-left">
                         <thead>
                           <tr className="bg-[#f4f6f8] border-b border-gray-200 text-[13px]">
                             <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Date</th>
                             <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Maintenance ID</th>
                             <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Type</th>
                             <th className="py-2.5 px-4 font-bold text-[#6b778c]">Description</th>
                             <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Technician</th>
                             <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Cost</th>
                             <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Status</th>
                           </tr>
                         </thead>
                         <tbody>
                           <tr className="border-b border-gray-100">
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">10/06/2026</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">MT-2026-0048</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">Preventive</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 w-[250px]">Oil replacement,lubrication, inspection</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">Rajesh Kumar</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">₹18,500</td>
                             <td className="py-2.5 px-4 whitespace-nowrap">
                               <div className="inline-flex bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold px-2 py-0.5 rounded-full">Completed</div>
                             </td>
                           </tr>
                           <tr className="border-b border-gray-100">
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">12/05/2026</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">MT-2026-0035</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">Routine</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 w-[250px]">Mechanical & electrical inspection</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">Amit Verma</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">₹12,800</td>
                             <td className="py-2.5 px-4 whitespace-nowrap">
                               <div className="inline-flex bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold px-2 py-0.5 rounded-full">Completed</div>
                             </td>
                           </tr>
                           <tr>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">10/04/2026</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">MT-2026-0022</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">Corrective</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 w-[250px]">Sensor replacement</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">Ramesh Yadav</td>
                             <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">₹8,500</td>
                             <td className="py-2.5 px-4 whitespace-nowrap">
                               <div className="inline-flex bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold px-2 py-0.5 rounded-full">Completed</div>
                             </td>
                           </tr>
                         </tbody>
                       </table>
                    </div>
                </div>
              </div>
            )}
            
            
            {activeTab === 'Document' && (
              <div className="space-y-6 max-w-7xl mx-auto">
                <div className="bg-white rounded-[12px] p-6 mb-6">
                  <h2 className="text-[16px] font-bold text-[#111827] mb-4">Machine Document</h2>
                  
                  <div className="bg-white rounded-[12px] shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[#f4f6f8] border-b border-gray-200 text-[13px]">
                          <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Document Name</th>
                          <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Size</th>
                          <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Files Type</th>
                          <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Status</th>
                          <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Operational Manual', size: '2.25 MB', type: 'PDF' },
                          { name: 'Purchase invoice', size: '1.20 MB', type: 'PDF' },
                          { name: 'Last Mainte', size: '1.10 MB', type: 'PDF' },
                        ].map((doc, idx) => (
                          <tr key={idx} className="border-b border-gray-100 last:border-0">
                            <td className="py-2.5 px-4 text-[13px] text-gray-800 whitespace-nowrap flex items-center gap-2 font-medium">
                              <FileText className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                              {doc.name}
                            </td>
                            <td className="py-2.5 px-4 text-[13px] text-gray-800 whitespace-nowrap font-medium">{doc.size}</td>
                            <td className="py-2.5 px-4 text-[13px] text-gray-800 whitespace-nowrap font-medium">{doc.type}</td>
                            <td className="py-2.5 px-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-0.5 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Uploaded</span>
                            </td>
                            <td className="py-2.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-3 text-gray-400">
                                <Eye className="w-4 h-4 hover:text-gray-600 cursor-pointer transition-colors" />
                                <Download className="w-4 h-4 hover:text-gray-600 cursor-pointer transition-colors" />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}


            {activeTab === 'Utilization' && (
              <div className="space-y-3 max-w-7xl mx-auto">
                
                {/* Top Section: Analytics */}
                <div className="bg-white rounded-[12px] p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[16px] font-bold text-[#111827]">Machine Utilization Analytics</h2>
                    <select className="text-[12px] font-medium text-gray-500 border border-gray-200 rounded-md px-3 py-1.5 outline-none bg-white cursor-pointer hover:bg-gray-50">
                      <option>Last Week</option>
                      <option>This Month</option>
                    </select>
                  </div>
                  
                  {/* Chart Implementation */}
                  <div className="h-[220px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={utilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="utilGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#4ade80" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} domain={[0, 200]} ticks={[0, 50, 100, 150, 200]} dx={-10} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={2} strokeDasharray="4 4" fill="url(#utilGrad)" dot={false} activeDot={{ r: 5, fill: '#4ade80', stroke: '#fff', strokeWidth: 2 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* 4 Cards */}
                  <div className="grid grid-cols-4 gap-4">
                     <div className="border border-gray-100 rounded-[10px] p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                       <div className="text-[11px] font-medium text-gray-400 mb-2">Average Utilization</div>
                       <div className="text-[20px] font-bold text-[#111827]">85.4%</div>
                     </div>
                     <div className="border border-gray-100 rounded-[10px] p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                       <div className="text-[11px] font-medium text-gray-400 mb-2">Peak Utilization</div>
                       <div className="text-[20px] font-bold text-[#111827]">96%</div>
                     </div>
                     <div className="border border-gray-100 rounded-[10px] p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                       <div className="text-[11px] font-medium text-gray-400 mb-2">Lowest Utilization</div>
                       <div className="text-[20px] font-bold text-[#111827]">62%</div>
                     </div>
                     <div className="border border-gray-100 rounded-[10px] p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                       <div className="text-[11px] font-medium text-gray-400 mb-2">Operating Hours</div>
                       <div className="text-[20px] font-bold text-[#111827]">92h</div>
                     </div>
                  </div>
                </div>

                {/* Middle Section: 2 Cards Side-by-Side */}
                <div className="grid grid-cols-2 gap-4">
                   {/* Production Performance */}
                   <div className="bg-white rounded-[12px] p-4 shadow-sm border border-gray-100">
                     <div className="flex items-center gap-3 mb-4 shrink-0">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">
                           <Box className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-[15px] font-bold text-[#111827]">Production Performance</h2>
                     </div>
                     
                     <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[11px] text-gray-500 font-medium">Today's Target</span>
                           <span className="text-[14px] font-bold text-[#111827]">5,000</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-[#ff3b30] to-[#b82db8] rounded-full" style={{ width: '85%' }}></div>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-y-4">
                        <div>
                           <div className="text-[11px] text-gray-400 font-medium mb-1">Completed</div>
                           <div className="text-[18px] font-bold text-[#111827]">4,250</div>
                        </div>
                        <div>
                           <div className="text-[11px] text-gray-400 font-medium mb-1">Remaining</div>
                           <div className="text-[18px] font-bold text-[#111827]">750</div>
                        </div>
                        <div>
                           <div className="text-[11px] text-gray-400 font-medium mb-1">Rejected</div>
                           <div className="text-[18px] font-bold text-[#111827]">32</div>
                        </div>
                        <div>
                           <div className="text-[11px] text-gray-400 font-medium mb-1">Quality Score</div>
                           <div className="text-[18px] font-bold text-[#111827]">99.2%</div>
                        </div>
                     </div>
                   </div>
                   
                   {/* Working Hours Summary */}
                   <div className="bg-white rounded-[12px] p-4 shadow-sm border border-gray-100">
                     <div className="flex items-center gap-3 mb-4 shrink-0">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">
                           <Box className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-[15px] font-bold text-[#111827]">Working Hours Summary</h2>
                     </div>
                     <div className="grid grid-cols-2 gap-y-4">
                        <div>
                           <div className="text-[11px] text-gray-400 font-medium mb-1">Today's Hours</div>
                           <div className="text-[18px] font-bold text-[#111827]">11</div>
                        </div>
                        <div>
                           <div className="text-[11px] text-gray-400 font-medium mb-1">Weekly Off</div>
                           <div className="text-[18px] font-bold text-[#111827]">2</div>
                        </div>
                        <div>
                           <div className="text-[11px] text-gray-400 font-medium mb-1">Working Days</div>
                           <div className="text-[18px] font-bold text-[#111827]">9</div>
                        </div>
                        <div>
                           <div className="text-[11px] text-gray-400 font-medium mb-1">Reported Hours</div>
                           <div className="text-[18px] font-bold text-[#111827]">216</div>
                        </div>
                        <div>
                           <div className="text-[11px] text-gray-400 font-medium mb-1">Runtime</div>
                           <div className="text-[18px] font-bold text-[#111827]">108 Hrs</div>
                        </div>
                        <div>
                           <div className="text-[11px] text-gray-400 font-medium mb-1">Idle Hours</div>
                           <div className="text-[18px] font-bold text-[#111827]">12 Hrs</div>
                        </div>
                     </div>
                   </div>
                </div>

                {/* Bottom Section: Production Report */}
                <div className="bg-white rounded-[12px] shadow-sm border border-gray-100 overflow-hidden pb-4">
                  <div className="p-5 border-b border-gray-100">
                     <h2 className="text-[16px] font-bold text-[#111827] mb-1">Production Report</h2>
                     <p className="text-[11px] text-gray-400">Detailed runtime, utilization, and downtime records</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                         <tr className="bg-[#f8fafc] text-[11px] font-bold text-[#6b778c] border-b border-gray-100">
                           <th className="py-1 px-3 whitespace-nowrap">Date</th>
                           <th className="py-1 px-3 whitespace-nowrap">Today's Hours</th>
                           <th className="py-1 px-3 whitespace-nowrap">Weekly Off</th>
                           <th className="py-1 px-3 whitespace-nowrap">Working Day</th>
                           <th className="py-1 px-3 whitespace-nowrap">Planned Hours</th>
                           <th className="py-1 px-3 whitespace-nowrap">Reported Hours</th>
                           <th className="py-1 px-3 whitespace-nowrap">Idle Hours</th>
                           <th className="py-1 px-3 whitespace-nowrap">Downtime</th>
                           <th className="py-1 px-3 whitespace-nowrap">Utilization</th>
                         </tr>
                       </thead>
                       <tbody>
                         {productionReportData.map((row, i) => (
                           <tr key={i} className="border-b border-gray-50 last:border-0 text-[12px] text-gray-800 hover:bg-gray-50 transition-colors">
                             <td className="py-1 px-3 whitespace-nowrap">{row.date}</td>
                             <td className="py-1 px-3 whitespace-nowrap">{row.todaysHours}</td>
                             <td className="py-1 px-3 whitespace-nowrap">{row.weeklyOff}</td>
                             <td className="py-1 px-3 whitespace-nowrap">{row.workingDay}</td>
                             <td className="py-1 px-3 whitespace-nowrap">{row.plannedHours}</td>
                             <td className="py-1 px-3 whitespace-nowrap text-gray-500">{row.reportedHours}</td>
                             <td className="py-1 px-3 whitespace-nowrap text-gray-500">{row.idleHours}</td>
                             <td className="py-1 px-3 whitespace-nowrap text-gray-500">{row.downtime}</td>
                             <td className="py-1 px-3 whitespace-nowrap font-medium">{row.utilization}</td>
                           </tr>
                         ))}
                       </tbody>
                    </table>
                  </div>
                  <div className="px-5 pt-4 text-[11px] text-gray-500 font-medium">
                     Showing 1-5 of 11
                  </div>
                </div>
              </div>
            )}

{activeTab !== 'Overview' && activeTab !== 'Maintenance' && activeTab !== 'Document' && activeTab !== 'Utilization' && (

              <div className="flex items-center justify-center h-full text-gray-400 font-medium">
                Content for {activeTab} will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetailsPage;
