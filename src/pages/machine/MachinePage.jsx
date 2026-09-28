import React, { useState } from 'react';
import { Plus, MoreHorizontal, ChevronDown, MapPin } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

/*
 * =========================================================
 * DUMMY MACHINE DATA
 * =========================================================
 * This is temporary data.
 * Later this will be replaced with backend/API data.
 * =========================================================
 */
const machineData = [
  {
    id: 1,
    machineCode: 'MC-001',
    machineName: 'Corrugator Line 1',
    location: 'Plant A - Bay 1',
    capacity: '160 Hrs',
    oee: 84,
    nextMaintenance: '14 Oct 2026',
    status: 'Running',
  },
  {
    id: 2,
    machineCode: 'MC-002',
    machineName: 'Flexo Printer 2',
    location: 'Plant A - Bay 2',
    capacity: '160 Hrs',
    oee: 54,
    nextMaintenance: '28 Oct 2026',
    status: 'Idle',
  },
  {
    id: 3,
    machineCode: 'MC-003',
    machineName: 'Die Cutter 1',
    location: 'Plant A - Bay 3',
    capacity: '160 Hrs',
    oee: 31,
    nextMaintenance: 'Overdue',
    status: 'Down',
  },
  {
    id: 4,
    machineCode: 'MC-004',
    machineName: 'Stitching Machine 4',
    location: 'Plant B - Bay 1',
    capacity: '144 Hrs',
    oee: 76,
    nextMaintenance: 'In Progress',
    status: 'Maintenance',
  },
  {
    id: 5,
    machineCode: 'MC-005',
    machineName: 'Folder Gluer 5',
    location: 'Plant B - Bay 2',
    capacity: '152 Hrs',
    oee: 88,
    nextMaintenance: '05 Nov 2026',
    status: 'Running',
  },
  {
    id: 6,
    machineCode: 'MC-006',
    machineName: 'Paper Cutting Machine',
    location: 'Plant B - Bay 3',
    capacity: '150 Hrs',
    oee: 72,
    nextMaintenance: '12 Nov 2026',
    status: 'Running',
  },
  {
    id: 7,
    machineCode: 'MC-007',
    machineName: 'Lamination Machine',
    location: 'Plant C - Bay 1',
    capacity: '168 Hrs',
    oee: 81,
    nextMaintenance: '20 Nov 2026',
    status: 'Running',
  },
  {
    id: 8,
    machineCode: 'MC-008',
    machineName: 'Slotting Machine',
    location: 'Plant C - Bay 2',
    capacity: '160 Hrs',
    oee: 67,
    nextMaintenance: '25 Nov 2026',
    status: 'Idle',
  },
];


/*
 * =========================================================
 * OEE PROGRESS BAR
 * =========================================================
 */
