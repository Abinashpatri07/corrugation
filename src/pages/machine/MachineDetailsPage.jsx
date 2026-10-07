import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  Calendar,
  Clock,
  Package,
  TrendingUp,
  FileText,
  Box,
  Search,
  Plus,
  MoreHorizontal,
  ChevronDown,
  Factory,
  Gauge,
  Zap,
  Layers,
  Weight,
  Ruler,
  Power,
  Wrench,
  Briefcase,
  User,
  Timer,
  Activity,
  Eye,
  Download,
} from 'lucide-react';

import {
  getMachineDetails,
  getMachineList,
} from '../../services/machineDetailsApi';

import {
  getMachineUtilization,
} from '../../services/machineUtilizationApi';

import {
  getMachineMaintenance,
} from '../../services/machineMaintenanceApi';


// =============================================================
// HELPERS
// =============================================================

const firstValue = (...values) => {

  for (const value of values) {

    if (
      value !== undefined &&
      value !== null &&
      value !== ''
    ) {

      return value;

    }

  }

  return '-';

};


const displayNumber = (value) => {

  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {

    return '-';

  }

  const number = Number(value);

  if (Number.isFinite(number)) {

    return number.toLocaleString('en-IN');

  }

  return String(value);

};


const formatDate = (value) => {

  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  const day =
    String(date.getDate())
      .padStart(2, '0');

  const month =
    String(date.getMonth() + 1)
      .padStart(2, '0');

  const year =
    date.getFullYear();

  return `${day}/${month}/${year}`;
};


const formatCurrency = (value) => {

  if (
    value === undefined ||
    value === null ||
    value === '' ||
    value === '-'
  ) {

    return '-';

  }

  const number = Number(value);

  if (!Number.isFinite(number)) {

    return String(value);

  }

  return `₹${number.toLocaleString('en-IN')}`;

};


// =============================================================
// SMALL REUSABLE COMPONENTS
// =============================================================

const DetailRow = ({
  label,
  value,
}) => {

  return (

    <div className="flex justify-between items-center gap-5">

      <span className="text-[13px] text-gray-500">
        {label}
      </span>

      <span className="text-[13px] font-semibold text-[#111827] text-right">
        {value}
      </span>

    </div>

  );

};


