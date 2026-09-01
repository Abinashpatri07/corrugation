import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  ChevronDown
} from 'lucide-react';

const ProcurementDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const tabs = ['Expenses', 'Procurement', 'Purchase Order', 'Bills', 'Payment'];

  return (
    <main className="flex-1 overflow-hidden bg-[#f4f7fb] flex flex-col relative p-1.5 gap-1.5">
      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => navigate('/purchase', { state: { activeTab: tab } })}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap
                ${tab === 'Procurement'
                  ? 'text-[#1a233a] font-bold border-[#1a233a]'
                  : 'text-gray-500 font-medium border-transparent hover:text-gray-700 hover:border-gray-300'
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
        <div className="bg-white px-6 py-2 md:px-8 md:py-3 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
          <h2 className="text-[17px] md:text-[18px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            PO View
          </h2>

          <div className="flex items-center gap-0">
            {/* Step 1: Procurement */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] ring-2 ring-pink-50 text-white flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-[10px] md:text-[11px] font-semibold text-[#1a233a] text-center leading-tight">Procurement</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-gray-200 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 2: Purchase order */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <span className="text-[10px] md:text-[11px] font-medium text-gray-500">Purchase order</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-gray-200 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 3: Bill */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-[10px] md:text-[11px] font-medium text-gray-500">Bill</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-gray-200 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 4: Payment */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <HandCoins className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="text-[10px] md:text-[11px] font-medium text-gray-500">Payment</span>
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
                  <h3 className="text-[15px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">All PO</h3>
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
              {/* Active PO Card */}
              <div className="bg-gradient-to-br from-[#ffede1] via-[#fae8f8] to-[#efdfff] rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md transition-all shadow-sm border border-transparent mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">PR-00001</span>
                  <span className="text-[9px] text-gray-400 font-medium tracking-wide">25/06/2026</span>
                </div>
                <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                  CENTURY PULP & PAPER
                </h3>
                <div className="flex justify-between items-end mt-1">
                  <span className="bg-[#dcfce7] text-[#16a34a] text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider leading-none">
                    OPEN
                  </span>
                  <span className="text-[14px] font-bold text-[#111827]">₹53,900.00</span>
                </div>
              </div>

              {/* Inactive Card 1 */}
              <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">PR-00002</span>
                  <span className="text-[9px] text-gray-400 font-medium tracking-wide">20/06/2026</span>
                </div>
                <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                  GLOBAL SUPPLIES INC
                </h3>
                <div className="flex justify-between items-end mt-1">
                  <span className="bg-[#dcfce7] text-[#16a34a] text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider leading-none">
                    OPEN
                  </span>
                  <span className="text-[14px] font-bold text-[#111827]">₹12,500.00</span>
                </div>
              </div>

              {/* Inactive Card 2 */}
              <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">PR-00003</span>
                  <span className="text-[9px] text-gray-400 font-medium tracking-wide">15/06/2026</span>
                </div>
                <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                  TECHHARDWARE LTD
                </h3>
                <div className="flex justify-between items-end mt-1">
                  <span className="bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider leading-none">
                    CLOSED
                  </span>
                  <span className="text-[14px] font-bold text-[#111827]">₹0.00</span>
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
                  {id && id !== 'new' ? (isNaN(id) ? id : `PR-${id.toString().padStart(5, '0')}`) : 'PR-00001'}
                </h2>
                <span className="bg-[#ffedd5] text-[#9a3412] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Unpaid
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Printer className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => navigate('/purchase/payments')} className="flex items-center px-4 py-1.5 bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white rounded-full text-xs font-bold transition-opacity shadow-sm">
                  <Download className="w-3 h-3 mr-1.5" />
                  Record Payment
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Details Containers */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-2 pr-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-4 min-h-full">

                {/* Top Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Customer Profile Box */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-4 pt-4 pb-2 mx-1 border-b border-gray-200">
                      <h3 className="text-[15px] font-bold text-gray-900 px-1">Vendor Profile</h3>
                    </div>
                    <div className="px-5 pt-4 pb-5 flex-1">
                      <div className="flex items-center mb-6">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff4d4d] to-[#9333ea] text-white flex items-center justify-center text-xs font-bold shadow-sm mr-3 flex-shrink-0">
                          CC
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-gray-900">CENTURY PULP & PAPER</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide">PR-00001</p>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <div className="grid grid-cols-2">
                          <span className="text-[12px] font-medium text-gray-400">GSTIN</span>
                          <span className="text-[12px] font-bold text-gray-900">29BGBBB2222B2Z2</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-[12px] font-medium text-gray-400">Point Of Contact</span>
                          <span className="text-[12px] font-bold text-gray-900">P. Verma</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Box */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-4 pt-4 pb-2 mx-1 border-b border-gray-200">
                      <h3 className="text-[15px] font-bold text-gray-900 px-1">Details</h3>
                    </div>
                    <div className="px-5 pt-4 pb-5 flex-1">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2">
                          <span className="text-[12px] font-medium text-gray-400">Order Date</span>
                          <span className="text-[12px] font-bold text-gray-900">30/06/2026</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-[12px] font-medium text-gray-400">Delivery Date</span>
                          <span className="text-[12px] font-bold text-gray-900">26/06/2026</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-[12px] font-medium text-gray-400">Reference No</span>
                          <span className="text-[12px] font-bold text-gray-900">REF-2026-00847</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-[12px] font-medium text-gray-400">Payment Terms</span>
                          <span className="text-[12px] font-bold text-gray-900">Due On Receipt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Addresses Box */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row mt-2">
                  <div className="flex-1 px-5 py-4">
                    <h5 className="text-[14px] font-medium text-gray-500 mb-2">Billing Address</h5>
                    <p className="text-[13px] text-[#1a233a] font-medium leading-relaxed">
                      648/A, OM Chambers, Binnamangala 1st<br />
                      Stage, Bengaluru, Karnataka 560038
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-auto mx-5 lg:mx-0 lg:w-[2px] h-[1px] lg:h-auto bg-pink-200/60 lg:my-4 rounded-full"></div>

                  <div className="flex-1 px-5 py-4">
                    <h5 className="text-[14px] font-medium text-gray-500 mb-2">Shipping Address</h5>
                    <p className="text-[13px] text-[#1a233a] font-medium leading-relaxed">
                      Warehouse No. 12,<br />
                      KIADB Industrial Area, Whitefield, Bengaluru,<br />
                      Karnataka 560066
                    </p>
                  </div>
                </div>

                {/* Calculation Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-2 flex flex-col">
                  <div className="px-4 pt-4 pb-2 mx-1 border-b border-gray-200">
                    <h3 className="text-[15px] font-bold text-gray-900 px-1">Calculation</h3>
                  </div>
                  
                  <div className="p-5 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="py-2.5 px-4 text-[11px] font-medium text-gray-500 whitespace-nowrap">Items & Description</th>
                          <th className="py-2.5 px-4 text-[11px] font-medium text-gray-500 whitespace-nowrap text-left">Ordered</th>
                          <th className="py-2.5 px-4 text-[11px] font-medium text-gray-500 whitespace-nowrap text-left">Status</th>
                          <th className="py-2.5 px-4 text-[11px] font-medium text-gray-500 whitespace-nowrap text-left">Rate</th>
                          <th className="py-2.5 px-4 text-[11px] font-medium text-gray-500 whitespace-nowrap text-left">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-50">
                          <td className="py-4 px-4 align-top">
                            <p className="text-[12px] font-bold text-gray-900">Calibrated Glass Pipette</p>
                            <p className="text-[10px] text-gray-500 mt-1">Standard High Resolution Glass Testing Pipettes</p>
                          </td>
                          <td className="py-4 px-4 align-top">
                            <p className="text-[12px] font-bold text-gray-900">566 <span className="text-[10px] font-normal text-gray-500">Box</span></p>
                          </td>
                          <td className="py-4 px-4 align-top space-y-1">
                            <p className="text-[11px] text-gray-900"><span className="font-bold">0</span> Received</p>
                            <p className="text-[11px] text-gray-900"><span className="font-bold">0</span> Billed</p>
                          </td>
                          <td className="py-4 px-4 align-top text-[12px] text-gray-900">30.00</td>
                          <td className="py-4 px-4 align-top text-[12px] text-gray-900">50,645</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="flex justify-end mt-6 pr-4">
                      <div className="w-64 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] font-bold text-gray-900">Sub Total</span>
                          <span className="text-[14px] font-bold text-gray-900">50,645</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[12px] text-gray-500">Total Quantity :</span>
                          <span className="text-[12px] text-gray-600">04 PCS</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[12px] text-gray-500">GST :</span>
                          <span className="text-[12px] text-gray-600">600.96</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-[12px] text-gray-500">Discount Rate</span>
                          <span className="text-[12px] text-gray-600">400.97</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-[13px] font-semibold text-[#ff6b6b]">Total Payable</span>
                          <span className="text-[16px] font-bold bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent">₹53,900.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes and Terms Box */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row mt-2 p-5 mb-2">
                  <div className="flex-1 pr-5">
                    <h5 className="text-[14px] font-bold text-gray-900 mb-3">Customer Note</h5>
                    <p className="text-[12px] text-gray-600 leading-relaxed max-w-sm">
                      Customer Requested Timely Delivery With Secure Packaging And Prior Dispatch Confirmation.
                    </p>
                  </div>
                  
                  {/* Divider */}
                  <div className="w-auto mx-5 lg:mx-0 lg:w-[2px] h-[1px] lg:h-auto bg-pink-200/60 lg:my-0 rounded-full"></div>

                  <div className="flex-1 pl-5">
                    <h5 className="text-[14px] font-bold text-gray-900 mb-3">Term & Condition</h5>
                    <p className="text-[12px] text-gray-600 leading-relaxed">
                      Prices Are Exclusive Of Taxes. Payment Is Due Within 30 Days. Delivery Dates Are Estimated And Subject To Availability. Orders Cannot Be Cancelled After Production Begins. Goods Remain The Seller's Property Until Full Payment Is Received. All Disputes Are Subject To Local Jurisdiction.
                    </p>
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

export default ProcurementDetailPage;
