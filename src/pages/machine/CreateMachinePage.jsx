import React, { useState, useEffect } from 'react';
import { createMachine } from '../../services/createMachineApi';

import { Mail, ChevronDown, Bookmark, Globe, Check, UploadCloud, Copy, Receipt, Package, Plus, Settings, UserCheck, Box, Eye, Trash2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateMachinePage = () => {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState('Business');
  const [activeTab, setActiveTab] = useState('Technical Specification');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // =====================================================
  // DUMMY SERVICE PROVIDERS
  // These are independent from the Vendor module.
  // =====================================================

  const serviceProviders = [
    {
      id: 'SP-001',
      name: 'Priya Nair'
    },
    {
      id: 'SP-002',
      name: 'Amit Verma'
    },
    {
      id: 'SP-003',
      name: 'Manoj Reddy'
    },
    {
      id: 'SP-004',
      name: 'Anita Gupta'
    },
    {
      id: 'SP-005',
      name: 'Vikram Singh'
    },
    {
      id: 'SP-006',
      name: 'Kiran Rao'
    },
    {
      id: 'SP-007',
      name: 'Suresh Patel'
    },
    {
      id: 'SP-008',
      name: 'Rajesh Sharma'
    }
  ];

  const [weeklyOffOpen, setWeeklyOffOpen] = useState(false);

  const handleWeeklyOffOutsideClick = (event) => {
    if (
      !event.target.closest('.weekly-off-dropdown')
    ) {
      setWeeklyOffOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      handleWeeklyOffOutsideClick
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleWeeklyOffOutsideClick
      );
    };
  }, []);

  const [formData, setFormData] = useState({
    machine_status: true,
    machine_code: '',
    machine_name: '',
    description: '',
    machine_category: '',
    machine_type: '',
    location: '',
    brand: '',
    model: '',
    manufacturing_date: '',
    serial_number: '',
    purchasing_date: '',
    purchasing_price: '',
    installation_date: '',
    warranty_period: '',
    department: '',
    monthly_working_day: '',
    working_day: '',
    operator: '',
    weekly_off: [],
    operational_shift: '',
    remark: '',
    power: '',
    voltage: '',
    power: '',
    voltage: '',
    speed: '',
    weight: '',
    capacity: '',
    dimension_l: '',
    dimension_w: '',
    dimension_h: '',
    maint_installation_date: '',
    last_servicing_date: '',
    frequency: '',
    downtime: '',
    downtime_unit: 'Hours',
    service_contract: 'Active',
    vendor_supplier: '',
    contact_person: '',
    designation: '',
    mobile_number: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWeeklyOffChange = (day) => {
    setFormData((prev) => {
      const selectedDays = prev.weekly_off || [];

      if (selectedDays.includes(day)) {
        return {
          ...prev,
          weekly_off: selectedDays.filter(
            (item) => item !== day
          ),
        };
      }

      return {
        ...prev,
        weekly_off: [...selectedDays, day],
      };
    });
  };

  // =====================================================
  // SUBMIT MACHINE FORM
  // =====================================================

  const handleSubmit = async (e) => {

    // Prevent browser from refreshing page
    e.preventDefault();


    try {

      // =================================================
      // PREPARE DATA FOR BACKEND
      // =================================================

      const machineData = {


        // =============================================
        // MACHINE BASIC INFORMATION
        // =============================================

        machine: {

          machine_status:
            formData.machine_status,

          machine_code:
            formData.machine_code,

          machine_name:
            formData.machine_name,

          description:
            formData.description,

          machine_type:
            formData.machine_type,

          machine_category:
            formData.machine_category,

          department:
            formData.department,

          location:
            formData.location,

          brand:
            formData.brand,

          model:
            formData.model,

          manufacturing_date:
            formData.manufacturing_date ||
            null,

          serial_number:
            formData.serial_number ||
            null,

          purchasing_date:
            formData.purchasing_date ||
            null,

          purchasing_price:
            formData.purchasing_price
              ? Number(
                formData.purchasing_price
              )
              : null,

          installation_date:
            formData.installation_date ||
            null,

          warranty_period:
            formData.warranty_period
              ? Number(
                formData.warranty_period
              )
              : null

        },


        // =============================================
        // TECHNICAL SPECIFICATION
        // =============================================

        technical_spec: {

          power:
            formData.power
              ? Number(
                formData.power
              )
              : null,

          power_unit:
            'KW',

          voltage:
            formData.voltage
              ? Number(
                formData.voltage
              )
              : null,

          voltage_unit:
            'V',

          speed:
            formData.speed
              ? Number(
                formData.speed
              )
              : null,

          speed_unit:
            'RPM',

          weight:
            formData.weight
              ? Number(
                formData.weight
              )
              : null,

          weight_unit:
            'KG',

          capacity:
            formData.capacity
              ? Number(
                formData.capacity
              )
              : null,

          dimension_l:
            formData.dimension_l
              ? Number(
                formData.dimension_l
              )
              : null,

          dimension_w:
            formData.dimension_w
              ? Number(
                formData.dimension_w
              )
              : null,

          dimension_h:
            formData.dimension_h
              ? Number(
                formData.dimension_h
              )
              : null

        },


        // =============================================
        // OPERATIONAL SPECIFICATION
        // =============================================

        operational_spec: {

          monthly_working_days:
            formData.monthly_working_day
              ? Number(
                formData.monthly_working_day
              )
              : null,

          weekly_off_days:
            formData.weekly_off
              ? Number(
                formData.weekly_off
              )
              : null,

          working_days:
            formData.working_day
              ? Number(
                formData.working_day
              )
              : null,

          operational_shifts:
            formData.operational_shift
              ? Number(
                formData.operational_shift
              )
              : null,

          operator_count:
            formData.operator
              ? Number(
                formData.operator
              )
              : null,

          remarks:
            formData.remark ||
            null

        },


        // =============================================
        // SERVICE CONTRACT
        // =============================================

        // =============================================
        // SERVICE CONTRACT
        // =============================================

        service_contract: {

          service_contract_status:
            formData.service_contract === 'Active'
              ? 'ACTIVE'
              : 'INACTIVE',

          service_provider: formData.vendor_supplier || null,

          contact_person:
            formData.contact_person || null,

          designation:
            formData.designation || null,

          mobile_number:
            formData.mobile_number || null,

          email:
            formData.email || null,

          service_frequency_days:
            formData.frequency
              ? Number(formData.frequency)
              : null

        },


        // =============================================
        // MAINTENANCE
        // =============================================

        maintenance: {

          maint_installation_date:
            formData.maint_installation_date || null,

          last_servicing_date:
            formData.last_servicing_date || null,

          frequency:
            formData.frequency
              ? Number(formData.frequency)
              : null,

          downtime:
            formData.downtime
              ? Number(formData.downtime)
              : null,

          downtime_unit:
            formData.downtime_unit || 'Hours'

        }

      };


      // =================================================
      // SEND DATA TO BACKEND
      // =================================================

      console.log(
        'Sending machine data:',
        machineData
      );


      const result =
        await createMachine(
          machineData
        );


      // =================================================
      // SUCCESS
      // =================================================

      console.log(
        'Machine created successfully:',
        result
      );


      // Show your existing success modal
      setShowSuccessModal(
        true
      );


    } catch (error) {

      // =================================================
      // ERROR
      // =================================================

      console.error(
        'Error creating machine:',
        error
      );


      alert(
        error.message ||
        'Failed to create machine'
      );

    }

  };


  const tabs = ['Technical Specification', 'Operational Specification', 'Maintenance', 'Document'];

  return (
    <main className="flex-1 overflow-y-auto bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5">

      {/* Top Banner with Stepper */}
      <div className="bg-white px-6 py-2 md:px-8 md:py-2 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
        <h2 className="text-[20px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
          Create New Machine Profile
        </h2>

        <div className="flex items-start mr-4 w-72">
          {/* Step 1 */}
          <div className="flex flex-col items-center flex-shrink-0 w-24">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff3b30] to-[#b82db8] text-white flex items-center justify-center shadow-md relative z-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <span className="text-[12px] font-semibold text-gray-700 mt-2 whitespace-nowrap">Create Machine</span>
          </div>

          {/* Connecting line */}
          <div className="flex-1 h-[2px] bg-gradient-to-r from-[#b82db8] to-[#ff3b30] mt-4 -mx-8 z-0"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center flex-shrink-0 w-24">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center shadow-sm relative z-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <polyline points="16 11 18 13 22 9" />
              </svg>
            </div>
            <span className="text-[12px] font-medium text-gray-500 mt-2 whitespace-nowrap">Machine Onboarding</span>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pt-5 pb-24 md:px-8 md:pt-6">
          <form id="machine-form" className="max-w-6xl" onSubmit={handleSubmit}>
            {/* Top Section - Status */}
            <div className="flex justify-end mb-4">
              <div className="flex items-center space-x-2.5">
                <span className="text-[13px] font-bold text-[#1a233a]">Machine Status <span className="text-red-500">*</span></span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.machine_status}
                    onChange={(e) => setFormData({ ...formData, machine_status: e.target.checked })}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#22c55e]"></div>
                </label>
                <span className="text-[13px] text-gray-600 font-medium">{formData.machine_status ? 'Active' : 'Inactive'}</span>
              </div>
            </div>

            {/* Main Form Fields */}
            <div className="flex flex-col space-y-4">

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-center min-w-0">
                  <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Machine Code <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter Machine Code" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" name="machine_code" value={formData.machine_code} onChange={handleChange} required />
                </div>
                <div className="flex items-center min-w-0">
                  <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Machine Name <span className="text-red-500">*</span></label>
                  <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" name="machine_name" value={formData.machine_name} onChange={handleChange} required />
                </div>
              </div>

              {/* Row 2 - Full Width Description */}
              <div className="flex flex-col min-w-0 pt-0.5">
                <label className="text-[13px] font-bold text-[#1a233a] shrink-0 mb-1">Description</label>
                <div className="relative">
                  <textarea
                    rows="2"
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={500}
                  ></textarea>
                  <div className="text-right text-[11px] text-gray-400 mt-0.5">
                    {formData.description.length} / 500 Character
                  </div>
                </div>
              </div>

              {/* Grid for remaining fields */}
              {/* =========================================================
                    MACHINE INFORMATION
                    Two-column layout
                ========================================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 pt-2">

                {/* =====================================================
                      ROW 1
                      Machine Category | Location
                  ===================================================== */}

                {/* Machine Category */}
                <div className="flex items-center min-w-0 order-[1]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Machine Category
                  </label>

                  <div className="relative flex-1 min-w-0">

                    <select
                      name="machine_category"
                      value={formData.machine_category}
                      onChange={handleChange}
                      className="w-full h-[40px] border border-gray-200 rounded-md px-3 text-[13px] text-gray-600 bg-white shadow-sm focus:outline-none focus:border-blue-500 appearance-none"
                    >

                      <option value="" disabled>
                        Select Category
                      </option>

                      <option value="Production">
                        Production
                      </option>

                      <option value="Packaging">
                        Packaging
                      </option>

                      <option value="Printing">
                        Printing
                      </option>

                      <option value="Converting">
                        Converting
                      </option>

                      <option value="Utility">
                        Utility
                      </option>

                    </select>

                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />

                  </div>

                </div>


                {/* Location */}
                <div className="flex items-center min-w-0 order-[4]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Location <span className="text-red-500">*</span>
                  </label>

                  <div className="relative flex-1 min-w-0">

                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full h-[40px] border border-gray-200 rounded-md px-3 text-[13px] text-gray-600 bg-white shadow-sm focus:outline-none focus:border-blue-500 appearance-none"
                    >

                      <option value="" disabled>
                        Select Location
                      </option>

                      <option value="Plant A - Bay 1">
                        Plant A - Bay 1
                      </option>

                      <option value="Plant A - Bay 2">
                        Plant A - Bay 2
                      </option>

                      <option value="Plant A - Bay 3">
                        Plant A - Bay 3
                      </option>

                      <option value="Plant B - Bay 1">
                        Plant B - Bay 1
                      </option>

                      <option value="Plant B - Bay 2">
                        Plant B - Bay 2
                      </option>

                      <option value="Plant B - Bay 3">
                        Plant B - Bay 3
                      </option>

                      <option value="Plant C - Bay 1">
                        Plant C - Bay 1
                      </option>

                      <option value="Plant C - Bay 2">
                        Plant C - Bay 2
                      </option>

                    </select>

                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />

                  </div>

                </div>


                {/* =====================================================
                      ROW 2
                      Machine Type | Model
                  ===================================================== */}

                {/* Machine Type */}
                <div className="flex items-center min-w-0 order-[2]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Machine Type <span className="text-red-500">*</span>
                  </label>

                  <div className="relative flex-1 min-w-0">

                    <select
                      name="machine_type"
                      value={formData.machine_type}
                      onChange={handleChange}
                      required
                      className="w-full h-[40px] border border-gray-200 rounded-md px-3 text-[13px] text-gray-600 bg-white shadow-sm focus:outline-none focus:border-blue-500 appearance-none"
                    >

                      <option value="" disabled>
                        Select Type
                      </option>

                      <option value="Corrugator">
                        Corrugator
                      </option>

                    </select>

                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />

                  </div>

                </div>


                {/* Model */}
                <div className="flex items-center min-w-0 order-[6]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Model
                  </label>

                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Enter Model"
                    className="flex-1 min-w-0 h-[40px] border border-gray-200 rounded-md px-3 text-[13px] bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />

                </div>


                {/* =====================================================
                        ROW 3
                        Brand | Serial Number
                    ===================================================== */}

                {/* Brand */}
                <div className="flex items-center min-w-0 order-[5]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Brand
                  </label>

                  <div className="relative flex-1 min-w-0">

                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full h-[40px] border border-gray-200 rounded-md px-3 text-[13px] text-gray-600 bg-white shadow-sm focus:outline-none focus:border-blue-500 appearance-none"
                    >

                      <option value="" disabled>
                        Select Brand
                      </option>

                      <option value="BHS">
                        BHS
                      </option>

                    </select>

                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />

                  </div>

                </div>


                {/* Serial Number */}
                <div className="flex items-center min-w-0 order-[8]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Serial Number
                  </label>

                  <input
                    type="text"
                    name="serial_number"
                    value={formData.serial_number}
                    onChange={handleChange}
                    placeholder="Enter Serial Number"
                    className="flex-1 min-w-0 h-[40px] border border-gray-200 rounded-md px-3 text-[13px] bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />

                </div>


                {/* =====================================================
                      ROW 4
                      Manufacturing Date | Purchasing Price
                  ===================================================== */}

                {/* Manufacturing Date */}
                <div className="flex items-center min-w-0 order-[7]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Manufacturing Date
                  </label>

                  <input
                    type="date"
                    name="manufacturing_date"
                    value={formData.manufacturing_date}
                    onChange={handleChange}
                    className="flex-1 min-w-0 h-[40px] border border-gray-200 rounded-md px-3 text-[13px] text-gray-500 bg-white shadow-sm focus:outline-none focus:border-blue-500"
                  />

                </div>


                {/* Purchasing Price */}
                <div className="flex items-center min-w-0 order-[10]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Purchasing Price
                  </label>

                  <input
                    type="number"
                    name="purchasing_price"
                    value={formData.purchasing_price}
                    onChange={handleChange}
                    placeholder="Enter Amount"
                    className="flex-1 min-w-0 h-[40px] border border-gray-200 rounded-md px-3 text-[13px] bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />

                </div>


                {/* =====================================================
                      ROW 5
                      Purchasing Date | Warranty Period
                  ===================================================== */}

                {/* Purchasing Date */}
                <div className="flex items-center min-w-0 order-[9]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Purchasing Date
                  </label>

                  <input
                    type="date"
                    name="purchasing_date"
                    value={formData.purchasing_date}
                    onChange={handleChange}
                    className="flex-1 min-w-0 h-[40px] border border-gray-200 rounded-md px-3 text-[13px] text-gray-500 bg-white shadow-sm focus:outline-none focus:border-blue-500"
                  />

                </div>


                {/* Warranty Period */}
                <div className="flex items-center min-w-0 order-[12]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Warranty Period
                  </label>

                  <input
                    type="text"
                    name="warranty_period"
                    value={formData.warranty_period}
                    onChange={handleChange}
                    placeholder="Enter Month"
                    className="flex-1 min-w-0 h-[40px] border border-gray-200 rounded-md px-3 text-[13px] bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />

                </div>


                {/* =====================================================
                      ROW 6
                      Installation Date | Department
                  ===================================================== */}

                {/* Installation Date */}
                <div className="flex items-center min-w-0 order-[11]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Installation Date
                  </label>

                  <input
                    type="date"
                    name="installation_date"
                    value={formData.installation_date}
                    onChange={handleChange}
                    className="flex-1 min-w-0 h-[40px] border border-gray-200 rounded-md px-3 text-[13px] text-gray-500 bg-white shadow-sm focus:outline-none focus:border-blue-500"
                  />

                </div>


                {/* Department */}
                <div className="flex items-center min-w-0 order-[3]">

                  <label className="w-40 shrink-0 text-[13px] font-bold text-[#1a233a]">
                    Department
                  </label>

                  <div className="relative flex-1 min-w-0">

                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full h-[40px] border border-gray-200 rounded-md px-3 text-[13px] text-gray-600 bg-white shadow-sm focus:outline-none focus:border-blue-500 appearance-none"
                    >

                      <option value="" disabled>
                        Select Department
                      </option>

                      <option value="Production">
                        Production
                      </option>

                      <option value="Maintenance">
                        Maintenance
                      </option>

                      <option value="Quality">
                        Quality
                      </option>

                      <option value="Stores">
                        Stores
                      </option>

                      <option value="Engineering">
                        Engineering
                      </option>

                    </select>

                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />

                  </div>

                </div>

              </div>
              <div className="pt-8">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-[14px] font-medium transition-colors relative ${activeTab === tab
                          ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]'
                          : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        {tab}
                        {activeTab === tab && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]"></div>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab content placeholder */}
                <div className="py-6">

                  {/* === TECHNICAL SPECIFICATION TAB === */}
                  {activeTab === 'Technical Specification' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                      {/* Left Column */}
                      <div className="space-y-4 min-w-0">
                        <div className="flex items-center min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Power (HP/KW)</label>
                          <div className="flex-1 flex min-w-0 shadow-sm">
                            <input type="text" placeholder="Enter Power" className="w-full min-w-0 border border-gray-200 rounded-l-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white placeholder-gray-400 focus:z-10 relative" name="power" value={formData.power} onChange={handleChange} />
                            <div className="border border-l-0 border-gray-200 bg-white rounded-r-md px-3 flex items-center justify-center text-[13px] text-gray-600 font-medium shrink-0">
                              KW
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Voltage</label>
                          <div className="flex-1 flex min-w-0 shadow-sm">
                            <input type="text" placeholder="Enter Voltage" className="w-full min-w-0 border border-gray-200 rounded-l-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white placeholder-gray-400 focus:z-10 relative" name="voltage" value={formData.voltage} onChange={handleChange} />
                            <div className="border border-l-0 border-gray-200 bg-white rounded-r-md px-3 flex items-center justify-center text-[13px] text-gray-600 font-medium shrink-0">
                              V
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Capacity</label>
                          <input type="text" placeholder="Enter Capacity" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" name="capacity" value={formData.capacity} onChange={handleChange} />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4 min-w-0">
                        <div className="flex items-center min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Speed</label>
                          <div className="flex-1 flex min-w-0 shadow-sm">
                            <input type="text" placeholder="Enter Speed" className="w-full min-w-0 border border-gray-200 rounded-l-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white placeholder-gray-400 focus:z-10 relative" name="speed" value={formData.speed} onChange={handleChange} />
                            <div className="border border-l-0 border-gray-200 bg-white rounded-r-md px-3 flex items-center justify-center text-[13px] text-gray-600 font-medium shrink-0">
                              RPM
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Weight</label>
                          <input type="number" placeholder="Enter Weight" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" name="weight" value={formData.weight} onChange={handleChange} />
                        </div>

                        <div className="flex items-center min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Dimensions <span className="text-[10px] text-gray-500 font-normal">(L × W × H)</span> <span className="text-red-500">*</span></label>
                          <div className="flex-1 flex items-center min-w-0 space-x-2">
                            <div className="flex-1 relative min-w-0">
                              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                                <Box className="w-3.5 h-3.5 text-gray-400" />
                              </div>
                              <input type="text" placeholder="L" className="w-full border border-gray-200 rounded-md pl-8 pr-2 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" name="dimension_l" value={formData.dimension_l} onChange={handleChange} required />
                            </div>
                            <span className="text-gray-400 text-xs shrink-0">×</span>
                            <div className="flex-1 relative min-w-0">
                              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                                <Box className="w-3.5 h-3.5 text-gray-400" />
                              </div>
                              <input type="text" placeholder="W" className="w-full border border-gray-200 rounded-md pl-8 pr-2 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" name="dimension_w" value={formData.dimension_w} onChange={handleChange} required />
                            </div>
                            <span className="text-gray-400 text-xs shrink-0">×</span>
                            <div className="flex-1 relative min-w-0">
                              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                                <Box className="w-3.5 h-3.5 text-gray-400" />
                              </div>
                              <input type="text" placeholder="H" className="w-full border border-gray-200 rounded-md pl-8 pr-2 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" name="dimension_h" value={formData.dimension_h} onChange={handleChange} required />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* === OPERATIONAL SPECIFICATION TAB === */}
                  {activeTab === 'Operational Specification' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                      {/* Left Column */}
                      <div className="space-y-4 min-w-0">
                        <div className="flex items-center min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Monthly Working Day</label>
                          <input type="text" placeholder="Enter Monthly Working Day" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" name="monthly_working_day" value={formData.monthly_working_day} onChange={handleChange} />
                        </div>

                        <div className="flex items-center min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Working Day</label>
                          <input type="text" placeholder="Enter Working Day" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" name="working_day" value={formData.working_day} onChange={handleChange} />
                        </div>

                        <div className="flex items-center min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Operator</label>
                          <input type="text" placeholder="Enter Operator" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" name="operator" value={formData.operator} onChange={handleChange} />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4 min-w-0">
                        <div className="flex items-center min-w-0">

                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">
                            Weekly Off
                          </label>

                          <div className="relative flex-1 min-w-0 weekly-off-dropdown">

                            <button
                              type="button"
                              onClick={() => setWeeklyOffOpen(!weeklyOffOpen)}
                              className="w-full h-[40px] border border-gray-200 rounded-md px-3 flex items-center justify-between text-[13px] text-gray-600 bg-white shadow-sm"
                            >
                              <span className="truncate">
                                {formData.weekly_off &&
                                  formData.weekly_off.length > 0
                                  ? formData.weekly_off.join(', ')
                                  : 'Select Weekly Off'}
                              </span>

                              <span className="text-gray-400">
                                ▼
                              </span>
                            </button>

                            {weeklyOffOpen && (
                              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-2">

                                {[
                                  'Monday',
                                  'Tuesday',
                                  'Wednesday',
                                  'Thursday',
                                  'Friday',
                                  'Saturday',
                                  'Sunday'
                                ].map((day) => (

                                  <label
                                    key={day}
                                    className="flex items-center gap-2 px-2 py-2 text-[13px] text-gray-700 hover:bg-gray-50 cursor-pointer rounded"
                                  >

                                    <input
                                      type="checkbox"
                                      checked={
                                        formData.weekly_off?.includes(day) || false
                                      }
                                      onChange={() => handleWeeklyOffChange(day)}
                                      className="w-4 h-4"
                                    />

                                    <span>{day}</span>

                                  </label>

                                ))}

                              </div>
                            )}

                          </div>

                        </div>

                        <div className="flex items-center min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">
                            Operational Shift
                          </label>

                          <div className="relative flex-1 min-w-0">
                            <select
                              name="operational_shift"
                              value={formData.operational_shift}
                              onChange={handleChange}
                              className="w-full h-[40px] border border-gray-200 rounded-md px-3 pr-10 text-[13px] text-gray-600 bg-white shadow-sm focus:outline-none focus:border-blue-500 appearance-none"
                            >
                              <option value="" disabled>
                                Select Shift
                              </option>

                              <option value="1">
                                Shift-1 (10:00 AM - 6:00 PM)
                              </option>

                              <option value="2">
                                Shift-2 (6:00 PM - 2:00 AM)
                              </option>

                              <option value="3">
                                Shift-3 (2:00 AM - 10:00 AM)
                              </option>
                            </select>

                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        <div className="flex items-start min-w-0">
                          <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0 mt-2">Remark</label>
                          <textarea rows="3" placeholder="Enter Remark" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none placeholder-gray-400" name="remark" value={formData.remark} onChange={handleChange}></textarea>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* === MAINTENANCE TAB === */}
                  {activeTab === 'Maintenance' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Card: Maintenance Details */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <h3 className="text-[15px] font-bold text-[#1a233a] mb-5">Maintenance Details</h3>

                        <div className="space-y-4">
                          <div className="flex items-center">
                            <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Installation Date</label>
                            <div className="relative flex-1 min-w-0">
                              <input type="date" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:border-blue-500 bg-white shadow-sm uppercase" name="maint_installation_date" value={formData.maint_installation_date} onChange={handleChange} />
                            </div>
                          </div>

                          <div className="flex items-center">
                            <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Last Maintenance Date</label>
                            <div className="relative flex-1 min-w-0">
                              <input type="date" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:border-blue-500 bg-white shadow-sm uppercase" name="last_servicing_date" value={formData.last_servicing_date} onChange={handleChange} />
                            </div>
                          </div>

                          <div className="flex items-center">
                            <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Frequency</label>
                            <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" name="frequency" value={formData.frequency} onChange={handleChange} />
                          </div>

                          <div className="flex items-center">
                            <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Downtime</label>
                            <div className="flex-1 flex gap-2 min-w-0">
                              <input type="text" className="w-1/2 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" name="downtime" value={formData.downtime} onChange={handleChange} />
                              <div className="relative w-1/2">
                                <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm" name="downtime_unit" value={formData.downtime_unit} onChange={handleChange}>
                                  <option value="Hours">Hours</option>
                                  <option value="Days">Days</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Card: Service Provider */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <h3 className="text-[15px] font-bold text-[#1a233a] mb-5">Service Provider</h3>

                        <div className="space-y-4">
                          <div className="flex items-center">
                            <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Service Contract <span className="text-red-500">*</span></label>
                            <div className="relative w-32">
                              <select className={`w-full border border-gray-200 rounded-md pl-7 pr-3 py-1.5 text-[12px] font-medium focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm ${formData.service_contract === 'Active' ? 'text-green-600' : 'text-red-600'}`} name="service_contract" value={formData.service_contract} onChange={handleChange}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                              <div className={`absolute left-2.5 top-[9px] w-2 h-2 rounded-full pointer-events-none ${formData.service_contract === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <ChevronDown className="absolute right-2 top-2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          <div className="flex items-center">

                            <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">
                              Service Provider
                            </label>

                            <div className="relative flex-1 min-w-0">

                              <select
                                className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm"
                                name="vendor_supplier"
                                value={formData.vendor_supplier}
                                onChange={handleChange}
                              >

                                <option value="">
                                  Select Service Provider
                                </option>

                                {serviceProviders.map((provider) => (

                                  <option
                                    key={provider.id}
                                    value={provider.name}
                                  >
                                    {provider.name}
                                  </option>

                                ))}

                              </select>

                              <ChevronDown
                                className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none"
                              />

                            </div>

                          </div>

                          <div className="flex items-center">
                            <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Contact Person</label>
                            <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" name="contact_person" value={formData.contact_person} onChange={handleChange} />
                          </div>

                          <div className="flex items-center">
                            <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Designation</label>
                            <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" name="designation" value={formData.designation} onChange={handleChange} />
                          </div>

                          <div className="flex items-center">
                            <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Mobile Number</label>
                            <div className="flex-1 relative min-w-0">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                              </div>
                              <input type="text" className="w-full border border-gray-200 rounded-md pl-9 pr-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" name="mobile_number" value={formData.mobile_number} onChange={handleChange} />
                            </div>
                          </div>

                          <div className="flex items-center">
                            <label className="w-40 text-[13px] font-bold text-[#1a233a] shrink-0">Email</label>
                            <div className="flex-1 relative min-w-0">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="w-4 h-4 text-gray-400" />
                              </div>
                              <input type="email" className="w-full border border-gray-200 rounded-md pl-9 pr-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* === DOCUMENT TAB === */}
                  {activeTab === 'Document' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {/* Left Column */}
                      <div className="space-y-6">
                        {/* Operational Manual */}
                        <div>
                          <h4 className="text-[13px] text-[#1a233a] mb-2 font-medium">Operational Manual</h4>
                          {/* Uploaded State */}
                          <div className="border border-gray-100 rounded-xl p-2 pr-4 flex items-center justify-between bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-green-500" strokeWidth={2} />
                              </div>
                              <span className="text-[13px] font-medium text-[#1a233a]">Operational.Manual.PDF</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <button type="button" className="text-gray-300 hover:text-gray-500 transition-colors">
                                <Eye className="w-[15px] h-[15px]" />
                              </button>
                              <button type="button" className="text-red-300 hover:text-red-500 transition-colors">
                                <Trash2 className="w-[15px] h-[15px]" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Purchase Invoice */}
                        <div>
                          <h4 className="text-[13px] text-[#1a233a] mb-2 font-medium">Purchase Invoice</h4>
                          {/* Empty Upload State */}
                          <div className="border border-gray-100 rounded-xl p-2 flex items-center gap-3 bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="w-10 h-10 bg-[#0b101b] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#1a233a] transition-colors">
                              <UploadCloud className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[12px] font-bold text-[#1a233a]">Drag & Drop or click here to Upload</span>
                              <span className="text-[10px] text-gray-400 mt-0.5">Supporting Format IMG, PDF, JPG, PNG Format (Max 10 Mb)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Warranty Card */}
                        <div>
                          <h4 className="text-[13px] text-[#1a233a] mb-2 font-medium">Warranty Card</h4>
                          {/* Empty Upload State */}
                          <div className="border border-gray-100 rounded-xl p-2 flex items-center gap-3 bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="w-10 h-10 bg-[#0b101b] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#1a233a] transition-colors">
                              <UploadCloud className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[12px] font-bold text-[#1a233a]">Drag & Drop or click here to Upload</span>
                              <span className="text-[10px] text-gray-400 mt-0.5">Supporting Format IMG, PDF, JPG, PNG Format (Max 10 Mb)</span>
                            </div>
                          </div>
                        </div>

                        {/* Other Document */}
                        <div>
                          <h4 className="text-[13px] text-[#1a233a] mb-2 font-medium">Other Document</h4>
                          {/* Empty Upload State */}
                          <div className="border border-gray-100 rounded-xl p-2 flex items-center gap-3 bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="w-10 h-10 bg-[#0b101b] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#1a233a] transition-colors">
                              <UploadCloud className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[12px] font-bold text-[#1a233a]">Drag & Drop or click here to Upload</span>
                              <span className="text-[10px] text-gray-400 mt-0.5">Supporting Format IMG, PDF, JPG, PNG Format (Max 10 Mb)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >

      {/* ── Fixed Footer ── */}
      < div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-3 flex justify-end items-center gap-3 z-20" >
        <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button
          onClick={() => navigate('/machine')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="machine-form"
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-colors"
        >
          Next
        </button>
      </div >

      {/* Success Modal */}
      {
        showSuccessModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-112.5 min-h-100 flex flex-col items-center relative overflow-hidden animate-in fade-in zoom-in duration-300">

              {/* Green Curved Header */}
              <div className="absolute top-0 left-0 w-full h-40 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[150%] h-70 bg-[#22c55e] rounded-b-[50%]"></div>
              </div>

              {/* Content Container */}
              <div className="relative z-10 flex flex-col items-center w-full px-8 pt-21.25 pb-8">

                {/* Checkmark Circle */}
                <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-6">
                  <div className="w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" strokeWidth={4} />
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-[22px] font-bold text-[#22c55e] text-center mb-4 leading-snug">
                  Machine Profile<br />Successfully Created.
                </h3>

                <p className="text-[10px] font-bold text-gray-400 mb-6 tracking-wide">
                  *Redirect in 3 Sec*
                </p>

                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/machine');
                  }}
                  className="px-10 py-1.5 border-2 border-[#22c55e] text-[#22c55e] rounded-[10px] font-bold text-sm hover:bg-green-50 transition-colors bg-white shadow-sm"
                >
                  Okay
                </button>
              </div>

            </div>
          </div>
        )
      }

    </main >
  );
};

export default CreateMachinePage;
