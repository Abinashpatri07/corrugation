import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Filter, MoreHorizontal, ChevronDown, Edit } from 'lucide-react';

const tabs = ['Manufacturing Order', 'Job Cards'];

const manufacturingData = [
  {
    id: 'MFG-00001',
    date: '30/06/2026',
    billNo: '8645',
    reference: '8688322738',
    vendorName: 'CLIMAMAX',
    status: 'Undeposited Funds',
    dueDate: '10/06/2026',
    amount: '₹5,999.00',
    balanceDue: '1,000.00',
  },
];


const mfgOrdersData = [
  {
    id: 'MO-001',
    quoteNo: 'QUE-2026-0001',
    moNumber: 'MO-001',
    salesOrder: 'SO-001',
    customer: 'Sunrise Packaging Solutions Pvt. Ltd.',
    order: '5 Ply-90 X 120',
    quantity: '15,000 Boxes',
    estimateTime: '10 Hrs'
  },
  {
    id: 'MO-002',
    quoteNo: 'QUE-2026-0002',
    moNumber: 'MO-002',
    salesOrder: 'SO-002',
    customer: 'GreenPack Industries Ltd.',
    order: '5 Ply-110 X 130',
    quantity: '5,000 Boxes',
    estimateTime: '6 Hrs'
  },
  {
    id: 'MO-003',
    quoteNo: 'QUE-2026-0003',
    moNumber: 'MO-003',
    salesOrder: 'SO-003',
    customer: 'Apex Corrugation Works',
    order: '3 Ply-90 X 100',
    quantity: '8,000 Boxes',
    estimateTime: '9 Hrs'
  }
];

const corrugatorJobData = [
  {
    id: 'JC-001',
    jobCardNo: 'CJC-2026-0912',
    jobCardType: 'Corrugator Job Card',
    reference: 'REF-000001',
    startDate: '25/07/2025',
    endDate: '28/07/2025',
    time: '13.56',
    status: 'Released'
  },
  {
    id: 'JC-002',
    jobCardNo: 'DJC-2026-1548',
    jobCardType: 'Downstream Job Card',
    reference: 'REF-000022',
    startDate: '27/07/2025',
    endDate: '29/07/2025',
    time: '15.56',
    status: 'Pending'
  },
  {
    id: 'JC-003',
    jobCardNo: 'QC-2026-2210',
    jobCardType: 'QC Inspection Card',
    reference: 'REF-000002',
    startDate: '28/07/2025',
    endDate: '31/07/2025',
    time: '14.26',
    status: 'Released'
  }
];

const ProductionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'Manufacturing Order');
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5">
      
      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-gray-500 font-medium hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1 cursor-pointer">
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">
            {activeTab === 'Manufacturing Order' ? 'All Manufacturing Orders' : 'All Job Cards'}
          </h2>
          <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center transition-opacity shadow-sm">
            {activeTab === 'Manufacturing Order' ? (
              <>
                <Edit className="w-3 h-3 mr-1" strokeWidth={2.5} />
                Edit
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 mr-1" strokeWidth={2.5} />
                New
              </>
            )}
          </button>
          <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors">
            <Filter className="w-4 h-4" strokeWidth={2} />
          </button>
          <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors">
            <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
        {activeTab === 'Manufacturing Order' && (
          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-[#f8f9fa] sticky top-0 z-10">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      onChange={() => {}}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Quote No</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Manufacturing Order</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Sales Order</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Customer</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Order</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Quantity</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Estimate Time</th>
                </tr>
              </thead>
              <tbody>
                {mfgOrdersData.map((item, idx) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/production/manufacturing/${item.id}`)}
                    className={`border-b border-gray-100 transition-colors cursor-pointer
                      ${selectedRows.includes(item.id) ? 'bg-blue-50' : idx % 2 === 0 ? 'bg-white' : 'bg-[#fcfcfc]'}`}
                  >
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleRow(item.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium whitespace-nowrap">{item.quoteNo}</td>
                    <td className="px-4 py-3">
                      <span className="text-[13px] text-blue-500 hover:underline cursor-pointer font-medium whitespace-nowrap">
                        {item.moNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium whitespace-nowrap">{item.salesOrder}</td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium w-48">{item.customer}</td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium whitespace-nowrap">{item.order}</td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium whitespace-nowrap">{item.quantity}</td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium whitespace-nowrap">{item.estimateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Job Cards' && (
          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-[#f8f9fa] sticky top-0 z-10">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      onChange={() => {}}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Job Card No.</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Job Card Type</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Reference No#</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Start Date</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">End Date</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">EST. Time</th>
                  <th className="px-4 py-3 text-left text-[13px] font-bold text-[#6b778c] whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {corrugatorJobData.map((item, idx) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/production/job-card/${item.id}`)}
                    className={`border-b border-gray-100 transition-colors cursor-pointer
                      ${selectedRows.includes(item.id) ? 'bg-blue-50' : idx % 2 === 0 ? 'bg-white' : 'bg-[#fcfcfc]'}`}
                  >
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleRow(item.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[13px] text-blue-500 hover:underline cursor-pointer font-medium whitespace-nowrap">
                        {item.jobCardNo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium whitespace-nowrap">{item.jobCardType}</td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium uppercase">{item.reference}</td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium whitespace-nowrap">{item.startDate}</td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium whitespace-nowrap">{item.endDate}</td>
                    <td className="px-4 py-3 text-[13px] text-[#1a233a] font-medium">{item.time}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[12px] font-medium whitespace-nowrap ${
                        item.status === 'Released' ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#ffedd5] text-[#c2410c]'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </main>
  );
};

export default ProductionPage;
