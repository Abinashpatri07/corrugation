import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Search, Plus, MoreHorizontal, Edit, Send, Printer, Repeat, MoreVertical, Bookmark } from 'lucide-react';

const CorrugatorJobDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeSubTab, setActiveSubTab] = useState('Job Cards');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f4f7f9]">
      
      {/* ── Master-Detail Layout ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Master List) */}
        <div className="w-[320px] bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-[#1a233a]">All Job Cards</h2>
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
                <span className="text-[12px] font-bold text-blue-600">JC-CORR-9042</span>
              </div>
              <h3 className="text-[13px] font-bold text-[#1a233a] mb-1">Veena Foods Pvt Ltd</h3>
            </div>
          </div>
        </div>

        {/* Right Area (Detail View) */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
          
          {/* Action Header */}
          <div className="px-8 py-4 border-b border-gray-200 flex items-center justify-between bg-white z-10 sticky top-0">
            <h1 className="text-[20px] font-bold text-[#1a233a]">Job Cards</h1>
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
              
              {/* Card 1: Job Card Details */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[18px] font-bold text-[#1a233a] mb-6">JC-CORR-9042</h2>
                  
                  <div className="grid grid-cols-4 gap-x-6">
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Machine Line</label>
                      <input type="text" value="Corrugator-2" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Shift</label>
                      <input type="text" value="Shift B (14:00 - 22:00)" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Lead Operator</label>
                      <input type="text" value="M. Iqbal" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Time Start</label>
                      <input type="text" value="14:05" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Customer Details & Overview */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Customer Details</h2>
                  
                  <div className="grid grid-cols-3 gap-x-6 gap-y-6 mb-8">
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Top Liner Reel No</label>
                      <input type="text" value="CUST-2026-00124" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Fluting Reel No</label>
                      <input type="text" value="RL-88240 (120 GSM)" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Middle Liner Reel No</label>
                      <input type="text" value="RL-88190 (100 GSM)" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Bottom Liner Reel No</label>
                      <input type="text" value="RL-88205 (150 GSM)" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Opening Weight (Kg)</label>
                      <input type="text" value="4200" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Closing Weight (Kg)</label>
                      <input type="text" value="612" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>

                  <div className="bg-[#f8f9fa] rounded-xl p-5 border border-gray-100">
                    <h3 className="text-[14px] font-bold text-[#1a233a] mb-4">Overview</h3>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="text-[12px] text-gray-500 mb-1 font-medium">Paper Consumed</p>
                        <p className="text-[20px] font-bold text-[#1a233a]">3,588 Kg</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="text-[12px] text-gray-500 mb-1 font-medium">Good Board Produced</p>
                        <p className="text-[20px] font-bold text-[#16a34a]">3,427 Kg</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="text-[12px] text-gray-500 mb-1 font-medium">Wastage %</p>
                        <p className="text-[20px] font-bold text-[#ef4444]">4.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Production Parameters 1 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Production Parameters</h2>
                  
                  <div className="grid grid-cols-3 gap-x-6 gap-y-6 mb-8">
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Flute Type</label>
                      <input type="text" value="B" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Deckle Set (MM)</label>
                      <input type="text" value="1120" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Cut Length (MM)</label>
                      <input type="text" value="1480" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Target Speed</label>
                      <input type="text" value="180" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Actual Avg Speed</label>
                      <input type="text" value="164" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Starch Used (KG)</label>
                      <input type="text" value="86" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4 bg-white relative">
                      <span className="absolute -top-2.5 left-4 bg-white px-2 text-[11px] text-gray-500 font-medium">Slitter Blade Configuration</span>
                      <p className="text-[13px] text-gray-700 mt-2">400 - 400 - 400 - 280 (Trim)</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 bg-white relative">
                      <span className="absolute -top-2.5 left-4 bg-white px-2 text-[11px] text-gray-500 font-medium">Scorer Crease Settings</span>
                      <p className="text-[13px] text-gray-700 mt-2">RSC Standard Score</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Production Parameters 2 (Metrics) */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Production Parameters</h2>
                  
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#e0f2fe] p-4 rounded-lg border border-[#bae6fd]">
                      <p className="text-[12px] font-medium text-[#0284c7] mb-1">Good Board (SQ.MTR)</p>
                      <p className="text-[22px] font-bold text-[#0369a1]">39720</p>
                    </div>
                    <div className="bg-[#fef9c3] p-4 rounded-lg border border-[#fef08a]">
                      <p className="text-[12px] font-medium text-[#ca8a04] mb-1">Trim Wastage (KG)</p>
                      <p className="text-[22px] font-bold text-[#a16207]">98</p>
                    </div>
                    <div className="bg-[#fef9c3] p-4 rounded-lg border border-[#fef08a]">
                      <p className="text-[12px] font-medium text-[#ca8a04] mb-1">Reel-End / Splice (KG)</p>
                      <p className="text-[22px] font-bold text-[#a16207]">41</p>
                    </div>
                    <div className="bg-[#fee2e2] p-4 rounded-lg border border-[#fecaca]">
                      <p className="text-[12px] font-medium text-[#b91c1c] mb-1">Break / Rejected (SQ.MTR)</p>
                      <p className="text-[22px] font-bold text-[#991b1b]">22</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <h3 className="text-[14px] font-bold text-[#1a233a]">Corrugator Paper Yield Efficiency</h3>
                        <p className="text-[11px] text-gray-500">Good Board Output Vs Material Wastage</p>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-[11px] font-bold text-[#16a34a]">95.5% Good Yield</span>
                        <span className="text-[11px] font-bold text-[#ef4444]">4.5% Wastage</span>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#16a34a]" style={{ width: '95.5%' }}></div>
                      <div className="h-full bg-orange-400" style={{ width: '2.5%' }}></div>
                      <div className="h-full bg-[#ef4444]" style={{ width: '2%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Downtime Log */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-[#1a233a] mb-6">Downtime Log</h2>
                  
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-[13px]">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 font-semibold text-gray-600">Reason</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Start</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">End</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Duration</th>
                          <th className="px-4 py-3 font-semibold text-gray-600">Remarks / Root Cause</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-4"><span className="px-2 py-0.5 rounded-md text-[12px] font-medium bg-[#fee2e2] text-[#ef4444]">Paper Break</span></td>
                          <td className="px-4 py-4 text-gray-700">18:00</td>
                          <td className="px-4 py-4 text-gray-700">18:15</td>
                          <td className="px-4 py-4 text-gray-700">15 Min</td>
                          <td className="px-4 py-4 text-gray-700 font-medium">Logged During Active Shift</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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

export default CorrugatorJobDetailsPage;
