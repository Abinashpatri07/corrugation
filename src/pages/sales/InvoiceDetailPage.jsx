import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  MoreHorizontal, 
  Search, 
  Edit, 
  Send, 
  Printer, 
  Download,
  Settings,
  ZoomIn,
  ZoomOut,
  Maximize,
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
  ArrowRightLeft,
  Hexagon,
  Box,
  Beaker,
  Gauge,
  Activity
} from 'lucide-react';

const InvoiceDetailPage = () => {
  const navigate = useNavigate();

  const tabs = [
    { name: 'Quotes', path: '/sales/quotes' },
    { name: 'Sales Orders', path: '/sales/orders' },
    { name: 'Invoices', path: '/sales/invoices' },
    { name: 'Payments', path: '/sales/payments' }
  ];

  const steps = [
    { name: 'Quote', icon: PackagePlus, status: 'completed' },
    { name: 'Sales Order', icon: FileText, status: 'completed' },
    { name: 'Production', icon: Factory, status: 'completed' },
    { name: 'Package', icon: Package, status: 'completed' },
    { name: 'Ship', icon: Truck, status: 'completed' },
    { name: 'Invoice', icon: Receipt, status: 'active' },
    { name: 'Delivered', icon: PackageCheck, status: 'upcoming' },
    { name: 'Payment', icon: HandCoins, status: 'upcoming' },
  ];

  return (
    <main className="flex-1 overflow-hidden bg-[#f8f9fb] flex flex-col relative p-1.5 gap-1.5">
      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap ${
                tab.name === 'Invoices'
                  ? 'text-black font-bold border-black'
                  : 'text-gray-500 font-medium border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1.5">
        
        {/* Top Banner with Stepper */}
        <div className="bg-white px-6 py-2 rounded-xl shadow-sm flex-shrink-0">
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit mb-1">
            Invoice
          </h2>
          
          <div className="flex items-start w-full min-w-[700px] overflow-x-auto hide-scrollbar pb-0 px-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              let textClass = "";
              let iconBgClass = "";
              let iconTextClass = "";
              let lineClass = "bg-gray-200";

              if (step.status === 'completed') {
                textClass = "text-green-600 font-bold";
                iconBgClass = "bg-green-400 ring-4 ring-green-100";
                iconTextClass = "text-white";
                if (index < steps.length - 1 && steps[index+1].status === 'active') {
                   lineClass = "bg-gradient-to-r from-green-400 to-[#d54a88]";
                } else {
                   lineClass = "bg-green-400";
                }
              } else if (step.status === 'active') {
                textClass = "text-gray-900 font-bold";
                iconBgClass = "bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] ring-4 ring-pink-50";
                iconTextClass = "text-white";
                lineClass = "bg-gray-200";
              } else {
                textClass = "text-gray-500 font-medium";
                iconBgClass = "bg-white border-2 border-gray-200";
                iconTextClass = "text-gray-400";
                lineClass = "bg-gray-200";
              }

              return (
                <React.Fragment key={step.name}>
                  <div className="flex flex-col items-center shrink-0 w-[90px]">
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${iconBgClass} ${iconTextClass}`}>
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <span className={`mt-2 text-[11px] font-medium text-center ${textClass}`}>
                      {step.name}
                    </span>
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 flex items-start pt-[15px] -mx-[25px]">
                      <div className={`h-[2px] w-full ${lineClass}`}></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Master Detail View Area */}
        <div className="flex-1 flex gap-1.5 overflow-hidden min-h-0">
          
          {/* Left Sidebar (Invoice List) */}
          <div className="w-[270px] bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col flex-shrink-0 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 cursor-pointer">
                <h2 className="text-[15px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">All Invoices</h2>
                <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
              </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => navigate('/sales/invoices/new')}
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
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                </span>
                <input 
                  type="text" 
                  placeholder="Search customer, product or item..." 
                  className="w-full bg-[#f4f6f8] border-none rounded-md pl-9 pr-3 py-2.5 text-[12px] font-medium text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-200 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
              {/* Selected Invoice Card */}
              <div className="bg-gradient-to-br from-[#ffede1] via-[#fae8f8] to-[#efdfff] rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md transition-all shadow-sm border border-transparent mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">INV-00001</span>
                  <span className="text-[9px] text-gray-400 font-medium tracking-wide">25/06/2026</span>
                </div>
                <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                  GLOBEX AIRWORLD LTD
                </h3>
                <div className="text-right">
                  <span className="text-[14px] font-bold text-[#111827]">₹36,242.64</span>
                </div>
              </div>

              {/* Inactive Card 1 */}
              <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">INV-00002</span>
                  <span className="text-[9px] text-gray-400 font-medium tracking-wide">20/06/2026</span>
                </div>
                <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                  NEXUS TECHNOLOGIES
                </h3>
                <div className="text-right">
                  <span className="text-[14px] font-bold text-[#111827]">₹12,500.00</span>
                </div>
              </div>

              {/* Inactive Card 2 */}
              <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">INV-00003</span>
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

        {/* Right Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          
          {/* Detail Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-2.5 flex items-center justify-between flex-shrink-0 mb-0">
            <div className="flex items-center space-x-3">
              <h2 className="text-[17px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">INV-00001</h2>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                <Send className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                <Printer className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center px-4 py-1.5 bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white rounded-full text-xs font-bold transition-opacity hover:opacity-90 shadow-sm">
                Record Payment
              </button>
              <button className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Document Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 pb-8 px-8 flex flex-col items-center">
            
            {/* Toolbar */}
            <div className="w-full max-w-[850px] flex justify-end mb-4 sticky top-0 z-10">
              <div className="flex items-center bg-[#eef2f6] rounded-full px-2 py-1 shadow-sm border border-gray-200/60 backdrop-blur-sm">
                <button className="p-2 text-gray-600 hover:text-[#1a233a] hover:bg-white rounded-full transition-colors"><Settings className="w-5 h-5" /></button>
                <button className="p-2 text-gray-600 hover:text-[#1a233a] hover:bg-white rounded-full transition-colors"><ZoomIn className="w-5 h-5" /></button>
                <span className="px-3 text-xs font-semibold text-gray-600">100%</span>
                <button className="p-2 text-gray-600 hover:text-[#1a233a] hover:bg-white rounded-full transition-colors"><ZoomOut className="w-5 h-5" /></button>
                <button className="p-2 text-gray-600 hover:text-[#1a233a] hover:bg-white rounded-full transition-colors"><Maximize className="w-4 h-4" /></button>
              </div>
            </div>
            {/* A4 Document */}
            <div className="w-full max-w-[850px] bg-white rounded-xl shadow-sm border border-[#cbd5e1] min-h-[1100px] p-12 relative mb-8">
              
              {/* Document Header */}
              <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8 relative z-10">
                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-2xl bg-[#3b82f6] text-white flex items-center justify-center mr-4 shadow-sm flex-shrink-0">
                    <Hexagon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-[#1e293b] mb-1 tracking-tight">GLOBEX AIRWORLD LTD</h1>
                    <p className="text-gray-500 text-xs mb-3">Global Innovation. Delivered.</p>
                    <p className="text-gray-500 text-xs leading-relaxed max-w-[200px] mb-2">
                      4500 Hammock Oaks, Michigan,<br/>
                      San Antonio 78247, USA
                    </p>
                    <p className="text-xs font-bold text-[#1e293b]">GSTIN: <span className="text-gray-500 font-medium">27AACC1234A1Z5</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-[11px] font-bold text-[#1e293b] mb-2 tracking-wider">INVOICE & PAYMENT</h2>
                  <p className="text-2xl font-bold text-[#3b82f6] mb-3">INV-2026-0458</p>
                  <p className="text-gray-500 text-xs font-medium">15 Jun 2026 • Ref: SO-000123</p>
                </div>
              </div>

              {/* Info section */}
              <div className="flex justify-between items-start pb-8 mb-4 relative z-10">
                <div className="w-1/2 pr-8">
                  <h3 className="text-[11px] font-bold text-[#3b82f6] uppercase tracking-wider mb-3">BILL TO</h3>
                  <p className="text-sm font-bold text-[#1e293b] mb-1">Globex Advanced Logistics</p>
                  <p className="text-xs text-gray-600 mb-2">Supply Chain Division</p>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-[250px] mb-3">
                    22 Park Street, Suite 5C,<br/>
                    New York, NY 10001, USA
                  </p>
                  <p className="text-xs font-bold text-[#1e293b]">GSTIN: <span className="text-gray-500 font-medium">12AABG1234B1Z6</span></p>
                </div>
                <div className="w-1/2 pl-4">
                  <h3 className="text-[11px] font-bold text-[#3b82f6] uppercase tracking-wider mb-3">SHIP TO</h3>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-[250px] mb-4">
                    Warehouse 42, Port Logistics Zone,<br/>
                    Nhava Sheva, Mumbai,<br/>
                    Maharashtra 400707, India
                  </p>
                  <p className="text-xs font-bold text-[#1e293b]">GSTIN: <span className="text-gray-500 font-medium">27AABFG1234C1Z7</span></p>
                </div>
              </div>

              {/* Items Table */}
              <div className="relative z-10 mb-8">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#f8fafc]">
                      <th className="py-4 px-4 text-[11px] font-bold text-[#1e293b] uppercase tracking-wider w-[55%] rounded-l-md">ITEM DESCRIPTION</th>
                      <th className="py-4 px-4 text-[11px] font-bold text-[#1e293b] uppercase tracking-wider text-center">QUANTITY</th>
                      <th className="py-4 px-4 text-[11px] font-bold text-[#1e293b] uppercase tracking-wider text-right">RATE</th>
                      <th className="py-4 px-4 text-[11px] font-bold text-[#1e293b] uppercase tracking-wider text-right rounded-r-md">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-5 px-4 flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#3b82f6] flex items-center justify-center mr-4 flex-shrink-0">
                           <Box className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1e293b] mb-1">Heavy Duty Industrial Coil Springs</p>
                          <p className="text-[10px] text-gray-500 font-medium">HSN: 7320 20 90</p>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-center text-xs text-gray-700 font-medium whitespace-nowrap">20 PCS</td>
                      <td className="py-5 px-4 text-right text-xs text-gray-700 whitespace-nowrap">₹ 520.00</td>
                      <td className="py-5 px-4 text-right text-xs font-bold text-[#1e293b] whitespace-nowrap">₹10,400.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-5 px-4 flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#f5f3ff] text-[#8b5cf6] flex items-center justify-center mr-4 flex-shrink-0">
                           <Beaker className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1e293b] mb-1">High-Temp Pressure Control Valve</p>
                          <p className="text-[10px] text-gray-500 font-medium">HSN: 8481 80 20</p>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-center text-xs text-gray-700 font-medium whitespace-nowrap">2 PCS</td>
                      <td className="py-5 px-4 text-right text-xs text-gray-700 whitespace-nowrap">₹ 8,900.00</td>
                      <td className="py-5 px-4 text-right text-xs font-bold text-[#1e293b] whitespace-nowrap">₹17,800.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-5 px-4 flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] text-[#22c55e] flex items-center justify-center mr-4 flex-shrink-0">
                           <Gauge className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1e293b] mb-1">Stainless Steel Pressure Gauge (0-160 Bar)</p>
                          <p className="text-[10px] text-gray-500 font-medium">HSN: 9026 10 00</p>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-center text-xs text-gray-700 font-medium whitespace-nowrap">10 PCS</td>
                      <td className="py-5 px-4 text-right text-xs text-gray-700 whitespace-nowrap">₹ 450.00</td>
                      <td className="py-5 px-4 text-right text-xs font-bold text-[#1e293b] whitespace-nowrap">₹4,500.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end relative z-10 mb-8">
                <div className="w-[300px] space-y-4 pt-4">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-[#1e293b] font-bold">₹ 32,700.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#f43f5e] font-medium">Discount</span>
                    <span className="text-[#f43f5e] font-bold">(-) ₹ 1,300.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500 font-medium">Consolidated Taxes</span>
                    <span className="text-[#1e293b] font-bold">₹ 4,842.64</span>
                  </div>
                  <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[15px] font-bold text-[#1e293b]">Total (INR)</span>
                    <span className="text-[15px] font-bold text-[#1e293b]">₹ 36,242.64</span>
                  </div>
                </div>
              </div>
            </div>

            {/* More Information */}
            <div className="w-full max-w-[850px] bg-[#f0f9ff] rounded-xl p-6 border border-[#dcedf8] mb-12">
              <h3 className="text-[14px] font-bold text-[#1e293b] mb-4">More Information</h3>
              <div className="grid grid-cols-[180px_1fr] gap-y-3 text-[12px]">
                <div className="text-gray-400">Salesperson</div>
                <div className="text-[#1e293b]">Manoj Kumar</div>
                <div className="text-gray-400">Email Recipients</div>
                <div className="text-[#1e293b]">manojkumar@globex.com</div>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default InvoiceDetailPage;
