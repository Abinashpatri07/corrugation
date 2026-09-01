import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, MoreHorizontal, ChevronDown, MapPin, Eye, MoreVertical } from 'lucide-react';

const machineData = [
  {
    id: 1,
    machineId: 'MC-001',
    name: 'Corrugator Line 1',
    type: 'Corrugation',
    location: 'Plant A - Bay 1',
    status: 'Running',
    plannedHrs: 160,
    workingHrs: 148,
    downtime: 12,
    utilization: 92,
    oee: 84,
    nextMaintenance: '14 Sep 2026',
    maintenanceStatus: 'normal'
  },
  {
    id: 2,
    machineId: 'MC-002',
    name: 'Flexo Printer 2',
    type: 'Printing',
    location: 'Plant A - Bay 2',
    status: 'Idle',
    plannedHrs: 160,
    workingHrs: 101,
    downtime: 32,
    utilization: 63,
    oee: 54,
    nextMaintenance: '28 Aug 2026',
    maintenanceStatus: 'normal'
  },
  {
    id: 3,
    machineId: 'MC-003',
    name: 'Die Cutter 1',
    type: 'Die-cutting',
    location: 'Plant A - Bay 3',
    status: 'Down',
    plannedHrs: 160,
    workingHrs: 62,
    downtime: 98,
    utilization: 39,
    oee: 31,
    nextMaintenance: 'Overdue - 2 days',
    maintenanceStatus: 'overdue'
  },
  {
    id: 4,
    machineId: 'MC-004',
    name: 'Stitching Machine 4',
    type: 'Finishing',
    location: 'Plant B - Bay 1',
    status: 'Maintenance',
    plannedHrs: 144,
    workingHrs: 120,
    downtime: 24,
    utilization: 83,
    oee: 76,
    nextMaintenance: 'In progress',
    maintenanceStatus: 'in-progress'
  }
];

const ProgressBar = ({ value }) => {
  let color = 'bg-[#16a34a]'; // green
  if (value < 50) color = 'bg-[#dc2626]'; // red
  else if (value < 75) color = 'bg-[#d97706]'; // orange

  return (
    <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1.5">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  );
};

const StatusPill = ({ status }) => {
  let config = { bg: 'bg-[#dcfce7]', text: 'text-[#16a34a]', dot: 'bg-[#16a34a]' };
  if (status === 'Idle') config = { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-500' };
  if (status === 'Down') config = { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' };
  if (status === 'Maintenance') config = { bg: 'bg-purple-50', text: 'text-[#7c3aed]', dot: 'bg-[#7c3aed]' };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold ${config.bg} ${config.text}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></div>
      {status}
    </div>
  );
};

const MachinePage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-1 overflow-hidden bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5">

      {/* Page Toolbar (Exact Match to CustomerPage) */}
      <div className="flex items-center justify-between px-8 py-3 bg-white border border-gray-200 rounded-xl shadow-sm shrink-0">
        <div className="flex items-center space-x-1 cursor-pointer">
          <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            All Machine
          </h2>
          <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/machine/new"
            className="bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center transition-opacity shadow-sm"
          >
            <Plus className="w-3 h-3 mr-1" strokeWidth={2.5} />
            New
          </Link>
          <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors">
            <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Table Container (Exact Match to CustomerPage) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 pb-8 w-full overflow-auto">
          <div className="w-full">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 shadow-sm">
                <tr className="bg-[#f4f6f8] border-b border-gray-200 text-sm">
                  <th className="py-3 px-3 pl-6 font-bold text-[#6b778c] whitespace-nowrap">Machine</th>
                  <th className="py-3 px-3 font-bold text-[#6b778c] whitespace-nowrap">Location</th>
                  <th className="py-3 px-3 font-bold text-[#6b778c] whitespace-nowrap">Status</th>
                  <th className="py-3 px-3 font-bold text-[#6b778c] whitespace-nowrap">Planned Hrs</th>
                  <th className="py-3 px-3 font-bold text-[#6b778c] whitespace-nowrap">Working Hrs</th>
                  <th className="py-3 px-3 font-bold text-[#6b778c] whitespace-nowrap">Downtime</th>
                  <th className="py-3 px-3 font-bold text-[#6b778c] whitespace-nowrap">Utilization</th>
                  <th className="py-3 px-3 font-bold text-[#6b778c] whitespace-nowrap">OEE</th>
                  <th className="py-3 px-3 font-bold text-[#6b778c] whitespace-nowrap">Next Maintenance</th>
                  <th className="py-3 px-3 pr-6 font-bold text-[#6b778c] whitespace-nowrap"></th>
                </tr>
              </thead>
              <tbody>
                {machineData.map(machine => (
                  <tr
                    key={machine.id}
                    onClick={() => navigate(`/machine/${machine.id}`)}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px] cursor-pointer"
                  >
                    <td className="py-2 px-3 pl-6">
                      <div className="flex flex-col">
                        <span className="text-[13px] text-blue-600 hover:underline cursor-pointer font-medium">{machine.machineId}</span>
                        <span className="text-[#1a233a] font-medium mt-0.5 whitespace-nowrap">{machine.name}</span>
                        <span className="text-gray-500 mt-0.5 whitespace-nowrap">{machine.type}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-[#1a233a] font-medium whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{machine.location}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <StatusPill status={machine.status} />
                    </td>
                    <td className="py-2 px-3 text-[#1a233a] font-medium whitespace-nowrap">
                      {machine.plannedHrs} <span className="text-gray-400 font-normal">hrs</span>
                    </td>
                    <td className="py-2 px-3 text-[#1a233a] font-medium whitespace-nowrap">
                      {machine.workingHrs} <span className="text-gray-400 font-normal">hrs</span>
                    </td>
                    <td className="py-2 px-3 font-medium whitespace-nowrap">
                      <span className={`${machine.downtime > 50 ? 'text-red-500' : machine.downtime > 20 ? 'text-orange-500' : 'text-[#1a233a]'}`}>
                        {machine.downtime} <span className="font-normal text-gray-400">hrs</span>
                      </span>
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-[#1a233a] font-medium">{machine.utilization}%</span>
                        <ProgressBar value={machine.utilization} />
                      </div>
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-[#1a233a] font-medium">{machine.oee}%</span>
                        <ProgressBar value={machine.oee} />
                      </div>
                    </td>
                    <td className="py-2 px-3 font-medium whitespace-nowrap">
                      <span className={`${machine.maintenanceStatus === 'overdue' ? 'text-[#ef4444]' : machine.maintenanceStatus === 'in-progress' ? 'text-gray-400 font-normal' : 'text-[#1a233a]'}`}>
                        {machine.nextMaintenance}
                      </span>
                    </td>
                    <td className="py-2 px-3 pr-6 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/machine/${machine.id}`);
                          }}
                          className="p-1.5 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white text-xs text-gray-500 flex justify-between items-center mt-auto">
          <span>Showing {machineData.length} machine(s)</span>
        </div>
      </div>

    </main>
  );
};

export default MachinePage;