const ProgressBar = ({ value }) => {
  let color = 'bg-[#16a34a]';

  if (value < 50) {
    color = 'bg-[#dc2626]';
  } else if (value < 75) {
    color = 'bg-[#d97706]';
  }

  return (
    <div className="w-14 h-1.5 bg-gray-200 rounded-full mt-1">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};


/*
 * =========================================================
 * MACHINE STATUS PILL
 * =========================================================
 */
const StatusPill = ({ status }) => {
  let config = {
    bg: 'bg-[#dcfce7]',
    text: 'text-[#16a34a]',
    dot: 'bg-[#16a34a]',
  };

  if (status === 'Idle') {
    config = {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      dot: 'bg-orange-500',
    };
  }

  if (status === 'Down') {
    config = {
      bg: 'bg-red-50',
      text: 'text-red-600',
      dot: 'bg-red-500',
    };
  }

  if (status === 'Maintenance') {
    config = {
      bg: 'bg-purple-50',
      text: 'text-[#7c3aed]',
      dot: 'bg-[#7c3aed]',
    };
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${config.bg} ${config.text}`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
      ></div>

      {status}
    </div>
  );
};


/*
 * =========================================================
 * MACHINE PAGE
 * =========================================================
 */
const MachinePage = () => {
  const navigate = useNavigate();

  /*
   * Selected machine IDs
   */
  const [selectedMachines, setSelectedMachines] = useState([]);


  /*
   * =======================================================
   * SELECT / UNSELECT INDIVIDUAL MACHINE
   * =======================================================
   */
  const handleSelectMachine = (machineId) => {
    setSelectedMachines((prev) => {
      if (prev.includes(machineId)) {
        return prev.filter((id) => id !== machineId);
      }

      return [...prev, machineId];
    });
  };


  /*
   * =======================================================
   * SELECT / UNSELECT ALL MACHINES
   * =======================================================
   */
  const handleSelectAll = () => {
    if (selectedMachines.length === machineData.length) {
      setSelectedMachines([]);
    } else {
      setSelectedMachines(
        machineData.map((machine) => machine.id)
      );
    }
  };


  const allSelected =
    machineData.length > 0 &&
    selectedMachines.length === machineData.length;


  return (
    <main className="flex-1 overflow-y-auto bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5">

      {/* =====================================================
          PAGE TOOLBAR
          ===================================================== */}
      <div className="flex items-center justify-between px-8 py-3 bg-white border border-gray-200 rounded-xl shadow-sm shrink-0">

        {/* Page Title */}
        <div className="flex items-center space-x-1 cursor-pointer">

          <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            All Machine
          </h2>

          <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />

        </div>


        {/* Right Side */}
        <div className="flex items-center space-x-3">

          <Link
            to="/machine/new"
            className="bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center transition-opacity shadow-sm"
          >

            <Plus
              className="w-3 h-3 mr-1"
              strokeWidth={2.5}
            />

            New

          </Link>


          <button
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <MoreHorizontal
              className="w-4 h-4"
              strokeWidth={2}
            />
          </button>

        </div>

      </div>


      {/* =====================================================
          TABLE AREA
          ===================================================== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">

        <div className="flex-1 overflow-x-auto w-full">

          <table className="w-full text-left border-collapse whitespace-nowrap">

            {/* =================================================
                TABLE HEADER
                ================================================= */}
            <thead>

              <tr className="bg-[#f4f6f8] border-b border-gray-200 text-sm">

                {/* CHECKBOX */}
                <th className="py-3 pl-4 pr-3 font-bold text-[#6b778c] w-12 text-center">

                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                  />

                </th>


                {/* MACHINE CODE */}
                <th className="py-4 px-3 font-bold text-[#6b778c]">
                  Machine Code
                </th>


                {/* MACHINE NAME */}
                <th className="py-4 px-3 font-bold text-[#6b778c]">
                  Machine Name
                </th>


                {/* LOCATION */}
                <th className="py-4 px-3 font-bold text-[#6b778c]">
                  Location
                </th>


                {/* CAPACITY */}
                <th className="py-4 px-3 font-bold text-[#6b778c]">
                  Capacity
                </th>


                {/* OEE */}
                <th className="py-4 px-3 font-bold text-[#6b778c]">
                  OEE
                </th>


                {/* NEXT MAINTENANCE */}
                <th className="py-4 px-3 font-bold text-[#6b778c]">
                  Next Maintenance
                </th>


                {/* STATUS */}
                <th className="py-4 pr-4 pl-3 font-bold text-[#6b778c]">
                  Status
                </th>

              </tr>

            </thead>


            {/* =================================================
                TABLE BODY
                ================================================= */}
            <tbody>

              {machineData.map((machine) => (

                <tr
                  key={machine.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px]"
                >

                  {/* =================================================
                      CHECKBOX
                      ================================================= */}
                  <td
                    className="py-4 pl-4 pr-3 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >

                    <input
                      type="checkbox"
                      checked={selectedMachines.includes(machine.id)}
                      onChange={() =>
                        handleSelectMachine(machine.id)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                    />

                  </td>


                  {/* =================================================
                      MACHINE CODE
                      ================================================= */}
                  <td
                    onClick={() =>
                      navigate(`/machine/${machine.id}`)
                    }
                    className="py-4 px-3 text-blue-600 font-medium cursor-pointer hover:underline"
                  >

                    {machine.machineCode}

                  </td>


                  {/* =================================================
                      MACHINE NAME
                      ================================================= */}
                  <td
                    onClick={() =>
                      navigate(`/machine/${machine.id}`)
                    }
                    className="py-4 px-3 text-[#1a233a] font-medium cursor-pointer"
                  >

                    {machine.machineName}

                  </td>


                  {/* =================================================
                      LOCATION
                      ================================================= */}
                  <td className="py-4 px-3 text-[#1a233a] font-medium">

                    <div className="flex items-center gap-1.5">

                      <MapPin className="w-3.5 h-3.5 text-gray-400" />

                      <span>
                        {machine.location}
                      </span>

                    </div>

                  </td>


                  {/* =================================================
                      CAPACITY
                      ================================================= */}
                  <td className="py-4 px-3 text-[#1a233a] font-medium">

                    {machine.capacity}

                  </td>


                  {/* =================================================
                      OEE
                      ================================================= */}
                  <td className="py-4 px-3">

                    <div className="flex flex-col">

                      <span className="text-[#1a233a] font-medium">
                        {machine.oee}%
                      </span>

                      <ProgressBar
                        value={machine.oee}
                      />

                    </div>

                  </td>


                  {/* =================================================
                      NEXT MAINTENANCE
                      ================================================= */}
                  <td className="py-4 px-3 text-[#1a233a] font-medium">

                    {machine.nextMaintenance === 'Overdue' ? (

                      <span className="text-red-500 font-medium">
                        {machine.nextMaintenance}
                      </span>

                    ) : machine.nextMaintenance === 'In Progress' ? (

                      <span className="text-purple-600 font-medium">
                        {machine.nextMaintenance}
                      </span>

                    ) : (

                      <span>
                        {machine.nextMaintenance}
                      </span>

                    )}

                  </td>


                  {/* =================================================
                      STATUS
                      ================================================= */}
                  <td className="py-4 pr-4 pl-3">

                    <StatusPill
                      status={machine.status}
                    />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* =====================================================
            FOOTER
            ===================================================== */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white text-xs text-gray-500 flex justify-between items-center mt-auto">

          <span>
            Showing {machineData.length} of {machineData.length} machine(s)
          </span>

          <div className="flex items-center gap-2">

            <button
              disabled
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Previous
            </button>

            <span>
              Page 1 of 1
            </span>

            <button
              disabled
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </main>
  );
};

export default MachinePage;