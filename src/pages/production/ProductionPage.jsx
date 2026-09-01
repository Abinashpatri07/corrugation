import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, MoreHorizontal, ChevronDown } from 'lucide-react';

const tabs = ['Manufacturing', 'Corrugator Job', 'QC'];

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
    date: '30/06/2026',
    moNumber: 'MO-2026-000124',
    reference: 'REF-2026-000874',
    customer: 'Sunrise Packaging Solutions Pvt. Ltd.',
    quantity: '15,000 Boxes',
    planStarted: '24/07/2026',
    planEnded: '28/07/2026',
    status: 'Complete'
  }
];

const corrugatorJobData = [
  {
    id: 'JC-001',
    date: '30/06/2026',
    jobCard: 'JC-2026-000124',
    reference: 'REF-000001',
    startDate: '10/07/2026',
    endDate: '30/06/2026',
    time: '13.56',
    downtime: '18.58'
  }
];

const ProductionPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Manufacturing');
  const [mfgActiveTab, setMfgActiveTab] = useState('Manufacturing Order');
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-white">
      
      {/* ── Sub Navigation ── */}
      <div className="border-b border-gray-200 bg-white px-6">
        <nav className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1 px-4 py-4 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Scrollable Form Body ── */}
      <div className="flex-1 overflow-y-auto bg-[#f4f7f9] p-6 lg:p-8">
        <div className="flex flex-col h-full space-y-6">


          {activeTab === 'Manufacturing' && (
            <>

              {mfgActiveTab === 'Manufacturing Order' && (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between pt-2">
                    <h1 className="text-[22px] font-bold text-[#1a233a]">
                      All Manufacturing Order
                    </h1>
                    <div className="flex items-center gap-2">

                      <button className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 bg-gray-50">
                        <Filter className="w-4 h-4" />
                      </button>
                      <button className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 bg-gray-50">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-[#f8f9fa]">
                          <th className="w-10 px-4 py-3">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              onChange={() => {}}
                            />
                          </th>
                          <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Date</th>
                          <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Manufacturing Order</th>
                          <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Reference#</th>
                          <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Customer</th>
                          <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Quantity</th>
                          <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Plan Started</th>
                          <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Plan Ended</th>
                          <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Status</th>
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
                            <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(item.id)}
                                onChange={() => toggleRow(item.id)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                            </td>
                            <td className="px-4 py-4 text-[13px] text-gray-700 whitespace-nowrap">{item.date}</td>
                            <td className="px-4 py-4">
                              <span className="text-[13px] text-blue-500 hover:underline cursor-pointer font-medium whitespace-nowrap">
                                {item.moNumber}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-[13px] text-gray-700">{item.reference}</td>
                            <td className="px-4 py-4 text-[13px] text-gray-700">{item.customer}</td>
                            <td className="px-4 py-4 text-[13px] text-gray-700 whitespace-nowrap">{item.quantity}</td>
                            <td className="px-4 py-4 text-[13px] text-gray-700 whitespace-nowrap">{item.planStarted}</td>
                            <td className="px-4 py-4 text-[13px] text-gray-700 whitespace-nowrap">{item.planEnded}</td>
                            <td className="px-4 py-4">
                              <span className={`px-2 py-0.5 rounded-full text-[12px] font-medium whitespace-nowrap ${
                                item.status === 'Complete' ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === 'Corrugator Job' && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-[22px] font-bold text-[#1a233a]">
                  All Job Cards
                </h1>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2 rounded-md transition-colors">
                    <Plus className="w-4 h-4" />
                    New
                  </button>
                  <button className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 bg-gray-50">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 bg-gray-50">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-[#f8f9fa]">
                      <th className="w-10 px-4 py-3">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          onChange={() => {}}
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Date</th>
                      <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Job Card</th>
                      <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Reference No#</th>
                      <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Start Date</th>
                      <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">End Date</th>
                      <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Time</th>
                      <th className="px-4 py-3 text-left text-[12px] font-bold text-[#1a233a] whitespace-nowrap">Downtime</th>
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
                        <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleRow(item.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-4 text-[13px] text-gray-700 whitespace-nowrap">{item.date}</td>
                        <td className="px-4 py-4">
                          <span className="text-[13px] text-blue-500 hover:underline cursor-pointer font-medium whitespace-nowrap">
                            {item.jobCard}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-[13px] text-gray-700 uppercase">{item.reference}</td>
                        <td className="px-4 py-4 text-[13px] text-gray-700 whitespace-nowrap">{item.startDate}</td>
                        <td className="px-4 py-4 text-[13px] text-gray-700 whitespace-nowrap">{item.endDate}</td>
                        <td className="px-4 py-4 text-[13px] text-gray-700 font-medium">{item.time}</td>
                        <td className="px-4 py-4 text-[13px] text-gray-700">{item.downtime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </div>
      </div>
    </main>
  );
};

export default ProductionPage;
