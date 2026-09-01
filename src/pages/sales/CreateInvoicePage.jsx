import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText,
  ShoppingCart,
  Factory,
  Package,
  Truck,
  Receipt,
  CheckCircle,
  CreditCard,
  ChevronDown,
  Bookmark,
  GripVertical,
  Plus,
  Minus
} from 'lucide-react';

const CreateInvoicePage = () => {
  const navigate = useNavigate();
  
  const tabs = [
    { name: 'Quotes', path: '/sales/quotes' },
    { name: 'Sales Orders', path: '/sales/orders' },
    { name: 'Invoices', path: '/sales/invoices' },
    { name: 'Payments', path: '/sales/payments' }
  ];

  // Stepper Items
  const steps = [
    { name: 'Quote', icon: FileText, active: false },
    { name: 'Sales order', icon: ShoppingCart, active: false },
    { name: 'Production', icon: Factory, active: false },
    { name: 'Package', icon: Package, active: false },
    { name: 'Ship', icon: Truck, active: false },
    { name: 'Invoice', icon: Receipt, active: true },
    { name: 'Delivered', icon: CheckCircle, active: false },
    { name: 'Payment', icon: CreditCard, active: false },
  ];

  return (
    <main className="flex-1 overflow-hidden bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5 font-sans">
      
      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab.name === 'Invoices'
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
        
        {/* Top Banner with Stepper */}
        <div className="bg-[#244f5d] text-white px-6 py-2 shrink-0 rounded-xl shadow-sm">
          <h2 className="text-[20px] font-bold tracking-wide leading-tight mb-2">
            Invoice Creation
          </h2>
          
          <div className="flex items-center overflow-x-auto pb-2 custom-scrollbar">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.name}>
                  <div className={`flex items-center px-3 py-1.5 rounded-full font-medium text-xs flex-shrink-0 shadow-sm ${
                    step.active ? 'bg-white text-[#244f5d]' : 'bg-[#5c8a99] text-white'
                  }`}>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] mr-1.5 ${
                      step.active ? 'bg-[#244f5d] text-white' : 'bg-white text-[#5c8a99]'
                    }`}>
                      <Icon className="w-2.5 h-2.5" strokeWidth={2.5} />
                    </span>
                    {step.name}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-[1px] bg-white/30 flex-shrink-0 mx-1"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-4 pr-1 max-w-5xl space-y-6">
          
          {/* Main Form Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-[3px] border-t-blue-600 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              
              {/* Row 1 */}
              <div className="flex items-center">
                <label className="w-1/3 text-sm font-bold text-gray-600">Customer Name *</label>
                <div className="w-2/3 relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white">
                    <option></option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="hidden md:block"></div>

              {/* Row 2 */}
              <div className="flex items-center">
                <label className="w-1/3 text-sm font-bold text-gray-600">Invoice#</label>
                <div className="w-2/3">
                  <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-sm font-bold text-gray-600">Order Number</label>
                <div className="w-2/3">
                  <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex items-center">
                <label className="w-1/3 text-sm font-bold text-gray-600">Invoice Date</label>
                <div className="w-2/3">
                  <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-sm font-bold text-gray-600">Due Date</label>
                <div className="w-2/3">
                  <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex items-center">
                <label className="w-1/3 text-sm font-bold text-gray-600">Terms</label>
                <div className="w-2/3 relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white">
                    <option></option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-sm font-bold text-gray-600">Salesperson</label>
                <div className="w-2/3 relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white">
                    <option></option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Row 5 */}
              <div className="flex items-center">
                <label className="w-1/3 text-sm font-bold text-gray-600">Accounts<br/>Receivable</label>
                <div className="w-2/3 relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white">
                    <option></option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Item Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-[3px] border-t-blue-600 p-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <h3 className="text-xl font-bold text-[#1a233a]">Item Table</h3>
              <button className="flex items-center justify-between px-4 py-2 border border-black text-black font-bold rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                Bulk Action
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
            </div>
            
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="pb-3 px-2 font-medium w-10"></th>
                  <th className="pb-3 font-medium">Item Details</th>
                  <th className="pb-3 font-medium w-48">Quantity</th>
                  <th className="pb-3 font-medium w-40">Rate</th>
                  <th className="pb-3 font-medium w-40">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-6 px-2 text-gray-300">
                    <GripVertical className="w-5 h-5 cursor-move" />
                  </td>
                  <td className="py-6 pr-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-[#e8effc] flex items-center justify-center text-blue-600 mr-3 flex-shrink-0">
                        <Package className="w-5 h-5" />
                      </div>
                      <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                  </td>
                  <td className="py-6 pr-6">
                    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
                      <button className="px-3 py-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors border-r border-gray-200">
                        <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                      </button>
                      <input type="text" className="w-full text-center py-2 text-sm focus:outline-none" />
                      <button className="px-3 py-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors border-l border-gray-200">
                        <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                      </button>
                    </div>
                  </td>
                  <td className="py-6 pr-6">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                      <input type="text" className="w-full border border-gray-200 rounded-md pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                  </td>
                  <td className="py-6">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                      <input type="text" className="w-full border border-gray-200 rounded-md pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-gray-50/50" readOnly />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="mt-4 flex items-center justify-between">
              <button className="flex items-center px-4 py-2 border border-blue-300 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                Add New Row
                <Plus className="w-4 h-4 ml-1.5" strokeWidth={2.5} />
              </button>
              <p className="text-[10px] text-gray-500 font-medium">Items Selected Dynamically Synchronize With Central Ledger Accounts Automatically.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-6">
              {/* Customer Note */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-[3px] border-t-blue-600 p-6">
                <h3 className="text-xl font-bold text-[#1a233a] mb-4">Customer Note</h3>
                <textarea 
                  className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 h-32 resize-none"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">It Will Not Be Shown In PDF</p>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-[3px] border-t-blue-600 p-6">
                <h3 className="text-xl font-bold text-[#1a233a] mb-4">Terms & Conditions</h3>
                <textarea 
                  className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 h-20 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Invoice Totals Console */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-[3px] border-t-blue-600 p-6 h-full">
              <h3 className="text-xl font-bold text-[#1a233a] mb-6">Invoice Totals Console</h3>
              
              <div className="space-y-4">
                {/* Discount */}
                <div className="bg-[#f8fafc] rounded-lg p-4 border border-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#1a233a]">Discount</span>
                    <div className="flex items-center bg-[#eef2f6] rounded p-1 border border-blue-100/50">
                      <button className="px-3 py-0.5 text-xs font-semibold rounded bg-white text-[#1a233a] shadow-sm">%</button>
                      <button className="px-3 py-0.5 text-xs font-semibold rounded text-white bg-blue-600">₹</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <input type="text" className="w-[80%] border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 bg-white" />
                    <span className="text-sm font-bold text-[#1a233a]">-$0.00</span>
                  </div>
                </div>

                {/* Tax Allocation Mapping */}
                <div className="bg-[#f8fafc] rounded-lg p-4 border border-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#1a233a]">Tax Allocation Mapping</span>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="taxAllocation" className="peer sr-only" />
                          <div className="w-3.5 h-3.5 rounded-full border border-gray-300 peer-checked:border-blue-600 flex items-center justify-center transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 scale-0 peer-checked:scale-100 transition-transform"></div>
                          </div>
                        </div>
                        <span className="ml-1.5 text-[11px] font-semibold text-gray-500">TDS</span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="taxAllocation" className="peer sr-only" defaultChecked />
                          <div className="w-3.5 h-3.5 rounded-full border border-blue-600 flex items-center justify-center transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 scale-100 transition-transform"></div>
                          </div>
                        </div>
                        <span className="ml-1.5 text-[11px] font-semibold text-gray-500">TCS</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <input type="text" className="w-[80%] border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 bg-white" />
                    <span className="text-sm font-bold text-[#1a233a]">-$0.00</span>
                  </div>
                </div>

                {/* Manual Adjustments */}
                <div className="bg-[#f8fafc] rounded-lg p-4 border border-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#1a233a]">Manual Adjustments</span>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <input type="text" className="w-[80%] border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 bg-white" />
                    <span className="text-sm font-bold text-[#1a233a]">-$0.00</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="bg-[#244f5d] rounded-xl p-5 mt-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-white/90">Grand Total</span>
                    <span className="text-2xl font-bold text-white">₹7,20,951.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-t-[3px] border-t-blue-600 p-6">
            <h3 className="text-xl font-bold text-[#1a233a] mb-4">Comment</h3>
            <textarea 
              className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 h-32 resize-none"
            ></textarea>
          </div>

        </div>
      </div>

      {/* Footer Actions */}
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 px-6 py-2 flex items-center justify-end space-x-3 z-50 mt-auto rounded-b-xl">
        <button 
          onClick={() => navigate('/sales/invoices')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button 
          onClick={() => navigate('/sales/invoices')}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-colors"
        >
          Save
        </button>
      </div>

    </main>
  );
};

export default CreateInvoicePage;
