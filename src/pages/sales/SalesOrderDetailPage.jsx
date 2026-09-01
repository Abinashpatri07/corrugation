import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Plus,
  MoreHorizontal,
  Search,
  Edit,
  Send,
  Printer,
  ArrowRightLeft,
  MoreVertical,
  ChevronDown,
  FileText,
  PackagePlus,
  ShoppingCart,
  Factory,
  Package,
  Truck,
  Receipt,
  PackageCheck,
  HandCoins
} from 'lucide-react';

const SalesOrderDetailPage = () => {
  const navigate = useNavigate();
  const tabs = [
    { name: 'Quotes', path: '/sales/quotes' },
    { name: 'Sales Orders', path: '/sales/orders' },
    { name: 'Invoices', path: '/sales/invoices' },
    { name: 'Payments', path: '/sales/payments' }
  ];

  const steps = [
    { name: 'Quote', icon: Check, status: 'completed' },
    { name: 'Sales order', icon: FileText, status: 'active' },
    { name: 'Production', icon: Factory, status: 'inactive' },
    { name: 'Package', icon: Package, status: 'inactive' },
    { name: 'Ship', icon: Truck, status: 'inactive' },
    { name: 'Invoice', icon: Receipt, status: 'inactive' },
    { name: 'Delivered', icon: PackageCheck, status: 'inactive' },
    { name: 'Payment', icon: HandCoins, status: 'inactive' },
  ];

  return (
    <main className="flex-1 overflow-y-hidden bg-[#f8f9fb] flex flex-col relative p-1.5 gap-1.5">

      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap ${tab.name === 'Sales Orders'
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
            Sale Orders
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
                // Color the line to the next step
                if (index < steps.length - 1 && steps[index + 1].status === 'active') {
                  lineClass = "bg-gradient-to-r from-green-400 to-rose-400";
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

          {/* Left Master List */}
          <div className="w-[270px] bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col flex-shrink-0 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 cursor-pointer">
                <h3 className="text-[15px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">All Sale Orders</h3>
                <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
              </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => navigate('/sales/new')} className="w-7 h-7 bg-gray-900 hover:bg-black text-white rounded-full flex items-center justify-center shadow-sm transition-colors">
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

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
              {/* Active Card */}
              <div className="bg-gradient-to-br from-[#ffede1] via-[#fae8f8] to-[#efdfff] rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md transition-all shadow-sm border border-transparent mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">SO-00001</span>
                  <span className="text-[9px] text-gray-400 font-medium tracking-wide">25/06/2026</span>
                </div>
                <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                  CLIMAMAX PVT LTD
                </h3>
                <div className="text-right">
                  <span className="text-[14px] font-bold text-[#111827]">₹53,900.00</span>
                </div>
              </div>

              {/* Inactive Card 1 */}
              <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[12px] font-medium text-[#374151]">SO-00002</span>
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
                  <span className="text-[12px] font-medium text-[#374151]">SO-00003</span>
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

          {/* Right Detail View */}
          <div className="flex-1 flex flex-col gap-1.5 overflow-hidden min-h-0">

            {/* Detail Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-2.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">
                  SO-00001
                </h2>
                <span className="bg-[#ffecd6] text-[#ff7a59] text-[10px] font-bold px-2 py-0.5 rounded-full">
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
                  Convert to Invoice
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Detail Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-2 pr-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 min-h-full space-y-4">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

                  {/* Customer Profile Card */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <h3 className="text-[14px] font-bold text-gray-900">Customer Profile</h3>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white flex items-center justify-center text-sm font-bold shadow-sm mr-3 flex-shrink-0">
                          CC
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-gray-900">Climamax Controls Pvt Ltd</h4>
                          <div className="text-[11px] text-gray-400 font-medium">CUST-00042</div>
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

                  {/* Details Card */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <h3 className="text-[14px] font-bold text-gray-900">Details</h3>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="space-y-1.5">
                        <div className="flex items-start">
                          <span className="text-[12px] font-medium text-gray-400 w-36">Reference</span>
                          <span className="text-[12px] font-bold text-gray-900 flex-1">QT-000001</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[12px] font-medium text-gray-400 w-36">Order Date</span>
                          <span className="text-[12px] font-bold text-gray-900 flex-1">25/06/2026</span>
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

                {/* Address Details */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 px-4 py-3">
                      <h3 className="text-[14px] font-bold text-gray-500 mb-2">Billing Address</h3>
                      <div className="text-[12px] text-gray-900 font-medium leading-relaxed">
                        648/A, OM Chambers, Binnamangala 1st<br />
                        Stage, Bengaluru, Karnataka 560038
                      </div>
                    </div>
                    <div className="hidden md:block w-px bg-gray-100 my-3"></div>
                    <div className="flex-1 px-4 py-3">
                      <h3 className="text-[14px] font-bold text-gray-500 mb-2">Shipping Address</h3>
                      <div className="text-[12px] text-gray-900 font-medium leading-relaxed">
                        Warehouse No. 12,<br />
                        KIADB Industrial Area, Whitefield,<br />
                        Bengaluru, Karnataka 560066
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Specification */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <h3 className="text-[14px] font-bold text-gray-900">Product Specification</h3>
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                    <div className="bg-[#f8f9fc] p-3 rounded-2xl">
                      <div className="text-[11px] text-gray-500 font-medium mb-1">Paper Type</div>
                      <div className="text-[13px] font-bold text-gray-900">Kraft</div>
                    </div>
                    <div className="bg-[#f8f9fc] p-3 rounded-2xl">
                      <div className="text-[11px] text-gray-500 font-medium mb-1">Size</div>
                      <div className="text-[13px] font-bold text-gray-900">18×12×10 In</div>
                    </div>
                    <div className="bg-[#f8f9fc] p-3 rounded-2xl">
                      <div className="text-[11px] text-gray-500 font-medium mb-1">Ply</div>
                      <div className="text-[13px] font-bold text-gray-900">5 Ply</div>
                    </div>
                    <div className="bg-[#f8f9fc] p-3 rounded-2xl">
                      <div className="text-[11px] text-gray-500 font-medium mb-1">BF</div>
                      <div className="text-[13px] font-bold text-gray-900">18 BF</div>
                    </div>
                    <div className="bg-[#f8f9fc] p-3 rounded-2xl">
                      <div className="text-[11px] text-gray-500 font-medium mb-1">Print</div>
                      <div className="text-[13px] font-bold text-gray-900">2 Color Flexo</div>
                    </div>
                  </div>
                </div>

                {/* Calculation / Items Table */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
                  <div className="px-5 py-4 border-b border-gray-50">
                    <h3 className="text-[14px] font-bold text-gray-900">Calculation</h3>
                  </div>
                  <div>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#f8f9fb] border-b border-gray-100">
                          <th className="py-2.5 px-5 text-[11px] font-medium text-gray-500 w-1/2">Items</th>
                          <th className="py-2.5 px-5 text-[11px] font-medium text-gray-500 text-center">Ordered Quantity</th>
                          <th className="py-2.5 px-5 text-[11px] font-medium text-gray-500 text-right">Unit Rate (INR)</th>
                          <th className="py-2.5 px-5 text-[11px] font-medium text-gray-500 text-right">Amount Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-50">
                          <td className="py-4 px-5">
                            <div className="text-[13px] font-bold text-gray-900">5-Ply Corrugated Box</div>
                            <div className="text-[11px] text-gray-400 font-medium mt-0.5">Kraft, 18×12×10 In, 18 BF</div>
                          </td>
                          <td className="py-4 px-5 text-[13px] font-bold text-gray-900 text-center">1,000 Box</td>
                          <td className="py-4 px-5 text-[13px] font-bold text-gray-900 text-right">30.00</td>
                          <td className="py-4 px-5 text-[13px] font-bold text-gray-900 text-right">50,645</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Totals Section */}
                  <div className="flex justify-end p-5">
                    <div className="w-72">
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-[12px] font-bold text-gray-900">Sub Total</span>
                        <span className="text-[13px] font-bold text-gray-900">50,645</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-[11px] text-gray-500 font-medium">GST :</span>
                        <span className="text-[11px] text-gray-500 font-medium">600.96</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 mb-2">
                        <span className="text-[11px] text-gray-500 font-medium">Discount Rate</span>
                        <span className="text-[11px] text-gray-500 font-medium">400.97</span>
                      </div>

                      <div className="flex justify-between items-center py-3 border-t border-dashed border-gray-200">
                        <span className="text-[13px] font-bold text-[#ff7a59]">Total Payable</span>
                        <span className="text-[16px] font-bold bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">₹53,900.00</span>
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

export default SalesOrderDetailPage;
