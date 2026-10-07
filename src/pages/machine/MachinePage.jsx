import React, { useEffect, useState } from 'react';
import { Plus, MoreHorizontal, ChevronDown, MapPin } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import { getMachines } from "../../services/machineListApi";
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
=========================================================
MACHINE DATA FROM BACKEND
=========================================================
*/

  const [machineData, setMachineData] = useState([]);


  /*
  =========================================================
  LOADING STATE
  =========================================================
  */

  const [loading, setLoading] = useState(true);


  /*
  =========================================================
  ERROR STATE
  =========================================================
  */

  const [error, setError] = useState('');

  /*
   * Selected machine IDs
   */
  const [selectedMachines, setSelectedMachines] = useState([]);

  /*
=========================================================
LOAD MACHINES FROM BACKEND
=========================================================
*/

  useEffect(() => {

    const loadMachines = async () => {

      try {

        setLoading(true);

        setError('');

        const machines = await getMachines();

        setMachineData(machines);

      } catch (error) {

        console.error(
          'Failed to load machines:',
          error
        );

        setError(
          error.message ||
          'Failed to load machines'
        );

      } finally {

        setLoading(false);
      }
    };


    loadMachines();

  }, []);


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

              {/* =====================================================
        LOADING
    ===================================================== */}

              {loading && (

                <tr>

                  <td
                    colSpan="8"
                    className="py-10 text-center text-[13px] text-gray-500"
                  >
                    Loading machines...
                  </td>

                </tr>

              )}


              {/* =====================================================
        ERROR
    ===================================================== */}

              {!loading && error && (

                <tr>

                  <td
                    colSpan="8"
                    className="py-10 text-center text-[13px] text-red-500"
                  >
                    {error}
                  </td>

                </tr>

              )}


              {/* =====================================================
        NO DATA
    ===================================================== */}

              {!loading &&
                !error &&
                machineData.length === 0 && (

                  <tr>

                    <td
                      colSpan="8"
                      className="py-10 text-center text-[13px] text-gray-500"
                    >
                      No machines found
                    </td>

                  </tr>

                )
              }


              {/* =====================================================
        MACHINE DATA FROM BACKEND
    ===================================================== */}

              {!loading &&
                !error &&
                machineData.map((machine) => (

                  <tr
                    key={
                      machine.machine_id ??
                      machine.machineId ??
                      machine.id
                    }
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-[13px]"
                  >

                    {/* CHECKBOX */}

                    <td
                      className="py-4 pl-4 pr-3 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >

                      <input
                        type="checkbox"
                        checked={selectedMachines.includes(
                          machine.machine_id ??
                          machine.machineId ??
                          machine.id
                        )}
                        onChange={() =>
                          handleSelectMachine(
                            machine.machine_id ??
                            machine.machineId ??
                            machine.id
                          )
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />

                    </td>


                    {/* MACHINE CODE */}

                    <td
                      onClick={() =>
                        navigate(
                          `/machine/${machine.machine_id ??
                          machine.machineId ??
                          machine.id
                          }`
                        )
                      }

                      className="py-4 px-3 text-blue-600 font-medium cursor-pointer hover:underline"
                    >
                      {machine.machineCode}
                    </td>


                    {/* MACHINE NAME */}

                    < td
                      onClick={() =>
                        navigate(
                          `/machine/${machine.machine_id ??
                          machine.machineId ??
                          machine.id
                          }`
                        )
                      }

                      className="py-4 px-3 text-[#1a233a] font-medium cursor-pointer"
                    >
                      {machine.machineName}
                    </td>


                    {/* LOCATION */}

                    <td className="py-4 px-3 text-[#1a233a] font-medium">

                      <div className="flex items-center gap-1.5">

                        <MapPin
                          className="w-3.5 h-3.5 text-gray-400"
                        />

                        <span>
                          {machine.location}
                        </span>

                      </div>

                    </td>


                    {/* CAPACITY */}

                    <td className="py-4 px-3 text-[#1a233a] font-medium">

                      {machine.capacity}

                    </td>


                    {/* OEE */}

                    <td className="py-4 px-3">

                      {machine.oee !== null &&
                        machine.oee !== undefined ? (

                        <div className="flex flex-col">

                          <span className="text-[#1a233a] font-medium">
                            {machine.oee}%
                          </span>

                          <ProgressBar
                            value={machine.oee}
                          />

                        </div>

                      ) : (

                        <span className="text-gray-400">
                          -
                        </span>

                      )}

                    </td>


                    {/* NEXT MAINTENANCE */}

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


                    {/* STATUS */}

                    <td className="py-4 pr-4 pl-3">

                      <StatusPill
                        status={machine.status}
                      />

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>


        {/* =====================================================
            FOOTER
            ===================================================== */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white text-xs text-gray-500 flex justify-between items-center mt-auto">

          <span>
            Showing {machineData.length} machine(s)
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

      </div >

    </main >
  );
};

export default MachinePage;