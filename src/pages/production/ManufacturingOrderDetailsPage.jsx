import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Search, Plus, MoreHorizontal, Edit, Send, Printer, Repeat, MoreVertical, Bookmark } from 'lucide-react';

const ManufacturingOrderDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeSubTab, setActiveSubTab] = useState('Manufacturing Order');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f4f7f9]">
      
      {/* ── Master-Detail Layout ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Master List) */}
        <div className="w-[320px] bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-[#1a233a]">All MO</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Plus className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search customer, product or item..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Selected Card */}
            <div className="border border-blue-200 bg-white rounded-xl p-4 shadow-sm relative cursor-pointer ring-1 ring-blue-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[12px] font-bold text-blue-600">MO-2026-04871</span>
                <span className="text-[10px] font-bold text-red-500">Urgent</span>
              </div>
              <h3 className="text-[13px] font-bold text-[#1a233a] mb-1">Veena Foods Pvt Ltd</h3>
              <p className="text-[11px] text-gray-500 mb-1">RSC 5-Ply Export Box, Print 2 Color</p>
              <p className="text-[11px] text-gray-500">25,000 Pcs</p>
            </div>
          </div>
        </div>

        {/* Right Area (Detail View) */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
          
          {/* Action Header */}
          <div className="px-8 py-4 border-b border-gray-200 flex items-center justify-between bg-white z-10 sticky top-0">
            <h1 className="text-[20px] font-bold text-[#1a233a]">Manufacturing Order</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100">
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100">
                <Send className="w-4 h-4" /> Send <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100">
                <Printer className="w-4 h-4" /> PDF/ Print
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <Repeat className="w-4 h-4" /> Convert to Job Card
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-100">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Form Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-8 relative">
            <div className="max-w-4xl mx-auto space-y-6 pb-20">
              
              {/* Card 1: MO Details */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[18px] font-bold text-[#1a233a] mb-6">MO-2026-04871</h2>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Manufacturing Order (MO)</label>
                      <input type="text" value="MO-2026-04871" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Sales Order (SO)</label>
                      <input type="text" value="SO-2026-000458" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Manufacturing Order Date</label>
                      <input type="text" value="22-Jul-2026" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Sales Order Date</label>
                      <input type="text" value="23 Jul 2026" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Customer Details */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Customer Details</h2>
                  
                  <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Customer ID</label>
                      <input type="text" value="CUST-2026-00124" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Customer Name</label>
                      <input type="text" value="Sunrise Packaging Solutions Pvt. Ltd" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">POC</label>
                      <input type="text" value="Rahul Sharma" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Box Specification */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Box Specification</h2>
                  
                  <div className="grid grid-cols-5 gap-x-4 gap-y-6">
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Box Style</label>
                      <input type="text" value="22-Jul-2026" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Length (Mm)</label>
                      <input type="text" value="400" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Width (Mm)</label>
                      <input type="text" value="300" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Height (Mm)</label>
                      <input type="text" value="250" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Deckle (Mm)</label>
                      <input type="text" value="1120" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>

                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Cut Length (Mm)</label>
                      <input type="text" value="1480" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Flute Type</label>
                      <input type="text" value="B Flute (Fine)" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Ply</label>
                      <input type="text" value="5-Ply (Double Wall)" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Top Liner GSM</label>
                      <input type="text" value="150" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Fluting GSM</label>
                      <input type="text" value="120" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>

                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Middle Liner GSM</label>
                      <input type="text" value="100" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Bottom Liner GSM</label>
                      <input type="text" value="150" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Print Colors</label>
                      <input type="text" value="2" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Die Number</label>
                      <input type="text" value="DIE-0219" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Quantity & Board Requirement */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Quantity & Board Requirement</h2>
                  
                  <div className="grid grid-cols-4 gap-x-6 gap-y-6 mb-8">
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Order Quantity (Pcs)</label>
                      <input type="text" value="25000" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Wastage Allowance %</label>
                      <input type="text" value="4.5" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Board Area Required <span className="text-orange-400 font-normal">Auto</span></label>
                      <input type="text" value="41,440 Sq.Mtr" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Est. Paper Weight <span className="text-orange-400 font-normal">Auto</span></label>
                      <input type="text" value="21,548 Kg" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-[12px] text-gray-500 mb-4">Component Breakdown (Includes 4.5% Wastage)</p>
                    <div className="flex justify-between items-center text-[12px]">
                      <div>Top Liner (150g): <span className="font-bold text-[#1a233a]">4,465 Kg</span></div>
                      <div>Middle Liner (100g): <span className="font-bold text-[#1a233a]">2,976 Kg</span></div>
                      <div>Fluting (120g): <span className="font-bold text-[#1a233a]">9,643 Kg</span></div>
                      <div>Bottom Liner (150g): <span className="font-bold text-[#1a233a]">4,465 Kg</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Manufacturing Date */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Manufacturing Date</h2>
                  
                  <div className="grid grid-cols-3 gap-x-6">
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Scheduled Manufacturing Date</label>
                      <input type="text" value="25 Jul 2025" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Target Completion Date</label>
                      <input type="text" value="30 Jul 2025" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Estimate Duration</label>
                      <input type="text" value="5 Days" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 6: Associated Jobcard */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Associated Jobcard</h2>
                  
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-[13px]">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 font-semibold text-gray-600">Job Card Type</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Job Card No.</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Department</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Start Date</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">EST. End Date</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Progress</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">Corrugator Job Card</td>
                          <td className="px-4 py-3 text-gray-700">CJC-2026-0912</td>
                          <td className="px-4 py-3 text-gray-700">Corrugation</td>
                          <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#dcfce7] text-[#16a34a]">Released</span></td>
                          <td className="px-4 py-3 text-gray-700">25 Jul 2025</td>
                          <td className="px-4 py-3 text-gray-700">28 Jul 2025</td>
                          <td className="px-4 py-3 font-bold text-[#1a233a]">92%</td>
                          <td className="px-4 py-3 text-blue-500 cursor-pointer">👁 🗑</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 text-gray-700">Downstream Job Card</td>
                          <td className="px-4 py-3 text-gray-700">DJC-2026-1548</td>
                          <td className="px-4 py-3 text-gray-700">Die Cutting</td>
                          <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-100 text-orange-600">Pending</span></td>
                          <td className="px-4 py-3 text-gray-700">27 Jul 2025</td>
                          <td className="px-4 py-3 text-gray-700">29 Jul 2025</td>
                          <td className="px-4 py-3 font-bold text-[#1a233a]">43%</td>
                          <td className="px-4 py-3 text-blue-500 cursor-pointer">👁 🗑</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-gray-700">QC Inspection Card</td>
                          <td className="px-4 py-3 text-gray-700">QC-2026-2210</td>
                          <td className="px-4 py-3 text-gray-700">Quality Control</td>
                          <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#dcfce7] text-[#16a34a]">Released</span></td>
                          <td className="px-4 py-3 text-gray-700">28 Jul 2025</td>
                          <td className="px-4 py-3 text-gray-700">31 Jul 2025</td>
                          <td className="px-4 py-3 font-bold text-[#1a233a]">98%</td>
                          <td className="px-4 py-3 text-blue-500 cursor-pointer">👁 🗑</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Card 7: Process Routing */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Process Routing</h2>
                  
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-[13px]">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 font-semibold text-gray-600">Steps</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Process</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Machine</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Std. Speed</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-4 text-gray-700">1</td>
                          <td className="px-4 py-4 text-gray-700">Corrugation</td>
                          <td className="px-4 py-4 text-gray-700">Corrugator-2</td>
                          <td className="px-4 py-4 text-gray-700">180 M/Min</td>
                          <td className="px-4 py-4"><span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#dcfce7] text-[#16a34a]">Complete</span></td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-4 text-gray-700">2</td>
                          <td className="px-4 py-4 text-gray-700">Printing (Flexo)</td>
                          <td className="px-4 py-4 text-gray-700">Flexo-1</td>
                          <td className="px-4 py-4 text-gray-700">140 Sheets/Min</td>
                          <td className="px-4 py-4"><span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-100 text-orange-600">In Production</span></td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-4 text-gray-700">3</td>
                          <td className="px-4 py-4 text-gray-700">Die-Cutting</td>
                          <td className="px-4 py-4 text-gray-700">Autoplaten-1</td>
                          <td className="px-4 py-4 text-gray-700">110 Sheets/Min</td>
                          <td className="px-4 py-4"><span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#dcfce7] text-[#16a34a]">Complete</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4 text-gray-700">4</td>
                          <td className="px-4 py-4 text-gray-700">Gluing & Bundling</td>
                          <td className="px-4 py-4 text-gray-700">Gluer-1</td>
                          <td className="px-4 py-4 text-gray-700">120 Boxes/Min</td>
                          <td className="px-4 py-4"><span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#dcfce7] text-[#16a34a]">Complete</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Card 8: Remarks */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Remarks</h2>
                  
                  <textarea 
                    className="w-full h-24 p-4 text-[13px] text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none bg-gray-50"
                    defaultValue="Export Order — Water-Resistant Coating Required On Outer Liner. Palletize As Per Customer Packing SOP."
                    readOnly
                  ></textarea>
                </div>
              </div>

            </div>
          </div>
          
          {/* Bottom Floating Bar */}
          {/* ── Fixed Footer ── */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-3 flex justify-end items-center gap-3 z-20">
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
      </div>
    </div>
  );
};

export default ManufacturingOrderDetailsPage;
