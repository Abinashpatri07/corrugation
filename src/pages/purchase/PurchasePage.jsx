import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Filter, MoreHorizontal, ChevronDown } from 'lucide-react';

const tabs = ['Expenses', 'Procurement', 'Purchase Order', 'Bills', 'Payment'];

const orders = [
  {
    id: 'PO-00001',
    date: '25/06/2026',
    purchaseOrder: 'PO-00001',
    reference: 'REF-101',
    vendorName: 'CENTURY PULP & PAPER',
    status: 'DRAFT',
    received: '---',
    billed: '---',
    amount: '₹45,000.00',
  },
  {
    id: 'PO-00002',
    date: '20/06/2026',
    purchaseOrder: 'PO-00002',
    reference: 'REF-102',
    vendorName: 'GLOBAL SUPPLIES INC',
    status: 'CONFIRMED',
    received: '---',
    billed: '---',
    amount: '₹12,500.00',
  },
  {
    id: 'PO-00003',
    date: '15/06/2026',
    purchaseOrder: 'PO-00003',
    reference: 'REF-103',
    vendorName: 'TECHHARDWARE LTD',
    status: 'RECEIVED',
    received: 'Full',
    billed: '---',
    amount: '₹0.00',
  }
];

const procurements = [
  {
    id: 'PR-00001',
    date: '25/06/2026',
    prNo: 'PR-00001',
    vendorName: 'CENTURY PULP & PAPER',
    material: 'Kraft Paper',
    quantity: '5,000 Kg',
    amount: '₹45,000.00',
  },
  {
    id: 'PR-00002',
    date: '20/06/2026',
    prNo: 'PR-00002',
    vendorName: 'GLOBAL SUPPLIES INC',
    material: 'Corrugated Sheet',
    quantity: '2,500 Kg',
    amount: '₹12,500.00',
  },
  {
    id: 'PR-00003',
    date: '15/06/2026',
    prNo: 'PR-00003',
    vendorName: 'TECHHARDWARE LTD',
    material: 'Duplex Board',
    quantity: '1,200 Kg',
    amount: '₹0.00',
  }
];

const expenses = [
  {
    id: 'EXP-00001',
    date: '25/06/2026',
    expensesAccount: 'Job Costing',
    reference: 'EXP-101',
    vendorName: 'CENTURY PULP & PAPER',
    paidThrough: 'Undeposited Funds',
    customerName: 'CENTURY PULP & PAPER',
    status: 'Billable',
    amount: '₹45,000.00',
  },
  {
    id: 'EXP-00002',
    date: '20/06/2026',
    expensesAccount: 'Logistics',
    reference: 'EXP-102',
    vendorName: 'GLOBAL SUPPLIES INC',
    paidThrough: 'Petty Cash',
    customerName: 'GLOBAL SUPPLIES INC',
    status: 'Non-Billable',
    amount: '₹12,500.00',
  },
  {
    id: 'EXP-00003',
    date: '15/06/2026',
    expensesAccount: 'IT Supplies',
    reference: 'EXP-103',
    vendorName: 'TECHHARDWARE LTD',
    paidThrough: 'Bank Transfer',
    customerName: 'TECHHARDWARE LTD',
    status: 'Billable',
    amount: '₹0.00',
  }
];

const bills = [
  {
    id: 'BILL-00001',
    date: '25/06/2026',
    billNo: 'B-101',
    reference: 'REF-101',
    vendorName: 'CENTURY PULP & PAPER',
    status: 'Partially Paid',
    dueDate: '25/07/2026',
    amount: '₹45,000.00',
    balanceDue: '₹20,000.00',
  },
  {
    id: 'BILL-00002',
    date: '20/06/2026',
    billNo: 'B-102',
    reference: 'REF-102',
    vendorName: 'GLOBAL SUPPLIES INC',
    status: 'Paid',
    dueDate: '20/07/2026',
    amount: '₹12,500.00',
    balanceDue: '₹0.00',
  },
  {
    id: 'BILL-00003',
    date: '15/06/2026',
    billNo: 'B-103',
    reference: 'REF-103',
    vendorName: 'TECHHARDWARE LTD',
    status: 'Draft',
    dueDate: '15/07/2026',
    amount: '₹0.00',
    balanceDue: '₹0.00',
  }
];

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-600',
  CONFIRMED: 'bg-blue-100 text-blue-600',
  RECEIVED: 'bg-green-100 text-green-600',
  BILLED: 'bg-purple-100 text-purple-600',
  CANCELLED: 'bg-red-100 text-red-600',
};

const PurchasePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'Purchase Order');
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5">

      {/* ── Page Toolbar & Navigation ── */}
      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab
                    ? 'text-[#1a233a] font-bold border-[#1a233a]'
                    : 'text-gray-500 font-medium border-transparent hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab}
              </button>
            ))}
          </nav>
      </div>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1 cursor-pointer">
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent">
              All {activeTab}{activeTab === 'Purchase Order' || activeTab === 'Payment' ? 's' : ''}
            </h2>
            <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (activeTab === 'Expenses') navigate('/purchase/expense/new');
                else if (activeTab === 'Bills') navigate('/purchase/bill/new');
                else if (activeTab === 'Procurement') navigate('/purchase/procurement/new');
                else navigate('/purchase/new');
              }}
              className="bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center transition-opacity shadow-sm"
            >
              <Plus className="w-3 h-3 mr-1" strokeWidth={2.5} />
              New
            </button>
            <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors">
              <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>


      {/* ── Content ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
        {/* Table Area */}
        <div className="flex-1 overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fc] border-b border-gray-100 text-[13px]">
                <th className="py-2.5 pl-4 pr-3 font-bold text-[#6b778c] w-16 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                    onChange={() => { }}
                  />
                </th>
                {activeTab === 'Expenses' && (
                  <>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Date</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Expenses Account</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Reference#</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Vendor Name</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Paid Through</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Customer Name</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Status</th>
                    <th className="py-2.5 pr-3 font-bold text-[#6b778c] whitespace-nowrap text-left">Amount</th>
                  </>
                )}
                {activeTab === 'Bills' && (
                  <>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Date</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Bill#</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Reference Number</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Vendor Name</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Amount</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Balance Due</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Due Date</th>
                    <th className="py-2.5 pr-3 font-bold text-[#6b778c] whitespace-nowrap text-left">
                      <div className="flex items-center gap-1">Status <ChevronDown className="w-3.5 h-3.5" /></div>
                    </th>
                  </>
                )}
                {activeTab === 'Procurement' && (
                  <>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Date</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">PR No</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Vendor Name</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Material</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Quantity</th>
                    <th className="py-2.5 pr-3 font-bold text-[#6b778c] whitespace-nowrap text-left">Amount</th>
                  </>
                )}
                {activeTab !== 'Expenses' && activeTab !== 'Bills' && activeTab !== 'Procurement' && (
                  <>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Date</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Purchase Order</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Reference#</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Vendor Name</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Status</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Received</th>
                    <th className="py-2.5 px-2 font-bold text-[#6b778c] whitespace-nowrap text-left">Billed</th>
                    <th className="py-2.5 pr-3 font-bold text-[#6b778c] whitespace-nowrap text-left">Amount</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeTab === 'Expenses' ? (
                expenses.map((expense, idx) => (
                  <tr
                    key={expense.id}
                    onClick={() => expense.expensesAccount === 'Job Costing' ? navigate('/purchase/expense/1') : null}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px] cursor-pointer
                        ${selectedRows.includes(expense.id) ? 'bg-blue-50' : 'bg-white'}`}
                  >
                    <td className="py-2.5 pl-4 pr-3 text-center" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(expense.id)}
                        onChange={() => toggleRow(expense.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium whitespace-nowrap">{expense.date}</td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="text-blue-500 hover:underline cursor-pointer font-medium text-left">
                        {expense.expensesAccount}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{expense.reference || ''}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{expense.vendorName}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{expense.paidThrough}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{expense.customerName}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{expense.status}</td>
                    <td className="py-2.5 pr-3 text-[#1a233a] font-medium whitespace-nowrap text-left">{expense.amount}</td>
                  </tr>
                ))
              ) : activeTab === 'Bills' ? (
                bills.map((bill, idx) => (
                  <tr
                    key={bill.id}
                    onClick={() => navigate('/purchase/bill/1')}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px] cursor-pointer
                        ${selectedRows.includes(bill.id) ? 'bg-blue-50' : 'bg-white'}`}
                  >
                    <td className="py-2.5 pl-4 pr-3 text-center" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(bill.id)}
                        onChange={() => toggleRow(bill.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium whitespace-nowrap">{bill.date}</td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="text-blue-500 hover:underline cursor-pointer font-medium text-left">
                        {bill.billNo}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium whitespace-nowrap">{bill.reference}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium uppercase whitespace-nowrap">{bill.vendorName}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{bill.amount}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{bill.balanceDue}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium whitespace-nowrap text-left">{bill.dueDate}</td>
                    <td className="py-2.5 pr-3 text-left whitespace-nowrap">
                      <span className="bg-[#ffe8e8] text-[#ff6b6b] px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap">
                        {bill.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : activeTab === 'Procurement' ? (
                procurements.map((pr, idx) => (
                  <tr
                    key={pr.id}
                    onClick={() => navigate('/purchase/procurement/1')}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px] cursor-pointer
                        ${selectedRows.includes(pr.id) ? 'bg-blue-50' : 'bg-white'}`}
                  >
                    <td className="py-2.5 pl-4 pr-3 text-center" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(pr.id)}
                        onChange={() => toggleRow(pr.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium whitespace-nowrap">{pr.date}</td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="text-blue-500 hover:underline cursor-pointer font-medium text-left">
                        {pr.prNo}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium whitespace-nowrap">{pr.vendorName}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium whitespace-nowrap">{pr.material}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium whitespace-nowrap text-left">{pr.quantity}</td>
                    <td className="py-2.5 pr-3 text-[#1a233a] font-medium text-left">{pr.amount}</td>
                  </tr>
                ))
              ) : (
                orders.map((order, idx) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/purchase/order/${order.id}`)}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px] cursor-pointer
                        ${selectedRows.includes(order.id) ? 'bg-blue-50' : 'bg-white'}`}
                  >
                    <td className="py-2.5 pl-4 pr-3 text-center" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(order.id)}
                        onChange={() => toggleRow(order.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium whitespace-nowrap">{order.date}</td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="text-blue-500 hover:underline cursor-pointer font-medium text-left">
                        {order.purchaseOrder}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{order.reference || ''}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{order.vendorName}</td>
                    <td className="py-2.5 px-2 text-left">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{order.received}</td>
                    <td className="py-2.5 px-2 text-[#1a233a] font-medium text-left whitespace-nowrap">{order.billed}</td>
                    <td className="py-2.5 pr-3 text-[#1a233a] font-medium whitespace-nowrap text-left">{order.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Empty state if no orders */}
          {orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <p className="text-[14px]">No purchase orders found</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default PurchasePage;
