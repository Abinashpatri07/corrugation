import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreHorizontal, Mail, ExternalLink, ChevronUp, ChevronDown, Edit, X, Calendar, Download } from 'lucide-react';

const CustomerDetailsPage = () => {
  const navigate = useNavigate();
  const [addressExpanded, setAddressExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedBox, setSelectedBox] = useState(null);

  return (
    <div className="flex h-full bg-[#f4f7f9] p-1.5 gap-1.5 overflow-hidden">

      {/* ── Left Sidebar (List) ── */}
      <div className="w-full lg:w-[260px] shrink-0 flex flex-col bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1 cursor-pointer">
              <h2 className="text-xl tracking-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]">All Customer</h2>
              <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/customers/new')}
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
              placeholder="Search customer, product or item..."
              className="w-full pl-8 pr-3 py-2 text-[12px] bg-gray-100 border border-transparent rounded-md focus:bg-white focus:border-blue-500 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3 hide-scrollbar">
          {/* Customer List Item (Active) */}
          <div className="bg-gradient-to-br from-[#ffede1] via-[#fae8f8] to-[#efdfff] rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md transition-all shadow-sm border border-transparent mb-2.5">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[12px] font-medium text-[#374151]">CLIC-01142</span>
              <span className="text-[9px] text-gray-400 font-medium tracking-wide">25/06/2026</span>
            </div>
            <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
              CLIMAMAX CONTROLS PRIVATE LIMITED
            </h3>
            <div className="text-right">
              <span className="text-[14px] font-bold text-[#111827]">₹45,000.00</span>
            </div>
          </div>

          {/* Customer List Item 2 (Inactive) */}
          <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[12px] font-medium text-[#374151]">NEX-02193</span>
              <span className="text-[9px] text-gray-400 font-medium tracking-wide">20/06/2026</span>
            </div>
            <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
              NEXUS TECHNOLOGIES
            </h3>
            <div className="text-right">
              <span className="text-[14px] font-bold text-[#111827]">₹12,500.00</span>
            </div>
          </div>

          {/* Customer List Item 3 (Inactive) */}
          <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[12px] font-medium text-[#374151]">APX-03421</span>
              <span className="text-[9px] text-gray-400 font-medium tracking-wide">15/06/2026</span>
            </div>
            <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
              APEX INDUSTRIES
            </h3>
            <div className="text-right">
              <span className="text-[14px] font-bold text-[#111827]">₹0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Area (Details) ── */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-transparent">

        {/* Top Header Card */}
        <div className="bg-white shrink-0 border border-gray-100 rounded-[20px] shadow-sm mb-1">
          <div className="px-3 lg:px-4 p-3">

            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center text-white text-[18px] font-bold shadow-sm shrink-0">
                  CC
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-[18px] font-bold text-[#1a233a] uppercase">CLIMAMAX CONTROLS PRIVATE LIMITED</h1>
                    <span className="text-[12px] text-gray-400 font-medium">CLIC-01142</span>
                  </div>
                  <div className="text-[11.5px] text-gray-500 mt-1 font-medium">
                    FMCG • Export & Domestic • Onboarded 14-Mar-2022 • Owner: R. Sharma (KAM)
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-bold rounded-full">In Good Standing</span>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gray-100 my-5"></div>

            {/* Stat Cards */}
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">

              {/* Card 1: Lifetime Orders */}
              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[140px] flex-1">
                <div className="text-[11px] text-gray-500 font-medium mb-0.5 truncate">Lifetime Orders</div>
                <div className="text-[24px] font-bold text-[#111827] leading-none">128</div>
                <div className="text-[9px] text-gray-400 mt-1 font-medium truncate">Total Customer Value</div>
              </div>

              {/* Card 2: Lifetime Value */}
              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[140px] flex-1">
                <div className="text-[11px] text-gray-500 font-medium mb-0.5 truncate">Lifetime Value</div>
                <div className="text-[24px] font-bold text-[#111827] leading-none">₹4.8 <span className="text-[14px] font-medium text-gray-400">Cr</span></div>
                <div className="text-[9px] text-gray-400 mt-1 font-medium truncate">Orders Placed</div>
              </div>

              {/* Card 3: Out-Standing Balance */}
              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[140px] flex-1">
                <div className="text-[11px] text-gray-500 font-medium mb-0.5 truncate">Out-Standing Balance</div>
                <div className="text-[24px] font-bold text-[#111827] leading-none">₹2.45 <span className="text-[14px] font-medium text-gray-400">L</span></div>
                <div className="text-[9px] text-gray-400 mt-1 font-medium truncate">Amount Due</div>
              </div>

              {/* Card 4: Active Order */}
              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[140px] flex-1">
                <div className="text-[11px] text-gray-500 font-medium mb-0.5 truncate">Active Order</div>
                <div className="text-[24px] font-bold text-[#16a34a] leading-none">9</div>
                <div className="text-[9px] text-gray-400 mt-1 font-medium truncate">Orders In Progress</div>
              </div>

              {/* Card 5: Ontime Delivery */}
              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[140px] flex-1">
                <div className="text-[11px] text-gray-500 font-medium mb-0.5 truncate">Ontime Delivery</div>
                <div className="text-[24px] font-bold text-[#111827] leading-none">96.2%</div>
                <div className="text-[9px] text-gray-400 mt-1 font-medium truncate">Last 12 Months</div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Content Card */}
        <div className="bg-white flex-1 flex flex-col overflow-hidden border border-gray-100 rounded-[20px] shadow-sm">
          {/* Tabs */}
          <div className="flex gap-6 px-3 lg:px-4 pt-3 shrink-0 border-b border-gray-100">
            {['Overview', 'Commercial Terms', 'Box Specifications', 'Order History'].map((tab) => (
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
            {/* Tab Content - Overview */}
            {activeTab === 'Overview' && (
              <div className="bg-white rounded-[12px] p-2.5 shadow-sm border border-gray-100">
                <div className="space-y-4">

                <div className="flex justify-end">
                  <button className="p-1.5 border border-gray-100 rounded-md bg-white hover:bg-gray-50 text-gray-400 transition-colors shadow-sm">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                {/* ── Top Row: Profile & Payment ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  {/* Customer Profile Card */}
                  <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5 relative">
                    <div className="border-b border-gray-100 pb-3 mb-4">
                      <h3 className="text-[16px] font-medium text-[#1a233a]">Customer Profile</h3>
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f43f5e] to-[#9333ea] flex items-center justify-center text-white text-[15px] font-bold shadow-sm shrink-0">
                        CC
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#1a233a] leading-tight">Climamax Controls Pvt Ltd</h4>
                        <span className="text-[11px] text-gray-400 font-medium">CLIC- 00001</span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="grid grid-cols-[120px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">Customer Type</span>
                        <span className="font-bold text-[#1a233a]">Key Account</span>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">PAN</span>
                        <span className="font-bold text-[#1a233a]">AABCC1235H</span>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">GSTIN</span>
                        <span className="font-bold text-[#1a233a]">29BGBBB2222B2Z2</span>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">MSME</span>
                        <span className="font-bold text-[#1a233a]">No</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details Card */}
                  <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5 relative">
                    <div className="border-b border-gray-100 pb-3 mb-4">
                      <h3 className="text-[16px] font-medium text-[#1a233a]">Payment Details</h3>
                    </div>

                    <div className="space-y-3 mt-[44px]">
                      <div className="grid grid-cols-[140px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">Sale Region</span>
                        <span className="font-bold text-[#1a233a]">South India</span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">Currency</span>
                        <span className="font-bold text-[#1a233a]">INR (₹)</span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">Opening Balance</span>
                        <span className="font-bold text-[#1a233a]">₹2,48,500</span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">Payment Terms</span>
                        <span className="font-bold text-[#1a233a]">Net 30 Days</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* ── Addresses Card ── */}
                <div className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 relative gap-0">
                    {/* Left: Billing Address */}
                    <div className="pr-6 border-r-2 border-pink-300">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[14px] font-bold text-gray-500">Billing Address</h3>
                      </div>
                      <div className="text-[12px] font-bold text-[#4b5563] leading-snug">
                        Century Pulp & Paper Mill<br />
                        Gate No. 2, Administrative Office Lalkuan<br />
                        Industrial Area<br />
                        Lalkuan Nainital District Uttarakhand 43552
                      </div>
                    </div>

                    {/* Right: Shipping Address */}
                    <div className="pl-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[14px] font-bold text-gray-500">Shipping Address</h3>
                      </div>
                      <div className="text-[12px] font-bold text-[#4b5563] leading-snug">
                        Century Pulp & Paper Mill<br />
                        Century House, Lalkuan Industrial Complex<br />
                        NH-109, Lalkuan Nainital District<br />
                        Uttarakhand 262402
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contacts Directory */}
                <div className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[16px] font-bold text-[#1a233a]">Contacts Directory</h3>
                  </div>
                  <div className="flex flex-col divide-y divide-gray-100">
                    {[1, 2, 3].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2.5 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[12px] font-bold text-gray-600">
                            SK
                          </div>
                          <div>
                            <div className="text-[13px] font-bold text-[#1a233a]">Suresh Kulkarni</div>
                            <div className="text-[11px] text-gray-400 mt-0.5">Purchase Manager • Purchase</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-medium bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 shadow-sm">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +91 98220 44102
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-medium bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 shadow-sm">
                            <Mail className="w-3 h-3" />
                            s.kulkarni@veenafoods.in
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bank Details */}
                <div className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[16px] font-bold text-[#1a233a]">Bank Details</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px] text-left">
                      <thead>
                        <tr className="text-gray-500 font-medium border-b border-gray-100">
                          <th className="pb-2 px-2">Bank Name</th>
                          <th className="pb-2 px-2">Account Holder Name</th>
                          <th className="pb-2 px-2">Account No</th>
                          <th className="pb-2 px-2">IFSC Code</th>
                          <th className="pb-2 px-2">Open Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#1a233a]">
                        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-2.5 px-2 font-medium">HDFC Bank</td>
                          <td className="py-2.5 px-2 text-gray-600">Climamex Private Limited</td>
                          <td className="py-2.5 px-2 font-medium">123456789012</td>
                          <td className="py-2.5 px-2 text-gray-600">HDFC0000123</td>
                          <td className="py-2.5 px-2 text-gray-600">01-Jul-2026</td>
                        </tr>
                        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-2.5 px-2 font-medium">IDFC Bank</td>
                          <td className="py-2.5 px-2 text-gray-600">Niman Private Limited</td>
                          <td className="py-2.5 px-2 font-medium">123456789012</td>
                          <td className="py-2.5 px-2 text-gray-600">IDFC0000223</td>
                          <td className="py-2.5 px-2 text-gray-600">07-Jul-2026</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-2.5 px-2 font-medium">ICICI Bank</td>
                          <td className="py-2.5 px-2 text-gray-600">Godrej Private Limited</td>
                          <td className="py-2.5 px-2 font-medium">123456789012</td>
                          <td className="py-2.5 px-2 text-gray-600">ICICI0000333</td>
                          <td className="py-2.5 px-2 text-gray-600">12-Jul-2026</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                </div>
              </div>
            )}

            {/* Tab Content - Commercial Terms */}
            {activeTab === 'Commercial Terms' && (
              <div className="bg-white rounded-[12px] p-2.5 shadow-sm border border-gray-100">
                <div className="space-y-4">

                {/* Credit & Payment */}
                <div className="bg-white border border-gray-100 rounded-[12px] p-5 shadow-sm">
                  <h3 className="text-[14px] font-semibold text-[#1a233a] mb-4">Credit & Payment</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3">
                      <div className="text-[10px] text-gray-500 font-medium mb-1">Credit Limit</div>
                      <div className="text-[14px] font-bold text-[#1a233a] mb-1">₹40,00,000</div>
                      <div className="text-[9px] text-gray-400 font-medium mb-1">Overdue Status</div>
                      <div className="inline-flex px-2 py-0.5 bg-[#e0f5e7] text-[#16a34a] text-[9px] font-bold rounded">
                        No overdue
                      </div>
                    </div>
                    <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3">
                      <div className="text-[10px] text-gray-500 font-medium mb-1">Credit Period</div>
                      <div className="text-[12px] font-medium text-[#1a233a] mb-2">45 Days</div>
                      <div className="text-[9px] text-gray-400 font-medium mb-1">Available Credit</div>
                      <div className="text-[13px] font-bold text-[#1a233a]">₹21,60,000</div>
                    </div>
                    <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Payment Terms</div>
                        <div className="text-[12px] font-medium text-[#1a233a]">Credit — Post Delivery</div>
                      </div>
                    </div>
                    <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Outstanding Balance</div>
                        <div className="text-[14px] font-bold text-[#1a233a]">₹18,40,000</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white border border-gray-100 rounded-[12px] p-5 shadow-sm">
                  <h3 className="text-[14px] font-semibold text-[#1a233a] mb-4">Pricing</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Rate Category</div>
                        <div className="text-[12px] font-medium text-[#1a233a]">Negotiated — Key Account</div>
                      </div>
                    </div>
                    <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Price List</div>
                        <div className="text-[12px] font-medium text-[#1a233a]">PL-KA-2026-Q3</div>
                      </div>
                    </div>
                    <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Standard Discount</div>
                        <div className="text-[12px] font-medium text-[#1a233a]">3.5% on invoice value</div>
                      </div>
                    </div>
                    <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Volume Slab Pricing</div>
                        <div className="text-[11px] font-medium text-gray-500 leading-snug">Applicable above 50,000<br />boxes/order</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Payment Activity */}
                <div className="bg-white border border-gray-100 rounded-[12px] p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-[16px] font-bold text-[#1a233a]">Recent Payment Activity</h3>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-100 rounded-md text-[12px] text-gray-500 font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        <Calendar className="w-3.5 h-3.5" />
                        Select Date Range
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-100 rounded-md text-[12px] text-gray-500 font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        <Download className="w-3.5 h-3.5" />
                        Export
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="grid grid-cols-4 px-4 py-2.5 border border-gray-200 rounded-[8px] text-[11px] text-gray-400 font-medium bg-white">
                      <div>Invoice No.</div>
                      <div>Amount</div>
                      <div>Due Date</div>
                      <div>Status</div>
                    </div>
                    
                    {/* Row 1 */}
                    <div className="grid grid-cols-4 px-4 py-3 border border-gray-100 rounded-[8px] text-[12px] items-center bg-white hover:border-gray-200 transition-colors">
                      <div className="font-medium text-[#1a233a]">INV-8821</div>
                      <div className="font-bold text-[#1a233a]">₹6,20,000</div>
                      <div className="text-[#1a233a] font-medium">05-Aug-2026</div>
                      <div>
                        <span className="inline-flex px-3 py-1 bg-[#fef3c7] text-[#d97706] text-[10px] font-bold rounded-full">Pending</span>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-4 px-4 py-3 border border-gray-100 rounded-[8px] text-[12px] items-center bg-white hover:border-gray-200 transition-colors">
                      <div className="font-medium text-[#1a233a]">INV-8790</div>
                      <div className="font-bold text-[#1a233a]">₹4,10,000</div>
                      <div className="text-[#1a233a] font-medium">18-Jul-2026</div>
                      <div>
                        <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Paid</span>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-4 px-4 py-3 border border-gray-100 rounded-[8px] text-[12px] items-center bg-white hover:border-gray-200 transition-colors">
                      <div className="font-medium text-[#1a233a]">INV-8754</div>
                      <div className="font-bold text-[#1a233a]">₹8,10,000</div>
                      <div className="text-[#1a233a] font-medium">02-Jul-2026</div>
                      <div>
                        <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Paid</span>
                      </div>
                    </div>
                  </div>
                </div>

                </div>
              </div>
            )}

            {/* Tab Content - Box Specifications */}
            {activeTab === 'Box Specifications' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1 */}
                  <div onClick={() => setSelectedBox({ name: 'RSC 5-Ply Export Box', code: 'SPEC-VF-0142', size: '40 × 30 × 25 cm', ply: '5-Ply', dieNumber: 'DIE - 0219', ect: 'Standard', flute: 'BC Flute (Dual)', gsm: '150/120/100/120/150', print: '2 Color Print', status: 'Approved', statusMessage: '' })} className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm flex flex-col cursor-pointer hover:border-[#ea580c] hover:shadow-md transition-all">
                    <div className="inline-flex px-2 py-0.5 border border-[#fed7aa] text-[#ea580c] text-[9px] font-medium rounded-full mb-3 self-start">
                      SPEC-VF-0142
                    </div>
                    <h4 className="text-[13px] font-medium text-[#1a233a] mb-0.5">RSC 5-Ply Export Box</h4>
                    <div className="text-[10px] text-gray-500 mb-3">40 × 30 × 25 cm</div>

                    <div className="bg-[#f8fafc] rounded-md p-2.5 mb-3 space-y-1.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">Board Spec:</span>
                        <span className="text-[#1a233a] font-medium">150/120/100/120/150</span>
                      </div>
                      <div className="border-t border-gray-100"></div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">Flute Type:</span>
                        <span className="text-[#1a233a] font-medium">BC Flute (Dual)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="inline-flex px-1.5 py-0.5 border border-blue-200 text-blue-600 text-[8.5px] font-medium rounded-full bg-white">Die-0219</span>
                      <span className="inline-flex px-1.5 py-0.5 border border-gray-200 text-gray-500 text-[8.5px] font-medium rounded-full bg-white">2 Color Print</span>
                    </div>

                    <div className="border-t border-gray-100 pt-3 mt-auto">
                      <div className="text-[13px] font-medium text-[#1a233a]">
                        ₹42.50 <span className="text-[9px] text-gray-400">/box</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div onClick={() => setSelectedBox({ name: 'HSC 3-Ply Retail Box', code: 'SPEC-VF-0142', size: '30 × 22 × 18 cm', ply: '3-Ply', dieNumber: 'DIE - 0219', ect: 'Standard', flute: 'Flute C', gsm: 'GSM 150/120/150', print: '2 Color Print', status: 'Approved', statusMessage: '' })} className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm flex flex-col cursor-pointer hover:border-[#ea580c] hover:shadow-md transition-all">
                    <div className="inline-flex px-2 py-0.5 border border-[#fed7aa] text-[#ea580c] text-[9px] font-medium rounded-full mb-3 self-start">
                      SPEC-VF-0142
                    </div>
                    <h4 className="text-[13px] font-medium text-[#1a233a] mb-0.5">HSC 3-Ply Retail Box</h4>
                    <div className="text-[10px] text-gray-500 mb-3">30 × 22 × 18 cm</div>

                    <div className="bg-[#f8fafc] rounded-md p-2.5 mb-3 space-y-1.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">Board Spec:</span>
                        <span className="text-[#1a233a] font-medium">GSM 150/120/150</span>
                      </div>
                      <div className="border-t border-gray-100"></div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">Flute Type:</span>
                        <span className="text-[#1a233a] font-medium">Flute C</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="inline-flex px-1.5 py-0.5 border border-blue-200 text-blue-600 text-[8.5px] font-medium rounded-full bg-white">Die-0219</span>
                      <span className="inline-flex px-1.5 py-0.5 border border-gray-200 text-gray-500 text-[8.5px] font-medium rounded-full bg-white">2 Color Print</span>
                    </div>

                    <div className="border-t border-gray-100 pt-3 mt-auto">
                      <div className="text-[13px] font-medium text-[#1a233a]">
                        ₹28.50 <span className="text-[9px] text-gray-400">/box</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div onClick={() => setSelectedBox({ name: 'Die-Cut Mailer Box', code: 'SPEC-VF-0077', size: '25 × 18 × 9 cm', ply: '3-Ply', dieNumber: 'DIE - 0201', ect: 'Standard', flute: 'E', gsm: '150/100/150', print: '4 (Full color process)', status: 'Under Review', statusMessage: '- new artwork pending approval' })} className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm flex flex-col cursor-pointer hover:border-[#ea580c] hover:shadow-md transition-all">
                    <div className="inline-flex px-2 py-0.5 border border-[#fed7aa] text-[#ea580c] text-[9px] font-medium rounded-full mb-3 self-start">
                      SPEC-VF-0142
                    </div>
                    <h4 className="text-[13px] font-medium text-[#1a233a] mb-0.5">Die-Cut Mailer Box</h4>
                    <div className="text-[10px] text-gray-500 mb-3">40 × 30 × 25 cm</div>

                    <div className="bg-[#f8fafc] rounded-md p-2.5 mb-3 space-y-1.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">Board Spec:</span>
                        <span className="text-[#1a233a] font-medium">GSM 110/100/150</span>
                      </div>
                      <div className="border-t border-gray-100"></div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">Flute Type:</span>
                        <span className="text-[#1a233a] font-medium">Flute E</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="inline-flex px-1.5 py-0.5 border border-blue-200 text-blue-600 text-[8.5px] font-medium rounded-full bg-white">Die-0219</span>
                      <span className="inline-flex px-1.5 py-0.5 border border-gray-200 text-gray-500 text-[8.5px] font-medium rounded-full bg-white">2 Color Print</span>
                    </div>

                    <div className="border-t border-gray-100 pt-3 mt-auto">
                      <div className="text-[13px] font-medium text-[#1a233a]">
                        ₹19.50 <span className="text-[9px] text-gray-400">/box</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div onClick={() => setSelectedBox({ name: 'Heavy Duty 7-Ply Bulk Shippers', code: 'SPEC-VF-0142', size: '60 × 45 × 40 cm', ply: '7-Ply', dieNumber: 'DIE - 0219', ect: 'Standard', flute: 'BC Flute (Dual)', gsm: '150/120/100/120/150', print: '2 Color Print', status: 'Approved', statusMessage: '' })} className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm flex flex-col cursor-pointer hover:border-[#ea580c] hover:shadow-md transition-all">
                    <div className="inline-flex px-2 py-0.5 border border-[#fed7aa] text-[#ea580c] text-[9px] font-medium rounded-full mb-3 self-start">
                      SPEC-VF-0142
                    </div>
                    <h4 className="text-[13px] font-medium text-[#1a233a] mb-0.5">Heavy Duty 7-Ply Bulk Shippers</h4>
                    <div className="text-[10px] text-gray-500 mb-3">60 × 45 × 40 cm</div>

                    <div className="bg-[#f8fafc] rounded-md p-2.5 mb-3 space-y-1.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">Board Spec:</span>
                        <span className="text-[#1a233a] font-medium">150/120/100/120/150</span>
                      </div>
                      <div className="border-t border-gray-100"></div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">Flute Type:</span>
                        <span className="text-[#1a233a] font-medium">BC Flute (Dual)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="inline-flex px-1.5 py-0.5 border border-blue-200 text-blue-600 text-[8.5px] font-medium rounded-full bg-white">Die-0219</span>
                      <span className="inline-flex px-1.5 py-0.5 border border-gray-200 text-gray-500 text-[8.5px] font-medium rounded-full bg-white">2 Color Print</span>
                    </div>

                    <div className="border-t border-gray-100 pt-3 mt-auto">
                      <div className="text-[13px] font-medium text-[#1a233a]">
                        ₹42.50 <span className="text-[9px] text-gray-400">/box</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content - Order History */}
            {activeTab === 'Order History' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between p-4 lg:p-5 border-b border-gray-100">
                    <h3 className="text-[16px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] to-[#5a67d8]">Order History</h3>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        Select Date Range
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        <Download className="w-3.5 h-3.5 text-gray-400" />
                        Export
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[12px] whitespace-nowrap">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                          <th className="py-3 pl-4 lg:pl-5 pr-3">Order No.</th>
                          <th className="py-3 px-3">Date</th>
                          <th className="py-3 px-3">Box Spec</th>
                          <th className="py-3 px-3">Quantity</th>
                          <th className="py-3 px-3">Value</th>
                          <th className="py-3 px-3">Delivery Status</th>
                          <th className="py-3 pr-4 lg:pr-5 pl-3">Payment Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#1a233a]">
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">SO-11294</td>
                          <td className="py-3 px-3 font-medium text-gray-600">27-Jul-2026</td>
                          <td className="py-3 px-3 font-medium text-gray-700">RSC 5-Ply Export Box</td>
                          <td className="py-3 px-3 font-bold">25,000</td>
                          <td className="py-3 px-3 font-medium">₹6,20,000</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex px-3 py-1 bg-[#e0f5e7] text-[#16a34a] text-[10px] font-bold rounded-full">Delivered</span>
                          </td>
                          <td className="py-3 pr-4 lg:pr-5 pl-3">
                            <span className="inline-flex px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full">Pending</span>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">SO-11268</td>
                          <td className="py-3 px-3 font-medium text-gray-600">19-Jul-2026</td>
                          <td className="py-3 px-3 font-medium text-gray-700">HSC 3-Ply Retail Box</td>
                          <td className="py-3 px-3 font-bold">62,000</td>
                          <td className="py-3 px-3 font-medium">₹9,90,000</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex px-3 py-1 bg-[#ffedd5] text-[#c2410c] text-[10px] font-bold rounded-full">Partially Dispatched</span>
                          </td>
                          <td className="py-3 pr-4 lg:pr-5 pl-3">
                            <span className="inline-flex px-3 py-1 bg-[#e0f5e7] text-[#16a34a] text-[10px] font-bold rounded-full">Paid</span>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">SO-11201</td>
                          <td className="py-3 px-3 font-medium text-gray-600">02-Jul-2026</td>
                          <td className="py-3 px-3 font-medium text-gray-700">Die-Cut Mailer Box</td>
                          <td className="py-3 px-3 font-bold">18,600</td>
                          <td className="py-3 px-3 font-medium">₹4,10,000</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex px-3 py-1 bg-[#e0f5e7] text-[#16a34a] text-[10px] font-bold rounded-full">Delivered</span>
                          </td>
                          <td className="py-3 pr-4 lg:pr-5 pl-3">
                            <span className="inline-flex px-3 py-1 bg-[#e0f5e7] text-[#16a34a] text-[10px] font-bold rounded-full">Paid</span>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">SO-11150</td>
                          <td className="py-3 px-3 font-medium text-gray-600">14-Jun-2026</td>
                          <td className="py-3 px-3 font-medium text-gray-700">RSC 5-Ply Export Box</td>
                          <td className="py-3 px-3 font-bold">30,000</td>
                          <td className="py-3 px-3 font-medium">₹7,45,000</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex px-3 py-1 bg-[#e0f5e7] text-[#16a34a] text-[10px] font-bold rounded-full">Delivered</span>
                          </td>
                          <td className="py-3 pr-4 lg:pr-5 pl-3">
                            <span className="inline-flex px-3 py-1 bg-[#e0f5e7] text-[#16a34a] text-[10px] font-bold rounded-full">Paid</span>
                          </td>
                        </tr>

                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">SO-11042</td>
                          <td className="py-3 px-3 font-medium text-gray-600">28-May-2026</td>
                          <td className="py-3 px-3 font-medium text-gray-700">RSC 3-Ply Bulk Pack</td>
                          <td className="py-3 px-3 font-bold">12,000</td>
                          <td className="py-3 px-3 font-medium">₹2,18,000</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full">Cancelled</span>
                          </td>
                          <td className="py-3 pr-4 lg:pr-5 pl-3">
                            <span className="inline-flex px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full">N/A</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Box Specification Modal */}
      {selectedBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
          <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-[550px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 pb-4">
              <div>
                <h2 className="text-[18px] font-bold text-[#1a233a] mb-1">{selectedBox.name}</h2>
                <div className="text-[11px] text-gray-400">{selectedBox.code}</div>
              </div>
              <button onClick={() => setSelectedBox(null)} className="text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 pt-5 flex gap-8">
              {/* Left Column */}
              <div className="flex-1 space-y-6 border-r border-gray-100 pr-8">
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Box Size (L×W×H)</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.size}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Ply</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.ply}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Die Number</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.dieNumber}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">ECT Requirement</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.ect}</div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-6 pl-2">
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Flute Type</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.flute}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">GSM Combo</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.gsm}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Print Colors</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.print}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Status</div>
                  <div className="text-[12.5px] leading-snug">
                    <span className={selectedBox.status === 'Under Review' ? "text-[#ea580c] font-medium" : "text-[#16a34a] font-medium"}>{selectedBox.status}</span> <span className="text-gray-500">{selectedBox.statusMessage}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetailsPage;
