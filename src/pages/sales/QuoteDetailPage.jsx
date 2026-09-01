import React from 'react';
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
  CheckCircle,
  CreditCard,
  PackageCheck,
  HandCoins,
  ArrowRightLeft
} from 'lucide-react';

const mockQuotes = [
  {
    id: 1,
    date: '25/06/2026',
    quoteNo: 'QT-00001',
    customerName: 'CLIMAMAX PVT LTD',
    boxSpec: '5-Ply',
    quantity: '2,500',
    amount: '53,900.00',
  },
  {
    id: 2,
    date: '20/06/2026',
    quoteNo: 'QT-00002',
    customerName: 'NEXUS TECHNOLOGIES',
    boxSpec: '3-Ply',
    quantity: '1,000',
    amount: '12,500.00',
  },
  {
    id: 3,
    date: '15/06/2026',
    quoteNo: 'QT-00003',
    customerName: 'APEX INDUSTRIES',
    boxSpec: '5-Ply',
    quantity: '3,200',
    amount: '68,400.00',
  }
];

const QuoteDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const activeQuote = mockQuotes.find(q => q.id.toString() === id) || mockQuotes[0];

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

  return (
    <main className="flex-1 overflow-hidden bg-[#f4f7fb] flex flex-col relative p-1.5 gap-1.5">
      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap ${tab.name === 'Quotes'
                ? 'text-black font-bold border-black'
                : 'text-gray-500 font-medium border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col gap-1.5 min-h-0">

        {/* Top Banner with Stepper */}
        <div className="bg-white px-6 py-2 rounded-xl shadow-sm flex-shrink-0">
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit mb-1">
            Quote View
          </h2>

          <div className="flex items-center w-full relative px-6 z-0">
            {/* Connecting Line */}
            <div className="absolute top-4 left-10 right-10 h-[2px] bg-gray-200 z-[-1]"></div>
            <div className="absolute top-4 left-10 w-[calc(100%-5rem)] max-w-[calc(100%/7)] h-[2px] bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] z-[-1]"></div>

            <div className="flex items-center justify-between w-full">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = step.active;
                return (
                  <div key={step.name} className="flex flex-col items-center px-2 relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 relative z-10 ${isActive
                      ? 'bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white shadow-md'
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                      }`}>
                      <Icon className="w-3.5 h-3.5" strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <span className={`text-[10px] font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Split View Content */}
        <div className="flex-1 flex overflow-hidden gap-1.5">

          {/* Left Sidebar (Quotes List) */}
          <div className="w-[270px] bg-white rounded-2xl border border-gray-200 flex flex-col flex-shrink-0 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 cursor-pointer">
                <h3 className="text-[15px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">All Quotes</h3>
                <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
              </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/sales/quotes/new')}
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
                    placeholder="Search quotes..."
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg pl-8 pr-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/30 text-[#1a2337] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
              {mockQuotes.map((quote) => {
                const isActive = id === quote.id.toString() || (!id && quote.id === 1);
                return (
                  <div 
                    key={quote.id}
                    onClick={() => navigate(`/sales/quotes/${quote.id}`)}
                    className={`rounded-2xl px-3 py-2 cursor-pointer transition-all shadow-sm mb-2.5 ${
                      isActive 
                        ? 'bg-gradient-to-br from-[#ffede1] via-[#fae8f8] to-[#efdfff] border border-transparent hover:shadow-md' 
                        : 'bg-white hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent border border-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[12px] font-medium text-[#374151]">{quote.quoteNo}</span>
                      <span className="text-[9px] text-gray-400 font-medium tracking-wide">{quote.date}</span>
                    </div>
                    <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                      {quote.customerName}
                    </h3>
                    <div className="text-right">
                      <span className="text-[14px] font-bold text-[#111827]">₹{quote.amount}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 flex flex-col gap-1.5 overflow-hidden min-h-0">
            {/* Detail Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-2.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">
                  {id === 'new' ? 'New Quote' : activeQuote.quoteNo}
                </h2>
                <span className="bg-[#ffe8e8] text-[#ff6b6b] text-[10px] font-bold px-2 py-0.5 rounded-full">
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
                <button className="flex items-center px-4 py-1.5 bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white rounded-full text-xs font-bold transition-opacity shadow-sm">
                  <ArrowRightLeft className="w-3 h-3 mr-1.5" />
                  Convert to SO
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
                    <div className="px-4 py-3 border-b border-gray-50">
                      <h3 className="text-[14px] font-bold text-gray-900">Customer Profile</h3>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white flex items-center justify-center text-sm font-bold shadow-sm mr-3 flex-shrink-0">
                          {activeQuote.customerName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-gray-900">{activeQuote.customerName}</h4>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-start">
                          <span className="text-[12px] font-medium text-gray-400 w-32">GSTIN</span>
                          <span className="text-[12px] font-bold text-gray-900 flex-1">29BGBBB2222B2Z2</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[12px] font-medium text-gray-400 w-32">Point Of Contact</span>
                          <span className="text-[12px] font-bold text-gray-900 flex-1">Sarah Jenkins</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quote Details Box */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <h3 className="text-[14px] font-bold text-gray-900">Quote Details</h3>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="space-y-1.5">
                        <div className="flex items-start">
                          <span className="text-[12px] font-medium text-gray-400 w-36">Quote Number</span>
                          <span className="text-[12px] font-bold text-gray-900 flex-1">QT-00002</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[12px] font-medium text-gray-400 w-36">Quote Date</span>
                          <span className="text-[12px] font-bold text-gray-900 flex-1">26/06/2026</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[12px] font-medium text-gray-400 w-36">Expected Shipment</span>
                          <span className="text-[12px] font-bold text-gray-900 flex-1">10/07/2026</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[12px] font-medium text-gray-400 w-36">Payment Terms</span>
                          <span className="text-[12px] font-bold text-gray-900 flex-1">Due On Receipt</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[12px] font-medium text-gray-400 w-36">Salesperson</span>
                          <span className="text-[12px] font-bold text-gray-900 flex-1">Ramesh Kumar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Addresses Box */}
                <div className="bg-white rounded-xl shadow-sm border border-[#eef2f6] flex flex-col lg:flex-row mt-2">
                  <div className="flex-1 p-6">
                    <h5 className="text-[15px] font-semibold text-gray-500 mb-4">Billing Address</h5>
                    <p className="text-[13px] text-[#1a233a] font-medium leading-relaxed">
                      Century Pulp & Paper Mill<br />
                      Gate No. 2, Administrative Office Lalkuan<br />
                      Industrial Area<br />
                      Lalkuan Nainital District Uttarakhand 43552
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-auto mx-6 lg:mx-0 lg:w-[2px] h-[1px] lg:h-auto bg-pink-200/60 lg:my-6 rounded-full"></div>

                  <div className="flex-1 p-6">
                    <h5 className="text-[15px] font-semibold text-gray-500 mb-4">Shipping Address</h5>
                    <p className="text-[13px] text-[#1a233a] font-medium leading-relaxed">
                      Century Pulp & Paper Mill<br />
                      Century House, Lalkuan Industrial Complex<br />
                      NH-109, Lalkuan Nainital District<br />
                      Uttarakhand 262402
                    </p>
                  </div>
                </div>

                {/* Product Specification Box */}
                <div className="bg-white rounded-xl shadow-sm border border-[#eef2f6] p-4">
                  <h3 className="text-[15px] font-bold text-[#1a233a] pb-3 border-b border-gray-100 mb-3">Product Specification</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                    <div className="bg-[#f8f9fc] p-3 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">Paper Type</p>
                      <p className="text-[13px] font-semibold text-[#1a233a]">Kraft</p>
                    </div>
                    <div className="bg-[#f8f9fc] p-3 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">Size</p>
                      <p className="text-[13px] font-semibold text-[#1a233a]">18×12×10 In</p>
                    </div>
                    <div className="bg-[#f8f9fc] p-3 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">Ply</p>
                      <p className="text-[13px] font-semibold text-[#1a233a]">5 Ply</p>
                    </div>
                    <div className="bg-[#f8f9fc] p-3 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">BF</p>
                      <p className="text-[13px] font-semibold text-[#1a233a]">18 BF</p>
                    </div>
                    <div className="bg-[#f8f9fc] p-3 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">Print</p>
                      <p className="text-[13px] font-semibold text-[#1a233a]">2 Color Flexo</p>
                    </div>
                  </div>
                </div>

                {/* Calculation Box */}
                <div className="bg-white rounded-xl shadow-sm border border-[#eef2f6] p-4">
                  <h3 className="text-[15px] font-bold text-[#1a233a] pb-3 border-b border-gray-100 mb-3">Calculation</h3>

                  <div className="w-full">
                    <div className="grid grid-cols-12 text-[11px] font-medium text-gray-400 border-b border-gray-100 pb-2">
                      <div className="col-span-6">Items</div>
                      <div className="col-span-2">Ordered Quantity</div>
                      <div className="col-span-2">Unit Rate (INR)</div>
                      <div className="col-span-2 text-right">Amount Total</div>
                    </div>

                    <div className="grid grid-cols-12 text-[12px] items-center text-[#1a233a] py-3 border-b border-gray-100">
                      <div className="col-span-6">
                        <p className="font-bold mb-0.5">5-Ply Corrugated Box</p>
                        <p className="text-[10px] text-gray-500">Kraft, 18×12×10 In, 18 BF</p>
                      </div>
                      <div className="col-span-2 font-bold">1,000 Box</div>
                      <div className="col-span-2 font-bold">30.00</div>
                      <div className="col-span-2 text-right font-bold">50,645</div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <div className="w-[300px]">
                      <div className="flex justify-between py-2.5">
                        <span className="text-[13px] font-bold text-[#1a233a]">Sub Total</span>
                        <span className="text-[13px] font-bold text-[#1a233a]">50,645</span>
                      </div>
                      <div className="flex justify-between py-2.5">
                        <span className="text-[13px] text-gray-500">GST :</span>
                        <span className="text-[13px] text-gray-500">600.96</span>
                      </div>
                      <div className="flex justify-between py-2.5">
                        <span className="text-[13px] text-gray-500">Discount Rate</span>
                        <span className="text-[13px] text-gray-500">400.97</span>
                      </div>
                      <div className="flex justify-between py-4 mt-2">
                        <span className="text-[15px] font-medium text-rose-400">Total Payable</span>
                        <span className="text-[15px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">₹53,900.00</span>
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

export default QuoteDetailPage;