const SpecificationCard = ({
  icon: Icon,
  label,
  value,
  background,
  iconBackground,
  iconColor,
}) => {

  return (

    <div
      className={`rounded-[12px] p-4 flex items-center gap-4 ${background}`}
    >

      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBackground} ${iconColor}`}
      >

        <Icon className="w-5 h-5" />

      </div>

      <div className="min-w-0">

        <div className="text-[11px] text-gray-500 mb-1">
          {label}
        </div>

        <div className="text-[15px] font-semibold text-[#111827] break-words">
          {value}
        </div>

      </div>

    </div>

  );

};


// =============================================================
// MAIN COMPONENT
// =============================================================

const MachineDetailsPage = () => {

  const navigate = useNavigate();

  const { id } = useParams();


  // -----------------------------------------------------------
  // STATE
  // -----------------------------------------------------------

  const [
    activeTab,
    setActiveTab
  ] = useState('Overview');


  const [
    machine,
    setMachine
  ] = useState(null);


  const [
    machines,
    setMachines
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState('');


  const [
    searchText,
    setSearchText
  ] = useState('');


  const [
    utilizationData,
    setUtilizationData
  ] = useState(null);

  const [
    maintenanceData,
    setMaintenanceData
  ] = useState(null);


  const [
    maintenanceLoading,
    setMaintenanceLoading
  ] = useState(false);


  const [
    maintenanceError,
    setMaintenanceError
  ] = useState('');

  const [
    utilizationLoading,
    setUtilizationLoading
  ] = useState(false);


  const [
    utilizationError,
    setUtilizationError
  ] = useState('');


  const [
    utilizationPeriod,
    setUtilizationPeriod
  ] = useState('last_week');


  // -----------------------------------------------------------
  // MACHINE ID
  //
  // IMPORTANT:
  // This is declared BEFORE the utilization useEffect.
  // -----------------------------------------------------------

  const machineId = useMemo(() => {

    return (
      machine?.machine_id ??
      machine?.machineId ??
      machine?.id ??
      id
    );

  }, [machine, id]);

  // ===========================================================
  // LOAD MACHINE DETAILS
  // ===========================================================

  useEffect(() => {

    let mounted = true;


    const loadMachine = async () => {

      if (!id) {

        setError(
          'Machine ID is missing.'
        );

        setLoading(false);

        return;

      }


      try {

        setLoading(true);

        setError('');


        const response =
          await getMachineDetails(id);


        console.log(
          'Machine details response:',
          response
        );


        const machineData =
          response?.data ??
          response?.machine ??
          response;


        if (mounted) {

          setMachine(machineData);

        }


      } catch (err) {

        console.error(
          'Failed to load machine:',
          err
        );


        if (mounted) {

          setError(
            err?.message ||
            'Failed to load machine details.'
          );

        }


      } finally {

        if (mounted) {

          setLoading(false);

        }

      }

    };


    loadMachine();


    return () => {

      mounted = false;

    };

  }, [id]);


  // ===========================================================
  // LOAD MACHINE LIST
  // ===========================================================

  useEffect(() => {

    let mounted = true;


    const loadMachines = async () => {

      try {

        const response =
          await getMachineList();


        console.log(
          'Machine list response:',
          response
        );


        const machineList =
          response?.data ??
          response?.machines ??
          response?.rows ??
          response ??
          [];


        if (mounted) {

          setMachines(
            Array.isArray(machineList)
              ? machineList
              : []
          );

        }


      } catch (err) {

        console.error(
          'Failed to load machine list:',
          err
        );

      }

    };


    loadMachines();


    return () => {

      mounted = false;

    };

  }, []);

  // ===========================================================
  // LOAD MACHINE MAINTENANCE
  // ===========================================================

  useEffect(() => {

    let mounted = true;


    const loadMaintenance = async () => {

      if (!machineId) {
        return;
      }


      try {

        setMaintenanceLoading(true);
        setMaintenanceError('');


        const response =
          await getMachineMaintenance(machineId);


        console.log(
          'Machine maintenance response:',
          response
        );


        const data =
          response?.data ??
          response?.maintenance ??
          response;


        if (mounted) {

          setMaintenanceData(data);

        }


      } catch (err) {

        console.error(
          'Failed to load machine maintenance:',
          err
        );


        if (mounted) {

          setMaintenanceError(
            err?.message ||
            'Failed to load maintenance data.'
          );

        }


      } finally {

        if (mounted) {

          setMaintenanceLoading(false);

        }

      }

    };


    loadMaintenance();


    return () => {

      mounted = false;

    };

  }, [machineId]);


  // ===========================================================
  // LOAD UTILIZATION
  // ===========================================================

  useEffect(() => {

    let mounted = true;


    const loadUtilization = async () => {

      if (!machineId) {

        return;

      }


      try {

        setUtilizationLoading(true);

        setUtilizationError('');


        const response =
          await getMachineUtilization(
            machineId,
            utilizationPeriod
          );


        console.log(
          'Machine utilization response:',
          response
        );


        const data =
          response?.data ??
          response?.utilization ??
          response;


        if (mounted) {

          setUtilizationData(data);

        }


      } catch (err) {

        console.error(
          'Failed to load utilization:',
          err
        );


        if (mounted) {

          setUtilizationError(
            err?.message ||
            'Utilization data unavailable.'
          );

        }


      } finally {

        if (mounted) {

          setUtilizationLoading(false);

        }

      }

    };


    loadUtilization();


    return () => {

      mounted = false;

    };

  }, [
    machineId,
    utilizationPeriod,
  ]);


  // ===========================================================
  // LOADING
  // ===========================================================

  if (loading) {

    return (

      <div className="flex h-full items-center justify-center bg-[#f4f7f9]">

        <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 text-[14px] text-gray-500">

          Loading machine details...

        </div>

      </div>

    );

  }


  // ===========================================================
  // ERROR
  // ===========================================================

  if (error) {

    return (

      <div className="flex h-full items-center justify-center bg-[#f4f7f9]">

        <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-red-100 text-center">

          <div className="text-[15px] font-semibold text-red-600 mb-2">

            Unable to load machine

          </div>

          <div className="text-[13px] text-gray-500">

            {error}

          </div>

        </div>

      </div>

    );

  }


  if (!machine) {

    return (

      <div className="flex h-full items-center justify-center bg-[#f4f7f9]">

        <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">

          Machine not found.

        </div>

      </div>

    );

  }


  // ===========================================================
  // MACHINE DATA
  // ===========================================================

  const technical =
    machine?.technical_spec ??
    machine?.technicalSpec ??
    {};


  const operational =
    machine?.operational_spec ??
    machine?.operationalSpec ??
    {};


  const serviceContract =
    machine?.service_contract ??
    machine?.serviceContract ??
    {};

  // ===========================================================
  // MAINTENANCE DATA
  // ===========================================================

  const maintenance =
    maintenanceData?.maintenance ??
    maintenanceData?.maintenance_details ??
    maintenanceData?.maintenanceDetails ??
    {};


  const maintenanceHistory =
    maintenanceData?.history ??
    maintenanceData?.maintenance_history ??
    maintenanceData?.maintenanceHistory ??
    [];


  const maintenanceVendor =
    maintenanceData?.vendor ??
    {};


  const lastMaintenance =
    maintenanceData?.last_maintenance ??
    maintenanceData?.lastMaintenance ??
    {};


  const upcomingMaintenance =
    maintenanceData?.upcoming_maintenance ??
    maintenanceData?.upcomingMaintenance ??
    {};


  const maintenanceFrequency =
    maintenanceData?.frequency ??
    {};


  // ===========================================================
  // MAINTENANCE VALUES
  // ===========================================================

  const maintenanceType =
    firstValue(
      maintenance.maintenance_type,
      maintenance.maintenanceType
    );


  const maintenanceStatus =
    firstValue(
      maintenance.maintenance_status,
      maintenance.maintenanceStatus
    );


  const serviceVendor =
    firstValue(
      maintenance.service_vendor,
      maintenance.serviceVendor,
      maintenanceVendor.name,
      maintenanceVendor.vendor_name,
      maintenanceVendor.vendorName
    );


  const maintenanceContact =
    firstValue(
      maintenance.maintenance_contact,
      maintenance.maintenanceContact,
      maintenanceVendor.contact,
      maintenanceVendor.phone,
      maintenanceVendor.mobile
    );


  const lastServiceCost =
    firstValue(
      maintenance.last_service_cost,
      maintenance.lastServiceCost,
      lastMaintenance.cost,
      lastMaintenance.maintenance_cost,
      lastMaintenance.maintenanceCost
    );


  const maintenanceNote =
    firstValue(
      maintenance.note,
      maintenance.notes,
      maintenance.remarks,
      maintenance.description
    );


  const lastMaintenanceDate =
    firstValue(
      lastMaintenance.date,
      lastMaintenance.maintenance_date,
      lastMaintenance.maintenanceDate
    );


  const lastMaintenanceType =
    firstValue(
      lastMaintenance.type,
      lastMaintenance.maintenance_type,
      lastMaintenance.maintenanceType
    );


  const lastMaintenanceDuration =
    firstValue(
      lastMaintenance.duration,
      lastMaintenance.actual_duration,
      lastMaintenance.estimated_duration,
      lastMaintenance.duration_hours
    );


  const lastMaintenanceCost =
    firstValue(
      lastMaintenance.cost,
      lastMaintenance.maintenance_cost,
      lastMaintenance.maintenanceCost
    );


  const lastTechnician =
    firstValue(
      lastMaintenance.technician,
      lastMaintenance.technician_name,
      lastMaintenance.technicianName
    );


  const lastWorkPerformed =
    firstValue(
      lastMaintenance.work_performed,
      lastMaintenance.workPerformed,
      lastMaintenance.description,
      lastMaintenance.remarks
    );


  const nextMaintenanceDate =
    firstValue(
      upcomingMaintenance.next_maintenance_date,
      upcomingMaintenance.nextMaintenanceDate,
      upcomingMaintenance.date
    );


  const maintenancePriority =
    firstValue(
      upcomingMaintenance.priority,
      maintenance.priority
    );


  const estimatedDuration =
    firstValue(
      upcomingMaintenance.estimated_duration,
      upcomingMaintenance.estimatedDuration,
      upcomingMaintenance.duration
    );


  const upcomingMaintenanceType =
    firstValue(
      upcomingMaintenance.maintenance_type,
      upcomingMaintenance.maintenanceType,
      maintenanceType
    );

  const upcomingTechnician =
    firstValue(
      upcomingMaintenance.technician,
      upcomingMaintenance.technician_name,
      upcomingMaintenance.technicianName
    );

  const upcomingWorkPerformed =
    firstValue(
      upcomingMaintenance.work_performed,
      upcomingMaintenance.workPerformed,
      upcomingMaintenance.description,
      upcomingMaintenance.remarks
    );


  const daysUntilMaintenance =
    firstValue(
      upcomingMaintenance.days_remaining,
      upcomingMaintenance.daysRemaining,
      upcomingMaintenance.days_until,
      upcomingMaintenance.daysUntil
    );


  const frequencyName =
    firstValue(
      maintenanceFrequency.frequency,
      maintenanceFrequency.maintenance_frequency,
      maintenanceFrequency.maintenanceFrequency
    );


  const frequencyDays =
    firstValue(
      maintenanceFrequency.cycle_days,
      maintenanceFrequency.cycleDays,
      maintenanceFrequency.frequency_days,
      maintenanceFrequency.frequencyDays
    );


  const averageMaintenanceDuration =
    firstValue(
      maintenanceFrequency.average_duration,
      maintenanceFrequency.averageDuration,
      maintenanceFrequency.duration
    );

  // ===========================================================
  // MAINTENANCE SUMMARY VALUES
  // ===========================================================

  const maintenanceSummary =
    maintenanceData?.summary ??
    maintenanceData?.maintenance_summary ??
    maintenanceData?.maintenanceSummary ??
    {};


  // TOTAL MAINTENANCE COUNT

  const calculatedMaintenanceCount =
    Array.isArray(maintenanceHistory)
      ? maintenanceHistory.length
      : 0;

  const totalMaintenanceCount =
    firstValue(
      maintenanceSummary.total_maintenance_count,
      maintenanceSummary.totalMaintenanceCount,
      maintenanceSummary.maintenance_count,
      maintenanceSummary.maintenanceCount,
      calculatedMaintenanceCount
    );


  // TOTAL MAINTENANCE HOURS

  const calculatedMaintenanceHours =
    Array.isArray(maintenanceHistory)
      ? maintenanceHistory.reduce(
        (total, row) => {

          const duration = Number(
            firstValue(
              row.duration,
              row.actual_duration,
              row.duration_hours,
              0
            )
          );

          return total +
            (Number.isFinite(duration)
              ? duration
              : 0);

        },
        0
      )
      : 0;

  const totalMaintenanceHours =
    firstValue(
      maintenanceSummary.total_maintenance_hours,
      maintenanceSummary.totalMaintenanceHours,
      maintenanceSummary.maintenance_hours,
      maintenanceSummary.maintenanceHours,
      calculatedMaintenanceHours
    );


  // AVERAGE MAINTENANCE DURATION

  const calculatedAverageMaintenanceDuration =
    calculatedMaintenanceCount > 0 &&
      calculatedMaintenanceHours > 0
      ? (
        calculatedMaintenanceHours /
        calculatedMaintenanceCount
      ).toFixed(1)
      : '-';

  const maintenanceAverageDuration =
    firstValue(
      maintenanceSummary.average_maintenance_duration,
      maintenanceSummary.averageMaintenanceDuration,
      averageMaintenanceDuration,
      calculatedAverageMaintenanceDuration
    );


  // TOTAL MAINTENANCE COST

  const calculatedMaintenanceCost =
    Array.isArray(maintenanceHistory)
      ? maintenanceHistory.reduce(
        (total, row) => {

          const cost = Number(
            firstValue(
              row.cost,
              row.maintenance_cost,
              row.maintenanceCost,
              0
            )
          );

          return total +
            (Number.isFinite(cost)
              ? cost
              : 0);

        },
        0
      )
      : 0;

  const totalMaintenanceCost =
    firstValue(
      maintenanceSummary.total_maintenance_cost,
      maintenanceSummary.totalMaintenanceCost,
      maintenanceSummary.maintenance_cost,
      maintenanceSummary.maintenanceCost,
      calculatedMaintenanceCost
    );



  // -----------------------------------------------------------
  // BASIC MACHINE DATA
  // -----------------------------------------------------------

  const machineCode =
    firstValue(
      machine.machine_code,
      machine.machineCode,
      machine.code
    );


  const machineName =
    firstValue(
      machine.machine_name,
      machine.machineName,
      machine.name
    );


  const machineCategory =
    firstValue(
      machine.machine_category,
      machine.machineCategory,
      machine.category
    );


  const machineType =
    firstValue(
      machine.machine_type,
      machine.machineType,
      machine.type
    );


  const brand =
    firstValue(
      machine.brand,
      machine.machine_brand
    );


  const model =
    firstValue(
      machine.model,
      machine.machine_model
    );


  const serialNumber =
    firstValue(
      machine.serial_number,
      machine.serialNumber
    );


  const machineStatus =
    firstValue(
      machine.machine_status,
      machine.status,
      machine.machineStatus
    );


  const vendorName =
    firstValue(
      machine.vendor_name,
      machine.vendorName,
      machine.supplier_name,
      machine.supplierName,
      serviceContract.vendor_name,
      serviceContract.vendorName
    );


  const location =
    firstValue(
      machine.location,
      machine.machine_location
    );


  const department =
    firstValue(
      machine.department
    );


  const description =
    firstValue(
      machine.description
    );


  const manufacturingDate =
    firstValue(
      machine.manufacturing_date,
      machine.manufacturingDate
    );


  const purchaseDate =
    firstValue(
      machine.purchase_date,
      machine.purchaseDate
    );


  const purchasePrice =
    firstValue(
      machine.purchase_price,
      machine.purchasePrice,
      machine.purchase_cost,
      machine.purchaseCost
    );


  const installationDate =
    firstValue(
      machine.installation_date,
      machine.installationDate
    );


  const warrantyMonths =
    firstValue(
      machine.warranty_period_months,
      machine.warranty_period,
      machine.warrantyPeriod
    );


  const warrantyExpiry =
    firstValue(
      machine.warranty_expiry_date,
      machine.warrantyExpiryDate,
      machine.warranty_expiry,
      machine.warrantyExpiry
    );


  const warranty =
    warrantyMonths === '-'
      ? '-'
      : warrantyExpiry !== '-'
        ? `${warrantyMonths} Month (Expires ${formatDate(
          warrantyExpiry
        )})`
        : `${warrantyMonths} Month`;


  // -----------------------------------------------------------
  // TECHNICAL DATA
  // -----------------------------------------------------------

  const speed =
    firstValue(
      technical.speed,
      technical.speed_value,
      machine.speed
    );


  const voltage =
    firstValue(
      technical.voltage,
      technical.voltage_value,
      machine.voltage
    );


  const capacity =
    firstValue(
      technical.capacity,
      technical.capacity_value,
      machine.capacity
    );


  const capacityUnit =
    firstValue(
      technical.capacity_unit,
      machine.capacity_unit
    );


  const power =
    firstValue(
      technical.power,
      technical.power_value,
      machine.power
    );


  const weight =
    firstValue(
      technical.weight,
      technical.weight_kg,
      technical.weight_value,
      machine.weight,
      machine.weight_kg
    );


  const dimensionLength =
    firstValue(
      technical.dimension_length,
      technical.length,
      machine.dimension_length
    );


  const dimensionWidth =
    firstValue(
      technical.dimension_width,
      technical.width,
      machine.dimension_width
    );


  const dimensionHeight =
    firstValue(
      technical.dimension_height,
      technical.height,
      machine.dimension_height
    );


  // -----------------------------------------------------------
  // OPERATIONAL DATA
  // -----------------------------------------------------------

  const monthlyWorkingDays =
    firstValue(
      operational.monthly_working_days,
      operational.monthly_working_day
    );


  const weeklyOffDays =
    firstValue(
      operational.weekly_off_days,
      operational.weekly_off
    );


  const workingDays =
    firstValue(
      operational.working_days,
      operational.working_day
    );


  const operationalShifts =
    firstValue(
      operational.operational_shifts,
      operational.operational_shift
    );


  const operatorCount =
    firstValue(
      operational.operator_count,
      operational.operator
    );


  // -----------------------------------------------------------
  // SERVICE CONTRACT DATA
  // -----------------------------------------------------------

  const contractNumber =
    firstValue(
      serviceContract.contract_number,
      serviceContract.contractNumber
    );


  const contractStartDate =
    firstValue(
      serviceContract.contract_start_date,
      serviceContract.contractStartDate
    );


  const contractEndDate =
    firstValue(
      serviceContract.contract_end_date,
      serviceContract.contractEndDate
    );


  const contactPerson =
    firstValue(
      serviceContract.contact_person,
      serviceContract.contactPerson
    );


  const designation =
    firstValue(
      serviceContract.designation
    );


  const mobileNumber =
    firstValue(
      serviceContract.mobile_number,
      serviceContract.mobileNumber
    );


  const email =
    firstValue(
      serviceContract.email
    );


  const contractStatus =
    firstValue(
      serviceContract.service_contract_status,
      serviceContract.serviceContractStatus
    );


  const serviceFrequency =
    firstValue(
      serviceContract.service_frequency_days,
      serviceContract.serviceFrequencyDays
    );


  const contractRemarks =
    firstValue(
      serviceContract.remarks
    );


  // ===========================================================
  // UTILIZATION DATA
  // ===========================================================

  const summary =
    utilizationData?.summary ??
    {};


  const production =
    utilizationData?.production_performance ??
    utilizationData?.productionPerformance ??
    {};


  const graph =
    utilizationData?.graph ??
    utilizationData?.chart ??
    [];


  const productionReport =
    utilizationData?.production_report ??
    utilizationData?.productionReport ??
    [];

  const workingHours =
    utilizationData?.working_hours ??
    utilizationData?.workingHours ??
    {};



  const averageUtilization =
    firstValue(
      summary.average_utilization,
      summary.averageUtilization
    );


  const peakUtilization =
    firstValue(
      summary.peak_utilization,
      summary.peakUtilization
    );


  const lowestUtilization =
    firstValue(
      summary.lowest_utilization,
      summary.lowestUtilization
    );


  const operatingHours =
    firstValue(
      summary.operating_hours,
      summary.operatingHours
    );


  const todayRuntime =
    firstValue(
      workingHours.runtime_hours,
      workingHours.runtimeHours
    );

  const todayProduction =
    firstValue(
      production.completed,
      production.today_completed
    );


  const targetValue =
    firstValue(
      production.target,
      production.today_target
    );

  const completedValue =
    firstValue(
      production.completed,
      production.today_completed
    );

  const target =
    targetValue === null ||
      targetValue === undefined ||
      targetValue === ''
      ? null
      : Number(targetValue);

  const completed =
    completedValue === null ||
      completedValue === undefined ||
      completedValue === ''
      ? null
      : Number(completedValue);

  const remaining =
    firstValue(
      production.remaining
    );


  const rejected =
    firstValue(
      production.rejected
    );


  const productivity =
    firstValue(
      production.productivity,
      production.productivity_percentage,
      production.productivityPercent
    );


  const qualityScore =
    firstValue(
      production.quality_score,
      production.qualityScore
    );


  const productionProgress =
    Number.isFinite(target) &&
      target > 0 &&
      Number.isFinite(completed)
      ? Math.min(
        (completed / target) * 100,
        100
      )
      : 0;


  // ===========================================================
  // NORMALIZE UTILIZATION GRAPH DATA
  // ===========================================================

  const dynamicUtilizationChartData = (() => {

    let source = graph;

    if (!Array.isArray(source)) {
      source =
        source?.data ??
        source?.records ??
        source?.points ??
        [];
    }

    if (!Array.isArray(source)) {
      return [];
    }

    return source
      .map((item, index) => {

        const rawValue = firstValue(
          item?.value,
          item?.utilization,
          item?.utilization_percentage,
          item?.utilizationPercent,
          item?.percentage
        );

        const numericValue = Number(
          String(rawValue ?? '').replace('%', '')
        );

        const label = firstValue(
          item?.day,
          item?.label,
          item?.date_label,
          item?.date
        );

        return {
          day:
            label !== '-'
              ? label
              : `Day ${index + 1}`,

          value:
            Number.isFinite(numericValue)
              ? numericValue
              : 0
        };

      })
      .filter((item) => item.day !== '-');

  })();

  // ===========================================================
  // NORMALIZE PRODUCTION REPORT
  // ===========================================================

  const dynamicProductionReport = (() => {

    let source = productionReport;

    if (!Array.isArray(source)) {
      source =
        source?.data ??
        source?.records ??
        source?.rows ??
        [];
    }

    if (!Array.isArray(source)) {
      return [];
    }

    return source.map((row, index) => ({

      // ---------------------------------------------------------
      // ID
      // ---------------------------------------------------------

      id:
        row?.id ??
        row?.production_id ??
        row?.record_id ??
        index,


      // ---------------------------------------------------------
      // DATE
      // ---------------------------------------------------------

      date: formatDate(
        firstValue(
          row?.date,
          row?.record_date,
          row?.production_date,
          row?.work_date
        )
      ),


      // ---------------------------------------------------------
      // WEEKLY OFF
      // ---------------------------------------------------------

      weeklyOff: firstValue(
        row?.weeklyOff,
        row?.weekly_off,
        row?.weeklyOffDays
      ),


      // ---------------------------------------------------------
      // PLANNED HOURS
      // ---------------------------------------------------------

      plannedHours: firstValue(
        row?.plannedHours,
        row?.planned_hours
      ),


      // ---------------------------------------------------------
      // REPORTED
      // ---------------------------------------------------------

      reported: firstValue(
        row?.reported,
        row?.reportedHours,
        row?.reported_hours
      ),


      // ---------------------------------------------------------
      // IDLE HOURS
      // ---------------------------------------------------------

      idleHours: firstValue(
        row?.idleHours,
        row?.idle_hours
      ),


      // ---------------------------------------------------------
      // DOWNTIME
      // ---------------------------------------------------------

      downtime: firstValue(
        row?.downtime,
        row?.downtime_hours
      ),


      // ---------------------------------------------------------
      // UTILIZATION
      // ---------------------------------------------------------

      utilization: firstValue(
        row?.utilization,
        row?.utilization_percentage,
        row?.utilizationPercent
      ),


      // ---------------------------------------------------------
      // TARGET
      // ---------------------------------------------------------

      target: firstValue(
        row?.target,
        row?.production_target,
        row?.target_quantity,
        row?.planned_production
      ),


      // ---------------------------------------------------------
      // PRODUCTION
      // ---------------------------------------------------------

      production: firstValue(
        row?.production,
        row?.produced,
        row?.production_quantity,
        row?.completed,
        row?.completed_quantity
      ),


      // ---------------------------------------------------------
      // REJECT
      // ---------------------------------------------------------

      reject: firstValue(
        row?.reject,
        row?.rejected,
        row?.reject_quantity,
        row?.rejected_quantity
      ),


      // ---------------------------------------------------------
      // PRODUCTIVITY
      // ---------------------------------------------------------

      productivity: firstValue(
        row?.productivity,
        row?.productivity_percentage,
        row?.productivityPercent
      ),


      // ---------------------------------------------------------
      // QUALITY SCORE
      // ---------------------------------------------------------

      qualityScore: firstValue(
        row?.qualityScore,
        row?.quality_score,
        row?.quality
      )

    }));

  })();

  // ===========================================================
  // SIDEBAR SEARCH
  // ===========================================================

  const filteredMachines =
    machines.filter((item) => {

      const code =
        String(
          firstValue(
            item.machine_code,
            item.machineCode,
            item.code
          )
        ).toLowerCase();


      const name =
        String(
          firstValue(
            item.machine_name,
            item.machineName,
            item.name
          )
        ).toLowerCase();


      const search =
        searchText.toLowerCase();


      return (
        code.includes(search) ||
        name.includes(search)
      );

    });


  // ===========================================================
  // RENDER
  // ===========================================================

  return (

    <div className="flex h-full bg-[#f4f7f9] p-1.5 gap-1.5 overflow-hidden">

      {/* =====================================================
          LEFT SIDEBAR
      ====================================================== */}

      <div className="w-full lg:w-[260px] shrink-0 flex flex-col bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-3 pb-2">

          <div className="flex items-center justify-between mb-4">

            <div className="flex items-center gap-1">

              <h2 className="text-xl tracking-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]">
                All Machinery
              </h2>

              <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />

            </div>


            <div className="flex gap-2">

              <button
                onClick={() =>
                  navigate('/machine/new')
                }
                className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800"
              >
                <Plus className="w-4 h-4" />
              </button>


              <button
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black hover:bg-gray-200"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

            </div>

          </div>


          <div className="relative">

            <input
              type="text"
              placeholder="Search machine..."
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
              className="w-full pl-8 pr-3 py-2 text-[12px] bg-gray-100 border border-transparent rounded-md focus:bg-white focus:border-blue-500 focus:outline-none"
            />

            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />

          </div>

        </div>


        <div className="flex-1 overflow-y-auto px-3 pb-3">

          {filteredMachines.length === 0 && (

            <div className="text-center py-6 text-[12px] text-gray-400">
              No machines found
            </div>

          )}


          {filteredMachines.map((item) => {

            const itemId =
              firstValue(
                item.machine_id,
                item.machineId,
                item.id
              );


            const itemCode =
              firstValue(
                item.machine_code,
                item.machineCode,
                item.code
              );


            const itemName =
              firstValue(
                item.machine_name,
                item.machineName,
                item.name
              );


            const itemStatus =
              firstValue(
                item.status,
                item.machine_status,
                'Active'
              );


            const selected =
              String(itemId) ===
              String(machineId);


            return (

              <div
                key={itemId}
                onClick={() =>
                  navigate(
                    `/machine/${itemId}`
                  )
                }
                className={`
                  rounded-[14px]
                  px-3
                  py-2
                  cursor-pointer
                  border
                  mb-2
                  transition-all
                  ${selected
                    ? 'bg-gradient-to-br from-[#ffede1] via-[#fae8f8] to-[#efdfff] border-transparent'
                    : 'bg-white border-gray-200 hover:shadow-md'
                  }
                `}
              >

                <div className="flex justify-between items-center">

                  <span className="text-[12px] font-medium text-[#374151]">
                    {itemCode}
                  </span>

                  <span className="text-[9px] text-gray-400">
                    {formatDate(
                      item.created_at ??
                      item.createdAt
                    )}
                  </span>

                </div>


                <h3 className="text-[11px] font-semibold text-[#111827] mt-1 mb-1 truncate">
                  {itemName}
                </h3>


                <span className="inline-flex px-2 py-[3px] text-[9px] font-bold rounded-full bg-[#e6fce5] text-[#16a34a] uppercase">
                  {itemStatus}
                </span>

              </div>

            );

          })}

        </div>

      </div>


      {/* =====================================================
          RIGHT AREA
      ====================================================== */}

      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">


        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="bg-white shrink-0 border border-gray-100 rounded-[20px] shadow-sm mb-1">

          <div className="px-4 py-3">

            <div className="flex items-center gap-3.5">

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ef4444] to-[#a855f7] flex items-center justify-center text-white">

                <Factory className="w-[22px] h-[22px]" />

              </div>


              <div>

                <div className="flex items-center gap-2">

                  <h1 className="text-[16px] font-medium text-[#111827]">
                    {machineName !== '-'
                      ? machineName
                      : machineCategory}
                  </h1>


                  <span className="px-2 py-[2px] text-[10px] rounded-full bg-[#e6fce5] text-[#16a34a]">
                    {machineStatus}
                  </span>

                </div>


                <div className="text-[11px] text-gray-500 mt-1">
                  CODE • {machineCode}
                </div>

              </div>

            </div>


            <div className="h-[1px] bg-gray-100 my-3" />


            {/* BACKEND DRIVEN TOP CARDS */}

            <div className="flex gap-4 overflow-x-auto">

              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[170px] flex-1">

                <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center bg-[#e5fce3] text-[#16a34a]">
                  <Clock className="w-4 h-4" />
                </div>

                <div className="text-[11px] text-gray-500">
                  Today's Runtime
                </div>

                <div className="text-[18px] font-semibold">
                  {todayRuntime !== '-'
                    ? `${todayRuntime} Hours`
                    : '-'}
                </div>

              </div>


              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[170px] flex-1">

                <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center bg-[#eef2ff] text-[#4f46e5]">
                  <Box className="w-4 h-4" />
                </div>

                <div className="text-[11px] text-gray-500">
                  Today's Production
                </div>

                <div className="text-[18px] font-semibold">
                  {todayProduction !== '-'
                    ? displayNumber(
                      todayProduction
                    )
                    : '-'}
                </div>

              </div>


              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[170px] flex-1">

                <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center bg-[#fae8ff] text-[#c026d3]">
                  <Calendar className="w-4 h-4" />
                </div>

                <div className="text-[11px] text-gray-500">
                  Operating Hours
                </div>

                <div className="text-[18px] font-semibold">
                  {operatingHours !== '-'
                    ? `${operatingHours} Hours`
                    : '-'}
                </div>

              </div>


              <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[170px] flex-1">

                <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center bg-[#ffedd5] text-[#ea580c]">
                  <TrendingUp className="w-4 h-4" />
                </div>

                <div className="text-[11px] text-gray-500">
                  Machine Utilization
                </div>

                <div className="text-[18px] font-semibold">
                  {averageUtilization !== '-'
                    ? `${averageUtilization}%`
                    : '-'}
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            MAIN CARD
        ==================================================== */}

        <div className="bg-white flex-1 flex flex-col overflow-hidden border border-gray-100 rounded-[20px] shadow-sm">


          {/* TABS */}

          <div className="flex gap-6 px-4 pt-3 shrink-0 border-b border-gray-100">

            {[
              'Overview',
              'Utilization',
              'Maintenance',
              'Document',
            ].map((tab) => (

              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`
                  relative pb-3 text-[13px]
                  ${activeTab === tab
                    ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]'
                    : 'font-semibold text-gray-500'
                  }
                `}
              >

                {tab}

                {activeTab === tab && (

                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]" />

                )}

              </button>

            ))}

          </div>


          {/* CONTENT */}

          <div className="flex-1 overflow-y-auto p-4 bg-[#f8fafc]">


            {/* =================================================
                OVERVIEW
            ================================================== */}

            {activeTab === 'Overview' && (

              <div className="space-y-6 max-w-7xl mx-auto">


                {/* MACHINE DETAILS */}

                <div className="bg-white rounded-[12px] p-6">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center">
                      <Box className="w-4 h-4 text-white" />
                    </div>

                    <h2 className="text-[16px] font-bold">
                      Machine Details
                    </h2>

                  </div>


                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-5">

                    <DetailRow
                      label="Machine Code"
                      value={machineCode}
                    />

                    <DetailRow
                      label="Machine Name"
                      value={machineName}
                    />

                    <DetailRow
                      label="Machine Category"
                      value={machineCategory}
                    />

                    <DetailRow
                      label="Machine Type"
                      value={machineType}
                    />

                    <DetailRow
                      label="Brand"
                      value={brand}
                    />

                    <DetailRow
                      label="Model"
                      value={model}
                    />

                    <DetailRow
                      label="Serial Number"
                      value={serialNumber}
                    />

                    <DetailRow
                      label="Manufacturing Date"
                      value={formatDate(
                        manufacturingDate
                      )}
                    />

                    <DetailRow
                      label="Service Provider"
                      value={vendorName}
                    />

                    <DetailRow
                      label="Purchase Date"
                      value={formatDate(
                        purchaseDate
                      )}
                    />

                    <DetailRow
                      label="Purchase Price"
                      value={formatCurrency(
                        purchasePrice
                      )}
                    />

                    <DetailRow
                      label="Warranty"
                      value={warranty}
                    />

                    <DetailRow
                      label="Installation Date"
                      value={formatDate(
                        installationDate
                      )}
                    />

                    <DetailRow
                      label="Location"
                      value={location}
                    />

                    <DetailRow
                      label="Department"
                      value={department}
                    />

                    <div className="flex justify-between items-center gap-5">
                      <span className="text-[13px] text-gray-500">
                        Status
                      </span>

                      <div className="flex items-center gap-2">
                        <div
                          className={`relative w-9 h-5 rounded-full ${machineStatus === 'ACTIVE'
                            ? 'bg-[#16a34a]'
                            : 'bg-gray-300'
                            }`}
                        >
                          <div
                            className={`absolute top-[2px] w-4 h-4 rounded-full bg-white shadow-sm transition-all ${machineStatus === 'ACTIVE'
                              ? 'left-[18px]'
                              : 'left-[2px]'
                              }`}
                          />
                        </div>

                        <span
                          className={`text-[13px] font-medium ${machineStatus === 'ACTIVE'
                            ? 'text-[#16a34a]'
                            : 'text-gray-500'
                            }`}
                        >
                          {machineStatus === 'ACTIVE'
                            ? 'Active'
                            : 'Inactive'}
                        </span>
                      </div>
                    </div>

                  </div>


                  <div className="mt-6">

                    <div className="text-[13px] text-gray-500 mb-2">
                      Description
                    </div>

                    <div className="bg-[#f9fafb] border border-gray-100 rounded-[12px] p-4">

                      <p className="text-[13px] text-gray-600">
                        {description}
                      </p>

                    </div>

                  </div>

                </div>


                {/* TECHNICAL SPECIFICATION */}

                <div className="bg-white rounded-[12px] p-6">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>

                    <h2 className="text-[16px] font-bold">
                      Technical Specification
                    </h2>

                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                    {/* POWER */}
                    <SpecificationCard
                      icon={Power}
                      label="Power"
                      value={
                        power !== '-'
                          ? `${displayNumber(power)} KW`
                          : '-'
                      }
                      background="bg-pink-50"
                      iconBackground="bg-pink-100"
                      iconColor="text-pink-600"
                    />

                    {/* SPEED */}
                    <SpecificationCard
                      icon={Gauge}
                      label="Speed"
                      value={
                        speed !== '-'
                          ? `${displayNumber(speed)} RPM`
                          : '-'
                      }
                      background="bg-yellow-50"
                      iconBackground="bg-yellow-100"
                      iconColor="text-yellow-600"
                    />

                    {/* VOLTAGE */}
                    <SpecificationCard
                      icon={Zap}
                      label="Voltage"
                      value={
                        voltage !== '-'
                          ? `${displayNumber(voltage)} V`
                          : '-'
                      }
                      background="bg-purple-50"
                      iconBackground="bg-purple-100"
                      iconColor="text-purple-600"
                    />

                    {/* WEIGHT */}
                    <SpecificationCard
                      icon={Weight}
                      label="Weight"
                      value={
                        weight !== '-'
                          ? `${displayNumber(weight)} Kg`
                          : '-'
                      }
                      background="bg-green-50"
                      iconBackground="bg-green-100"
                      iconColor="text-green-600"
                    />

                    {/* CAPACITY */}
                    <SpecificationCard
                      icon={Layers}
                      label="Capacity"
                      value={
                        capacity !== '-'
                          ? `${displayNumber(capacity)} Boxes/day ${capacityUnit !== '-'
                            ? capacityUnit
                            : ''
                          }`
                          : '-'
                      }
                      background="bg-blue-50"
                      iconBackground="bg-blue-100"
                      iconColor="text-blue-600"
                    />

                    {/* DIMENSIONS */}
                    <SpecificationCard
                      icon={Ruler}
                      label="Dimensions (L × W × H)"
                      value={
                        dimensionLength !== '-' &&
                          dimensionWidth !== '-' &&
                          dimensionHeight !== '-'
                          ? `${dimensionLength}m × ${dimensionWidth}m × ${dimensionHeight}m`
                          : '-'
                      }
                      background="bg-cyan-50"
                      iconBackground="bg-cyan-100"
                      iconColor="text-cyan-600"
                    />

                  </div>

                </div>

              </div>

            )}


            {/* =================================================
                UTILIZATION
            ================================================== */}

            {activeTab === 'Utilization' && (

              <div className="space-y-3 max-w-7xl mx-auto">

                {/* =====================================================
                      TOP SECTION - UTILIZATION ANALYTICS
                  ====================================================== */}

                <div className="bg-white rounded-[12px] p-6 shadow-sm border border-gray-100">

                  <div className="flex justify-between items-center mb-6">

                    <h2 className="text-[16px] font-bold text-[#111827]">
                      Machine Utilization Analytics
                    </h2>

                    <select
                      value={utilizationPeriod}
                      onChange={(e) =>
                        setUtilizationPeriod(e.target.value)
                      }
                    >
                      <option value="last_week">
                        Last Week
                      </option>

                      <option value="last_month">
                        This Month
                      </option>
                    </select>

                  </div>


                  {/* LOADING */}

                  {utilizationLoading && (

                    <div className="h-[220px] flex items-center justify-center text-[13px] text-gray-400">
                      Loading utilization data...
                    </div>

                  )}


                  {/* ERROR */}

                  {!utilizationLoading &&
                    utilizationError && (

                      <div className="h-[220px] flex items-center justify-center text-[13px] text-red-500">
                        {utilizationError}
                      </div>

                    )}


                  {/* CHART */}

                  {!utilizationLoading &&
                    !utilizationError && (

                      <div className="h-[220px] mb-6">

                        {dynamicUtilizationChartData.length > 0 ? (

                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                          >

                            <AreaChart
                              data={dynamicUtilizationChartData}
                              margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0
                              }}
                            >

                              <defs>

                                <linearGradient
                                  id="utilGrad"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >

                                  <stop
                                    offset="5%"
                                    stopColor="#4ade80"
                                    stopOpacity={0.4}
                                  />

                                  <stop
                                    offset="95%"
                                    stopColor="#4ade80"
                                    stopOpacity={0.05}
                                  />

                                </linearGradient>

                              </defs>


                              <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#f0f0f0"
                              />


                              <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                  fontSize: 11,
                                  fill: '#9ca3af'
                                }}
                                dy={10}
                              />


                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                  fontSize: 11,
                                  fill: '#9ca3af'
                                }}
                                domain={[0, 100]}
                                ticks={[0, 20, 40, 60, 80, 100]}
                                dx={-10}
                              />


                              <Tooltip
                                formatter={(value) => [
                                  `${value}%`,
                                  'Utilization'
                                ]}
                                contentStyle={{
                                  borderRadius: '8px',
                                  border: 'none',
                                  boxShadow:
                                    '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                              />


                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#4ade80"
                                strokeWidth={2}
                                strokeDasharray="4 4"
                                fill="url(#utilGrad)"
                                dot={false}
                                activeDot={{
                                  r: 5,
                                  fill: '#4ade80',
                                  stroke: '#fff',
                                  strokeWidth: 2
                                }}
                              />

                            </AreaChart>

                          </ResponsiveContainer>

                        ) : (

                          <div className="h-full flex items-center justify-center text-[13px] text-gray-400">
                            No utilization records available.
                          </div>

                        )}

                      </div>

                    )}


                  {/* =====================================================
                        SUMMARY CARDS
                    ====================================================== */}

                  <div className="grid grid-cols-4 gap-4">

                    <div className="border border-gray-100 rounded-[10px] p-4 bg-white shadow-sm">

                      <div className="text-[11px] font-medium text-gray-400 mb-2">
                        Average Utilization
                      </div>

                      <div className="text-[20px] font-bold text-[#111827]">
                        {averageUtilization !== '-'
                          ? `${averageUtilization}%`
                          : '-'}
                      </div>

                    </div>


                    <div className="border border-gray-100 rounded-[10px] p-4 bg-white shadow-sm">

                      <div className="text-[11px] font-medium text-gray-400 mb-2">
                        Peak Utilization
                      </div>

                      <div className="text-[20px] font-bold text-[#111827]">
                        {peakUtilization !== '-'
                          ? `${peakUtilization}%`
                          : '-'}
                      </div>

                    </div>


                    <div className="border border-gray-100 rounded-[10px] p-4 bg-white shadow-sm">

                      <div className="text-[11px] font-medium text-gray-400 mb-2">
                        Lowest Utilization
                      </div>

                      <div className="text-[20px] font-bold text-[#111827]">
                        {lowestUtilization !== '-'
                          ? `${lowestUtilization}%`
                          : '-'}
                      </div>

                    </div>


                    <div className="border border-gray-100 rounded-[10px] p-4 bg-white shadow-sm">

                      <div className="text-[11px] font-medium text-gray-400 mb-2">
                        Operating Hours
                      </div>

                      <div className="text-[20px] font-bold text-[#111827]">
                        {operatingHours !== '-'
                          ? `${operatingHours}h`
                          : '-'}
                      </div>

                    </div>

                  </div>

                </div>


                {/* =====================================================
                      PRODUCTION + WORKING HOURS
                  ====================================================== */}

                <div className="grid grid-cols-2 gap-4">


                  {/* =================================================
                        PRODUCTION PERFORMANCE
                    ================================================== */}

                  <div className="bg-white rounded-[12px] p-4 shadow-sm border border-gray-100">

                    <div className="flex items-center gap-3 mb-4 shrink-0">

                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">

                        <Box className="w-4 h-4 text-white" />

                      </div>

                      <h2 className="text-[15px] font-bold text-[#111827]">
                        Production Performance
                      </h2>

                    </div>


                    <div className="mb-4">

                      <div className="flex justify-between items-center mb-2">

                        <span className="text-[11px] text-gray-500 font-medium">
                          Today's Target
                        </span>

                        <span className="text-[14px] font-bold text-[#111827]">
                          {displayNumber(target)}
                        </span>

                      </div>


                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-gradient-to-r from-[#ff3b30] to-[#b82db8] rounded-full"
                          style={{
                            width: `${productionProgress}%`
                          }}
                        />

                      </div>

                    </div>


                    <div className="grid grid-cols-2 gap-y-4">

                      {/* 1. COMPLETED */}
                      <div>

                        <div className="text-[11px] text-gray-400 font-medium mb-1">
                          Completed
                        </div>

                        <div className="text-[18px] font-bold text-[#111827]">
                          {displayNumber(completed)}
                        </div>

                      </div>


                      {/* 2. REJECTED */}
                      <div>

                        <div className="text-[11px] text-gray-400 font-medium mb-1">
                          Rejected
                        </div>

                        <div className="text-[18px] font-bold text-[#111827]">
                          {displayNumber(rejected)}
                        </div>

                      </div>


                      {/* 3. PRODUCTIVITY */}
                      <div>

                        <div className="text-[11px] text-gray-400 font-medium mb-1">
                          Productivity
                        </div>

                        <div className="text-[18px] font-bold text-[#111827]">
                          {productivity !== '-'
                            ? `${productivity}%`
                            : '-'}
                        </div>

                      </div>


                      {/* 4. QUALITY SCORE */}
                      <div>

                        <div className="text-[11px] text-gray-400 font-medium mb-1">
                          Quality Score
                        </div>

                        <div className="text-[18px] font-bold text-[#111827]">
                          {qualityScore !== '-'
                            ? `${qualityScore}%`
                            : '-'}
                        </div>

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                        WORKING HOURS SUMMARY
                    ================================================== */}

                  <div className="bg-white rounded-[12px] p-4 shadow-sm border border-gray-100">

                    <div className="flex items-center gap-3 mb-4 shrink-0">

                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">

                        <Box className="w-4 h-4 text-white" />

                      </div>

                      <h2 className="text-[15px] font-bold text-[#111827]">
                        Working Hours Summary
                      </h2>

                    </div>


                    <div className="grid grid-cols-2 gap-y-4">

                      {/* 1. PLANNED HOURS */}
                      <div>

                        <div className="text-[11px] text-gray-400 font-medium mb-1">
                          Planned Hours
                        </div>

                        <div className="text-[18px] font-bold text-[#111827]">
                          {firstValue(
                            workingHours.planned_hours,
                            workingHours.plannedHours
                          ) !== '-'
                            ? `${firstValue(
                              workingHours.planned_hours,
                              workingHours.plannedHours
                            )} Hrs`
                            : '-'}
                        </div>

                      </div>


                      {/* 2. WEEKLY OFF */}
                      <div>

                        <div className="text-[11px] text-gray-400 font-medium mb-1">
                          Weekly Off
                        </div>

                        <div className="text-[18px] font-bold text-[#111827]">
                          {weeklyOffDays !== '-'
                            ? displayNumber(weeklyOffDays)
                            : '-'}
                        </div>

                      </div>


                      {/* 3. REPORTED HOURS */}
                      <div>

                        <div className="text-[11px] text-gray-400 font-medium mb-1">
                          Reported Hours
                        </div>

                        <div className="text-[18px] font-bold text-[#111827]">
                          {firstValue(
                            workingHours.reported_hours,
                            workingHours.reportedHours
                          ) !== '-'
                            ? `${firstValue(
                              workingHours.reported_hours,
                              workingHours.reportedHours
                            )} Hrs`
                            : '-'}
                        </div>

                      </div>


                      {/* 4. IDLE HOURS */}
                      <div>

                        <div className="text-[11px] text-gray-400 font-medium mb-1">
                          Idle Hours
                        </div>

                        <div className="text-[18px] font-bold text-[#111827]">
                          {firstValue(
                            workingHours.idle_hours,
                            workingHours.idleHours
                          ) !== '-'
                            ? `${firstValue(
                              workingHours.idle_hours,
                              workingHours.idleHours
                            )} Hrs`
                            : '-'}
                        </div>

                      </div>


                      {/* 5. DOWNTIME */}
                      <div>

                        <div className="text-[11px] text-gray-400 font-medium mb-1">
                          Downtime
                        </div>

                        <div className="text-[18px] font-bold text-[#111827]">
                          {firstValue(
                            workingHours.downtime_hours,
                            workingHours.downtimeHours,
                            workingHours.downtime
                          ) !== '-'
                            ? `${firstValue(
                              workingHours.downtime_hours,
                              workingHours.downtimeHours,
                              workingHours.downtime
                            )} Hrs`
                            : '-'}
                        </div>

                      </div>


                      {/* 6. UTILIZATION */}
                      <div>

                        <div className="text-[11px] text-gray-400 font-medium mb-1">
                          Utilization
                        </div>

                        <div className="text-[18px] font-bold text-[#111827]">
                          {averageUtilization !== '-'
                            ? `${averageUtilization}%`
                            : '-'}
                        </div>

                      </div>

                    </div>

                  </div>

                </div>


                {/* =====================================================
                      PRODUCTION REPORT
                  ====================================================== */}

                <div className="bg-white rounded-[12px] shadow-sm border border-gray-100 overflow-hidden pb-4">

                  <div className="p-5 border-b border-gray-100">

                    <h2 className="text-[16px] font-bold text-[#111827] mb-1">
                      Production Report
                    </h2>

                    <p className="text-[11px] text-gray-400">
                      Detailed runtime, utilization, and downtime records
                    </p>

                  </div>


                  <div className="w-full overflow-x-auto">

                    <table className="w-full min-w-[1100px] table-fixed text-left border-collapse">

                      <thead>

                        <tr className="bg-[#f8fafc] text-[11px] font-bold text-[#6b778c] border-b border-gray-100">

                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Date
                          </th>

                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Planned Hours
                          </th>

                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Reported
                          </th>

                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Idle Hours
                          </th>

                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Downtime
                          </th>

                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Utilization
                          </th>

                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Target
                          </th>

                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Production
                          </th>

                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Reject
                          </th>

                          {/* 10. PRODUCTIVITY */}
                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Productivity
                          </th>

                          {/* 11. QUALITY SCORE */}
                          <th className="py-2 px-3 whitespace-nowrap text-left">
                            Quality Score
                          </th>

                        </tr>

                      </thead>




                      <tbody>

                        {dynamicProductionReport.length > 0 ? (

                          dynamicProductionReport.map((row, index) => (

                            <tr
                              key={row.id ?? index}
                              className="border-b border-gray-50 last:border-0 text-[12px] text-gray-800 hover:bg-gray-50 transition-colors"
                            >

                              {/* 1. DATE */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {row.date}
                              </td>


                              {/* 2. PLANNED HOURS */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {row.plannedHours}
                              </td>


                              {/* 3. REPORTED */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {row.reported}
                              </td>


                              {/* 4. IDLE HOURS */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {row.idleHours}
                              </td>


                              {/* 5. DOWNTIME */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {row.downtime}
                              </td>


                              {/* 6. UTILIZATION */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {row.utilization !== '-'
                                  ? `${row.utilization}%`
                                  : '-'}
                              </td>


                              {/* 7. TARGET */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {displayNumber(row.target)}
                              </td>


                              {/* 8. PRODUCTION */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {displayNumber(row.production)}
                              </td>


                              {/* 9. REJECT */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {displayNumber(row.reject)}
                              </td>


                              {/* 10. PRODUCTIVITY */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {row.productivity !== '-'
                                  ? `${row.productivity}%`
                                  : '-'}
                              </td>

                              {/* 11. QUALITY SCORE */}
                              <td className="py-2 px-3 whitespace-nowrap text-left">
                                {row.qualityScore !== '-'
                                  ? `${row.qualityScore}%`
                                  : '-'}
                              </td>

                            </tr>

                          ))

                        ) : (

                          <tr>

                            <td
                              colSpan="11"
                              className="py-8 text-center text-[12px] text-gray-400"
                            >
                              No production records available.
                            </td>

                          </tr>

                        )}

                      </tbody>

                    </table>

                  </div>


                  <div className="px-5 pt-4 text-[11px] text-gray-500 font-medium">

                    Showing {dynamicProductionReport.length} records

                  </div>

                </div>

              </div>

            )}

            {activeTab === 'Maintenance' && (

              <div className="space-y-6 max-w-7xl mx-auto">

                {/* =====================================================
                      LOADING
                  ====================================================== */}

                {maintenanceLoading && (

                  <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-8 text-center">

                    <div className="text-[13px] text-gray-400">
                      Loading maintenance data...
                    </div>

                  </div>

                )}


                {/* =====================================================
                      ERROR
                  ====================================================== */}

                {!maintenanceLoading && maintenanceError && (

                  <div className="bg-white rounded-[12px] border border-red-100 shadow-sm p-8 text-center">

                    <div className="text-[13px] text-red-500">
                      {maintenanceError}
                    </div>

                  </div>

                )}


                {!maintenanceLoading && !maintenanceError && (

                  <>

                    {/* =================================================
                          TOP ROW
                      ================================================== */}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">

                      {/* Maintenance */}

                      {/* Maintenance Summary */}

                      <div className="flex flex-col lg:col-span-6">

                        {/* HEADER */}

                        <div className="flex items-center gap-3 mb-4 shrink-0">

                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">

                            <Wrench className="w-4 h-4 text-white" />

                          </div>

                          <h2 className="text-[16px] font-bold text-[#111827]">
                            Maintenance Summary
                          </h2>

                        </div>


                        {/* MAINTENANCE SUMMARY DETAILS */}

                        <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 px-3 py-5 border border-gray-100 rounded-[12px] bg-white shadow-sm flex-1 items-center">

                          {/* TOTAL MAINTENANCE COUNT */}

                          <span className="text-[13px] text-gray-500">
                            Total Maintenance Count
                          </span>

                          <span className="text-[13px] font-semibold text-[#111827]">
                            {displayNumber(totalMaintenanceCount)}
                          </span>


                          {/* TOTAL MAINTENANCE HOURS */}

                          <span className="text-[13px] text-gray-500">
                            Total Maintenance Hours
                          </span>

                          <span className="text-[13px] font-semibold text-[#111827]">
                            {totalMaintenanceHours !== '-'
                              ? `${displayNumber(totalMaintenanceHours)} Hours`
                              : '-'}
                          </span>


                          {/* AVERAGE MAINTENANCE DURATION */}

                          <span className="text-[13px] text-gray-500">
                            Average Maintenance Duration
                          </span>

                          <span className="text-[13px] font-semibold text-[#111827]">
                            {maintenanceAverageDuration !== '-'
                              ? `${maintenanceAverageDuration} Hrs`
                              : '-'}
                          </span>


                          {/* TOTAL MAINTENANCE COST */}

                          <span className="text-[13px] text-gray-500">
                            Total Maintenance Cost
                          </span>

                          <span className="text-[13px] font-semibold text-[#111827]">
                            {formatCurrency(totalMaintenanceCost)}
                          </span>


                          {/* MAINTENANCE STATUS */}

                          <span className="text-[13px] text-gray-500">
                            Maintenance Status
                          </span>

                          <span
                            className={`text-[13px] font-semibold ${String(maintenanceStatus).toLowerCase() === 'overdue'
                                ? 'text-red-500'
                                : String(maintenanceStatus).toLowerCase() === 'completed'
                                  ? 'text-green-600'
                                  : 'text-[#111827]'
                              }`}
                          >
                            {maintenanceStatus}
                          </span>

                        </div>

                      </div>


                    {/* Service Provider */}

                    <div className="flex flex-col lg:col-span-6">

                      {/* HEADER */}

                      <div className="flex items-center justify-between mb-4 shrink-0">

                        <div className="flex items-center gap-3">

                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">

                            <User className="w-4 h-4 text-white" />

                          </div>

                          <h2 className="text-[16px] font-bold text-[#111827]">
                            Service Provider
                          </h2>

                        </div>


                        {/* ACTIVE BADGE */}

                        <div className="inline-flex bg-[#dcfce7] text-[#16a34a] text-[11px] font-bold px-3 py-1 rounded-full">
                          Active
                        </div>

                      </div>


                      {/* SERVICE PROVIDER DETAILS */}

                      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-3 px-3 py-5 border border-gray-100 rounded-[12px] bg-white shadow-sm flex-1 items-center">

                        {/* Provider Name */}

                        <span className="text-[13px] text-gray-500">
                          Provider Name
                        </span>

                        <span className="text-[13px] font-semibold text-[#111827]">
                          {firstValue(
                            maintenanceVendor.name,
                            maintenanceVendor.vendor_name,
                            maintenanceVendor.vendorName,
                            serviceVendor
                          )}
                        </span>


                        {/* Contact Person */}

                        <span className="text-[13px] text-gray-500">
                          Contact Person
                        </span>

                        <span className="text-[13px] font-semibold text-[#111827]">
                          {contactPerson}
                        </span>


                        {/* Designation */}

                        <span className="text-[13px] text-gray-500">
                          Designation
                        </span>

                        <span className="text-[13px] font-semibold text-[#111827]">
                          {designation}
                        </span>


                        {/* Phone Number */}

                        <span className="text-[13px] text-gray-500">
                          Phone No
                        </span>

                        <span className="text-[13px] font-semibold text-[#111827]">
                          {mobileNumber}
                        </span>


                        {/* Email */}

                        <span className="text-[13px] text-gray-500">
                          Email
                        </span>

                        <span className="text-[13px] font-semibold text-[#111827]">
                          {email}
                        </span>

                      </div>

                    </div>

                  </div>


                {/* =================================================
                            LAST + UPCOMING Maintenance
                        ================================================== */}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">

                  {/* =================================================
                            LAST MAINTENANCE
                        ================================================== */}

                  <div className="flex flex-col lg:col-span-6">

                    <div className="flex items-center gap-3 mb-4 shrink-0">

                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">

                        <Briefcase className="w-4 h-4 text-white" />

                      </div>

                      <h2 className="text-[16px] font-bold text-[#111827]">
                        Last Maintenance
                      </h2>

                    </div>


                    <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 px-3 py-5 border border-gray-100 rounded-[12px] bg-white shadow-sm flex-1 items-start">

                      {/* Maintenance Date */}

                      <span className="text-[13px] text-gray-500">
                        Maintenance Date
                      </span>

                      <span className="text-[13px] font-semibold text-[#111827]">
                        {formatDate(lastMaintenanceDate)}
                      </span>


                      {/* Maintenance Type */}

                      <span className="text-[13px] text-gray-500">
                        Maintenance Type
                      </span>

                      <span className="text-[13px] font-semibold text-[#111827]">
                        {lastMaintenanceType}
                      </span>


                      {/* Technician */}

                      <span className="text-[13px] text-gray-500">
                        Technician
                      </span>

                      <span className="text-[13px] font-semibold text-[#111827]">
                        {lastTechnician}
                      </span>


                      {/* Duration */}

                      <span className="text-[13px] text-gray-500">
                        Duration
                      </span>

                      <span className="text-[13px] font-semibold text-[#111827]">
                        {lastMaintenanceDuration !== '-'
                          ? `${lastMaintenanceDuration} ${lastMaintenance.duration_unit ||
                          lastMaintenance.durationUnit ||
                          'Hrs'
                          }`
                          : '-'}
                      </span>


                      {/* Work Performed */}

                      <span className="text-[13px] text-gray-500">
                        Work Performed
                      </span>

                      <span className="text-[13px] font-semibold text-[#111827]">
                        {lastWorkPerformed}
                      </span>

                    </div>

                  </div>


                  {/* Upcoming */}

                  <div className="flex flex-col lg:col-span-6">

                    <div className="flex items-center gap-3 mb-4 shrink-0">

                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">

                        <Timer className="w-4 h-4 text-white" />

                      </div>

                      <h2 className="text-[16px] font-bold text-[#111827]">
                        Upcoming Maintenance
                      </h2>

                    </div>


                    <div className="px-3 py-5 border border-gray-100 rounded-[12px] bg-white shadow-sm flex-1">

                      <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 items-center">

                        {/* NEXT MAINTENANCE DATE */}

                        <span className="text-[13px] text-gray-500">
                          Next Maintenance Date
                        </span>

                        <span className="text-[13px] font-bold text-red-500">
                          {formatDate(nextMaintenanceDate)}
                        </span>


                        {/* MAINTENANCE TYPE */}

                        <span className="text-[13px] text-gray-500">
                          Maintenance Type
                        </span>

                        <span className="text-[13px] font-semibold text-[#111827]">
                          {upcomingMaintenanceType}
                        </span>


                        {/* TECHNICIAN */}

                        <span className="text-[13px] text-gray-500">
                          Technician
                        </span>

                        <span className="text-[13px] font-semibold text-[#111827]">
                          {upcomingTechnician}
                        </span>


                        {/* ESTIMATED DURATION */}

                        <span className="text-[13px] text-gray-500">
                          Estimated Duration
                        </span>

                        <span className="text-[13px] font-semibold text-[#111827]">

                          {estimatedDuration !== '-'
                            ? `${estimatedDuration} ${upcomingMaintenance.duration_unit ||
                            upcomingMaintenance.durationUnit ||
                            'Hrs'
                            }`
                            : '-'}

                        </span>


                        {/* WORK PERFORMED */}

                        <span className="text-[13px] text-gray-500">
                          Work Performed
                        </span>

                        <span className="text-[13px] font-semibold text-[#111827] leading-relaxed">
                          {upcomingWorkPerformed}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                {/* =================================================
                            MAINTENANCE HISTORY
                        ================================================== */}

                <div className="pb-6">

                  <div className="flex items-center gap-3 mb-4">

                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center shadow-sm">

                      <FileText className="w-4 h-4 text-white" />

                    </div>

                    <h2 className="text-[16px] font-bold text-[#111827]">
                      Maintenance History
                    </h2>

                  </div>


                  <div className="bg-white rounded-[12px] shadow-sm border border-gray-100 overflow-hidden">

                    <div className="overflow-x-auto">

                      <table className="w-full text-left">

                        <thead>

                          <tr className="bg-[#f4f6f8] border-b border-gray-200 text-[13px]">

                            <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                              Date
                            </th>

                            <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                              Machine Code
                            </th>

                            <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                              Machine Name
                            </th>

                            <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                              Maintenance Type
                            </th>

                            <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                              Technician
                            </th>

                            <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                              Duration
                            </th>

                            <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                              Work Performed
                            </th>

                          </tr>

                        </thead>


                        <tbody>

                          {Array.isArray(maintenanceHistory) &&
                            maintenanceHistory.length > 0 ? (

                            maintenanceHistory.map(
                              (row, index) => (

                                <tr
                                  key={
                                    row.maintenance_id ??
                                    row.maintenanceId ??
                                    row.id ??
                                    index
                                  }
                                  className="border-b border-gray-100 last:border-0"
                                >

                                  {/* DATE */}
                                  <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">

                                    {formatDate(
                                      firstValue(
                                        row.date,
                                        row.maintenance_date,
                                        row.maintenanceDate
                                      )
                                    )}

                                  </td>


                                  {/* MACHINE CODE */}
                                  <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">

                                    {firstValue(
                                      row.machine_code,
                                      row.machineCode,
                                      machineCode
                                    )}

                                  </td>


                                  {/* MACHINE NAME */}
                                  <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">

                                    {firstValue(
                                      row.machine_name,
                                      row.machineName,
                                      machineName
                                    )}

                                  </td>


                                  {/* MAINTENANCE TYPE */}
                                  <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">

                                    {firstValue(
                                      row.maintenance_type,
                                      row.maintenanceType,
                                      row.type
                                    )}

                                  </td>


                                  {/* TECHNICIAN */}
                                  <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">

                                    {firstValue(
                                      row.technician_name,
                                      row.technician,
                                      row.technicianName
                                    )}

                                  </td>


                                  {/* DURATION */}
                                  <td className="py-2.5 px-4 text-[12px] text-gray-800 whitespace-nowrap">

                                    {firstValue(
                                      row.duration,
                                      row.actual_duration,
                                      row.estimated_duration,
                                      row.duration_hours
                                    ) !== '-'
                                      ? `${firstValue(
                                        row.duration,
                                        row.actual_duration,
                                        row.estimated_duration,
                                        row.duration_hours
                                      )} Hrs`
                                      : '-'}

                                  </td>


                                  {/* WORK PERFORMED */}
                                  <td className="py-2.5 px-4 text-[12px] text-gray-800 min-w-[250px]">

                                    {firstValue(
                                      row.work_performed,
                                      row.workPerformed,
                                      row.description,
                                      row.remarks
                                    )}

                                  </td>

                                </tr>

                              )

                            )

                          ) : (

                            <tr>

                              <td
                                colSpan="7"
                                className="py-8 text-center text-[12px] text-gray-400"
                              >
                                No maintenance records available.
                              </td>

                            </tr>

                          )}

                        </tbody>

                      </table>

                    </div>

                  </div>

                </div>

              </>

            )}

          </div>

            )}


          {activeTab === 'Document' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="bg-white rounded-[12px] p-6 mb-6">
                <h2 className="text-[16px] font-bold text-[#111827] mb-4">Machine Document</h2>

                <div className="bg-white rounded-[12px] shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#f4f6f8] border-b border-gray-200 text-[13px]">
                        <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Document Name</th>
                        <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Size</th>
                        <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Files Type</th>
                        <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Status</th>
                        <th className="py-2.5 px-4 font-bold text-[#6b778c] whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Operational Manual', size: '2.25 MB', type: 'PDF' },
                        { name: 'Purchase invoice', size: '1.20 MB', type: 'PDF' },
                        { name: 'Last Mainte', size: '1.10 MB', type: 'PDF' },
                      ].map((doc, idx) => (
                        <tr key={idx} className="border-b border-gray-100 last:border-0">
                          <td className="py-2.5 px-4 text-[13px] text-gray-800 whitespace-nowrap flex items-center gap-2 font-medium">
                            <FileText className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                            {doc.name}
                          </td>
                          <td className="py-2.5 px-4 text-[13px] text-gray-800 whitespace-nowrap font-medium">{doc.size}</td>
                          <td className="py-2.5 px-4 text-[13px] text-gray-800 whitespace-nowrap font-medium">{doc.type}</td>
                          <td className="py-2.5 px-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-0.5 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Uploaded</span>
                          </td>
                          <td className="py-2.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-3 text-gray-400">
                              <Eye className="w-4 h-4 hover:text-gray-600 cursor-pointer transition-colors" />
                              <Download className="w-4 h-4 hover:text-gray-600 cursor-pointer transition-colors" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}




        </div>

      </div>

    </div>

    </div >

  );

};


export default MachineDetailsPage;