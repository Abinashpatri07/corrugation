import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import {
  ShoppingCart, Package, Factory, Settings, Recycle, Truck, Layers, Warehouse, Coins,
  RefreshCw, Download, TrendingUp, ChevronDown, FileText, Search,
} from 'lucide-react';

// ─── Overview Data ──────────────────────────────────────────────────────────────

const overviewChartData = {
  all: [
    { name: 'JAN', output: 28, wastage: 25 },
    { name: 'FEB', output: 32, wastage: 28 },
    { name: 'MAR', output: 10, wastage: 8 },
    { name: 'APR', output: 18, wastage: 40 },
    { name: 'MAY', output: 45, wastage: 65 },
    { name: 'JUN', output: 55, wastage: 70 },
    { name: 'JUL', output: 78, wastage: 90 },
    { name: 'AUG', output: 72, wastage: 85 },
    { name: 'SEP', output: 88, wastage: 95 },
    { name: 'OCT', output: 90, wastage: 98 },
    { name: 'NOV', output: 95, wastage: 100 },
    { name: 'DEC', output: 92, wastage: 95 },
  ],
  '14days': [
    { name: 'Day 1', output: 60, wastage: 45 },
    { name: 'Day 3', output: 72, wastage: 55 },
    { name: 'Day 5', output: 65, wastage: 50 },
    { name: 'Day 7', output: 80, wastage: 62 },
    { name: 'Day 9', output: 75, wastage: 58 },
    { name: 'Day 11', output: 88, wastage: 70 },
    { name: 'Day 14', output: 92, wastage: 75 },
  ],
  '7days': [
    { name: 'Mon', output: 70, wastage: 52 },
    { name: 'Tue', output: 78, wastage: 60 },
    { name: 'Wed', output: 65, wastage: 48 },
    { name: 'Thu', output: 82, wastage: 65 },
    { name: 'Fri', output: 90, wastage: 72 },
    { name: 'Sat', output: 55, wastage: 40 },
    { name: 'Sun', output: 48, wastage: 35 },
  ],
};

const buildOverviewOEEDonut = () => {
  const segments = [];

  // Availability (Red to Orange) - 18 segments
  for (let i = 0; i < 18; i++) {
    const hue = 5 + (i / 17) * 20; // 5 -> 25
    segments.push({ value: 1, color: `hsl(${hue}, 90%, 60%)` });
  }

  // Performance (Purple/Indigo) - 6 segments
  for (let i = 0; i < 6; i++) {
    const hue = 260 + (i / 5) * 10; // 260 -> 270
    segments.push({ value: 1, color: `hsl(${hue}, 80%, 60%)` });
  }

  // Quality (Yellow/Gold) - 18 segments
  for (let i = 0; i < 18; i++) {
    const hue = 45 + (i / 17) * 5; // 45 -> 50
    segments.push({ value: 1, color: `hsl(${hue}, 90%, 55%)` });
  }

  return segments;
};
const overviewOEEDonut = buildOverviewOEEDonut();

const overviewOEELegend = [
  { name: 'Availability', color: '#e55353' },
  { name: 'Performance', color: '#3399ff' },
  { name: 'Quality', color: '#4dbd74' },
];

const overviewCards = [
  { label: 'Sales (MTD)', value: '₹4.87 Cr', change: '+11.4%', icon: ShoppingCart },
  { label: 'Material Cost / Ton', value: '₹18,240', change: '+11.4%', icon: Layers },
  { label: 'Production Output', value: '48,620', change: '+11.4%', icon: Factory },
  { label: 'Overall Equipment Effectiveness', value: '82.6%', change: '+11.4%', icon: Warehouse },
  { label: 'Wastage', value: '3.2%', change: '+11.4%', icon: Recycle, trendColor: 'text-rose-500' },
  { label: 'OTIF Dispatch', value: '94.1%', change: '+11.4%', icon: Truck },
];

// ─── Sales Data ─────────────────────────────────────────────────────────────────

const salesCards = [
  { label: 'Sales Revenue (MTD)', value: '₹4.87 Cr', change: '+₹2.53 last month', icon: TrendingUp },
  { label: 'New Orders', value: '16', change: '+11.4% orders booked this month', icon: ShoppingCart },
  { label: 'Avg Order Value', value: '₹1.78 L', change: '+13.4% per production order', icon: FileText },
  { label: 'OTIF Dispatch', value: '82.6%', change: '+11.4% on time, in full', icon: Truck },
];

const salesTrendAll = [
  { name: 'JAN', revenue: 22, target: 30 },
  { name: 'FEB', revenue: 20, target: 32 },
  { name: 'MAR', revenue: 8, target: 28 },
  { name: 'APR', revenue: 80, target: 40 },
  { name: 'MAY', revenue: 75, target: 45 },
  { name: 'JUN', revenue: 40, target: 50 },
  { name: 'JUL', revenue: 55, target: 55 },
  { name: 'AUG', revenue: 95, target: 60 },
  { name: 'SEP', revenue: 85, target: 65 },
  { name: 'OCT', revenue: 88, target: 70 },
  { name: 'NOV', revenue: 90, target: 75 },
  { name: 'DEC', revenue: 92, target: 80 },
];

const salesTrend6M = salesTrendAll.slice(6); // JUL–DEC

// Rainbow donut: blue (Direct Sales) → red (Distributors) → orange (Export) → yellow (Online Portal)
// startAngle=200 places blue at upper-left matching reference image
const buildRainbowDonut = () => {
  const segments = [];

  // Direct Sales 48% — blue/indigo shades (20 segments)
  for (let i = 0; i < 20; i++) {
    const hue = 248 - (i / 19) * 18; // 248 → 230 (indigo to blue-purple)
    segments.push({ value: 1, color: `hsl(${hue}, 72%, 50%)` });
  }

  // Distributors 28% — vivid red shades (12 segments)
  for (let i = 0; i < 12; i++) {
    const hue = 4 + (i / 11) * 12; // 4 → 16 (red to coral-red)
    segments.push({ value: 1, color: `hsl(${hue}, 88%, 50%)` });
  }

  // Export 14% — deep orange (6 segments)
  for (let i = 0; i < 6; i++) {
    const hue = 24 + (i / 5) * 14; // 24 → 38 (orange)
    segments.push({ value: 1, color: `hsl(${hue}, 96%, 52%)` });
  }

  // Online Portal 10% — bright gold/yellow (4 segments)
  for (let i = 0; i < 4; i++) {
    const hue = 46 + (i / 3) * 6; // 46 → 52 (gold to yellow)
    segments.push({ value: 1, color: `hsl(${hue}, 100%, 52%)` });
  }

  return segments;
};
const rainbowDonut = buildRainbowDonut();

const channelLegend = [
  { name: 'Direct Sales', pct: '48%', color: '#4a45c5' },
  { name: 'Distributors', pct: '28%', color: '#e53030' },
  { name: 'Export', pct: '14%', color: '#f47c10' },
  { name: 'Online Portal', pct: '10%', color: '#f5c800' },
];

const topCustomers = [
  { name: 'BlueWave Foods Ltd.', orders: 3, quantity: '22,200', revenue: '₹39.6 L' },
  { name: 'GreenLeaf Organics', orders: 4, quantity: '30,745', revenue: '₹59.6 L' },
  { name: 'Nova Electronics Pvt Ltd', orders: 6, quantity: '29,600', revenue: '₹79.6 L' },
  { name: 'Reliant Packaging Co.', orders: 3, quantity: '26,200', revenue: '₹48.2 L' },
  { name: 'BlueWave Foods Ltd.', orders: 3, quantity: '22,200', revenue: '₹39.6 L' },
  { name: 'Sundar Textiles', orders: 8, quantity: '1,45,200', revenue: '₹89.6 L' },
];

const recentOrders = [
  { id: 'SO-4471', customer: 'BlueWave Foods Ltd.', product: '3-Ply RSC Produce Box', qty: '22,200', status: 'In Progress', date: 'Jul 25, 2026', revenue: '₹39.6 L' },
  { id: 'SO-4472', customer: 'GreenLeaf Organics', product: '3-Ply Duplex Mailer Box', qty: '30,745', status: 'Completed', date: 'Jul 17, 2026', revenue: '₹59.6 L' },
  { id: 'SO-4473', customer: 'Nova Electronics Pvt Ltd', product: 'Wax-Coated Fish Box', qty: '29,600', status: 'In Progress', date: 'Jul 29, 2026', revenue: '₹79.6 L' },
  { id: 'SO-4475', customer: 'Reliant Packaging Co.', product: 'Die-Cut Shipping Carton', qty: '26,200', status: 'Dispatched', date: 'Jul 23, 2026', revenue: '₹48.2 L' },
  { id: 'SO-7475', customer: 'BlueWave Foods Ltd.', product: '3-Ply Printed Mailer', qty: '22,200', status: 'Completed', date: 'Jul 19, 2026', revenue: '₹39.6 L' },
  { id: 'SO-8592', customer: 'Sundar Textiles', product: '7-Ply Heavy Duty Box', qty: '1,45,200', status: 'Dispatched', date: 'Jul 24, 2026', revenue: '₹89.6 L' },
];

// ─── Purchase Data ──────────────────────────────────────────────────────────────

const purchaseCards = [
  { label: 'Purchase Spend (MTD)', value: '₹2.89 Cr', change: '+₹2.53 Cr last month', icon: TrendingUp },
  { label: 'Open Purchase Orders', value: '40', change: '+11.4% orders booked this month', icon: ShoppingCart },
  { label: 'Avg Lead Time', value: '6.2 days', change: '+11.4% per production order', icon: FileText },
  { label: 'Delayed Orders', value: '4', change: '+15.4% on time, in full', icon: Package },
];

const rawMaterialTrendAll = [
  { name: 'JAN', spend: 20 }, { name: 'FEB', spend: 18 },
  { name: 'MAR', spend: 12 }, { name: 'APR', spend: 35 },
  { name: 'MAY', spend: 30 }, { name: 'JUN', spend: 8 },
  { name: 'JUL', spend: 50 }, { name: 'AUG', spend: 55 },
  { name: 'SEP', spend: 65 }, { name: 'OCT', spend: 100 },
  { name: 'NOV', spend: 92 }, { name: 'DEC', spend: 95 },
];
const rawMaterialTrend6M = rawMaterialTrendAll.slice(6);

const buildSpendDonut = () => {
  const segments = [];
  // Raw Paper 38% — blue/indigo (16 segments)
  for (let i = 0; i < 16; i++) {
    const hue = 248 - (i / 15) * 18;
    segments.push({ value: 1, color: `hsl(${hue}, 72%, 50%)` });
  }
  // Kraft Paper 24% — red (10 segments)
  for (let i = 0; i < 10; i++) {
    const hue = 4 + (i / 9) * 12;
    segments.push({ value: 1, color: `hsl(${hue}, 88%, 50%)` });
  }
  // Printing Inks 14% — orange (6 segments)
  for (let i = 0; i < 6; i++) {
    const hue = 24 + (i / 5) * 14;
    segments.push({ value: 1, color: `hsl(${hue}, 96%, 52%)` });
  }
  // Adhesives 10% — yellow (4 segments)
  for (let i = 0; i < 4; i++) {
    const hue = 46 + (i / 3) * 6;
    segments.push({ value: 1, color: `hsl(${hue}, 100%, 52%)` });
  }
  // Machine Parts 10% — pink/magenta (4 segments)
  for (let i = 0; i < 4; i++) {
    segments.push({ value: 1, color: `hsl(${318 + i * 4}, 82%, 58%)` });
  }
  // Others 4% — teal (2 segments)
  for (let i = 0; i < 2; i++) {
    segments.push({ value: 1, color: `hsl(${162 + i * 8}, 68%, 50%)` });
  }
  return segments;
};
const spendDonut = buildSpendDonut();

const spendLegend = [
  { name: 'Raw Paper', pct: '38%', color: '#4a45c5' },
  { name: 'Kraft Paper', pct: '24%', color: '#e53030' },
  { name: 'Printing Inks', pct: '14%', color: '#f47c10' },
  { name: 'Adhesives', pct: '10%', color: '#f5c800' },
  { name: 'Machine Parts', pct: '10%', color: '#d946a8' },
  { name: 'Others', pct: '4%', color: '#22c095' },
];

const purchaseSummaryItems = [
  { label: 'Pending', value: '₹2.89 Cr', icon: TrendingUp },
  { label: 'Approved', value: '40', icon: ShoppingCart },
  { label: 'Received', value: '6.2 days', icon: FileText },
  { label: 'Delayed', value: '4', icon: Package },
];

const stockAlerts = [
  { name: 'Glue', pct: 44, level: 'critical', note: 'Urgent reorder needed' },
  { name: 'Kraft Paper', pct: 66, level: 'warning', note: '' },
  { name: 'CMYK Ink', pct: 66, level: 'warning', note: '' },
];

const vendorPerformance = [
  { vendor: 'Star Paper Mills', material: 'Raw Paper / Kraft', orders: 14, spend: '₹86.4 L', rating: 4.8, leadTime: '3 Days', onTime: '76%', status: 'Active' },
  { vendor: 'Balaji Chemicals', material: 'Glue & Adhesive', orders: 8, spend: '₹66.4 L', rating: 4.9, leadTime: '5 Days', onTime: '86%', status: 'Active' },
  { vendor: 'ColorPrint Inks', material: 'Printing Inks', orders: 23, spend: '₹88.8 L', rating: 4.3, leadTime: '10 Days', onTime: '76%', status: 'Active' },
  { vendor: 'Kumar Meal & Co', material: 'Machine Spares', orders: 4, spend: '₹96.1 L', rating: 3.9, leadTime: '2 Days', onTime: '66%', status: 'Active' },
  { vendor: 'MetalParts Co.', material: 'Stitching Wire', orders: 10, spend: '₹36.4 L', rating: 4.1, leadTime: '8 Days', onTime: '96%', status: 'Active' },
  { vendor: 'WireTech Pvt', material: 'Clamp Pin', orders: 15, spend: '₹16.4 L', rating: 4.7, leadTime: '9 Days', onTime: '93%', status: 'Active' },
];

const purchaseOrders = [
  { po: 'PUR-4440', vendor: 'BlueWave Foods Ltd.', material: '3-Ply RSC Produce Box', qty: '200 Tons', status: 'Approved', date: 'Jul 25, 2026' },
  { po: 'PUR-7462', vendor: 'GreenLeaf Organics', material: '3-Ply Duplex Mailer Box', qty: '100 Tons', status: 'Received', date: 'Jul 17, 2026' },
  { po: 'PUR-4246', vendor: 'Nova Electronics Pvt Ltd', material: 'Wax-Coated Fish Box', qty: '56 Tons', status: 'Approved', date: 'Jul 29, 2026' },
  { po: 'PUR-2341', vendor: 'Reliant Packaging Co.', material: 'Die-Cut Shipping Carton', qty: '220 Tons', status: 'Pending', date: 'Jul 23, 2026' },
  { po: 'PUR-9573', vendor: 'BlueWave Foods Ltd.', material: '3-Ply Printed Mailer', qty: '420 L', status: 'Received', date: 'Jul 19, 2026' },
  { po: 'PUR-7452', vendor: 'Sundar Textiles', material: '7-Ply Heavy Duty Box', qty: '12 Trips', status: 'Pending', date: 'Jul 24, 2026' },
];

// ─── Production Data ────────────────────────────────────────────────────────────

const productionCards = [
  { label: 'Production Output', value: '48,620', change: '+₹2.53 Cr last month', icon: TrendingUp },
  { label: 'Overall Equipment Effectiveness', value: '82.6%', change: '+11.4% orders booked this month', icon: Settings },
  { label: 'Wastage', value: '3.2%', change: '+11.4% per production order', icon: Recycle , trendColor: 'text-rose-500' },
  { label: 'Running Machines', value: '18 / 22', change: '+15.4% on time, in full', icon: Factory },
];

const productionTrend7D = [
  { name: 'Jul 8', output: 62, wastage: 38 },
  { name: 'Jul 9', output: 58, wastage: 35 },
  { name: 'Jul 10', output: 65, wastage: 40 },
  { name: 'Jul 11', output: 60, wastage: 38 },
  { name: 'Jul 12', output: 75, wastage: 42 },
  { name: 'Jul 13', output: 80, wastage: 45 },
  { name: 'Jul 14', output: 95, wastage: 48 },
];
const productionTrend1M = [
  { name: 'Jun 15', output: 55, wastage: 32 }, { name: 'Jun 18', output: 58, wastage: 34 },
  { name: 'Jun 21', output: 62, wastage: 36 }, { name: 'Jun 24', output: 60, wastage: 38 },
  { name: 'Jun 27', output: 65, wastage: 35 }, { name: 'Jun 30', output: 70, wastage: 40 },
  { name: 'Jul 3', output: 72, wastage: 42 }, { name: 'Jul 6', output: 68, wastage: 38 },
  { name: 'Jul 9', output: 58, wastage: 35 }, { name: 'Jul 12', output: 75, wastage: 42 },
  { name: 'Jul 14', output: 95, wastage: 48 },
];

const buildOEEDonut = () => {
  const segments = [];
  // Availability 48% — yellow/gold (20 segs)
  for (let i = 0; i < 20; i++) {
    segments.push({ value: 1, color: `hsl(${46 + (i / 19) * 12}, 100%, 52%)` });
  }
  // Performance 26% — orange-red (11 segs)
  for (let i = 0; i < 11; i++) {
    const hue = 38 - (i / 10) * 30;
    segments.push({ value: 1, color: `hsl(${Math.max(hue, 2)}, 92%, 52%)` });
  }
  // Quality 14% — deep orange (6 segs)
  for (let i = 0; i < 6; i++) {
    segments.push({ value: 1, color: `hsl(${22 - i}, 90%, 52%)` });
  }
  // Losses 12% — indigo (5 segs)
  for (let i = 0; i < 5; i++) {
    segments.push({ value: 1, color: `hsl(${248 - i * 4}, 72%, 50%)` });
  }
  return segments;
};
const oeeDonut = buildOEEDonut();

const oeeLegend = [
  { name: 'Availability', pct: '48%', color: '#f5c800' },
  { name: 'Performance', pct: '26%', color: '#e53030' },
  { name: 'Quality', pct: '14%', color: '#f47c10' },
];

const shifts = [
  { name: 'Shift A', supervisor: 'Animesh Sen', produced: 1450, target: 1600, wastage: 2.8, achieved: 91, barColor: '#3b82f6' },
  { name: 'Shift B', supervisor: 'Gurpreet Singh', produced: 1365, target: 1600, wastage: 3.8, achieved: 85, barColor: '#f97316' },
  { name: 'Shift C', supervisor: 'Gurpreet Singh', produced: 1365, target: 1600, wastage: 4.8, achieved: 85, barColor: '#3b82f6' },
];

const productionOrders = [
  { id: 'SO-4471', customer: 'Nilkamal Crates', qty: '22,200', status: 'Shipped' },
  { id: 'SO-7365', customer: 'Britannia FMCG', qty: '30,745', status: 'In Production' },
  { id: 'SO-8364', customer: 'Local Distributor', qty: '29,600', status: 'Shipped' },
  { id: 'SO-6344', customer: 'Havells Pkg. Div', qty: '26,200', status: 'Delayed' },
  { id: 'SO-6343', customer: 'Local Distributor', qty: '22,200', status: 'In Production' },
  { id: 'SO-7354', customer: 'Local Distributor', qty: '45,200', status: 'Shipped' },
];

// ─── Machine Data ─────────────────────────────────────────────────────────────

const machineKPICards = [
  { label: 'Machine Utilization', value: '87.3%', change: 'Across 24 Machines', icon: TrendingUp },
  { label: 'Running Machines', value: '18 / 22', change: '4 Idle Or Down', icon: ShoppingCart },
  { label: 'Overall Equipment Effectiveness', value: '82.6%', change: 'OEE This Month', icon: FileText },
  { label: 'Open Maintenance Jobs', value: '3', change: 'Scheduled This Week', icon: Package },
];

const machineStatusItems = [
  { label: 'Running', count: 18, color: '#22c55e', textColor: 'text-emerald-500', dot: 'bg-emerald-500' },
  { label: 'Idle', count: 3, color: '#f59e0b', textColor: 'text-amber-400', dot: 'bg-amber-400' },
  { label: 'Maintenance', count: 2, color: '#3b82f6', textColor: 'text-blue-500', dot: 'bg-blue-500' },
  { label: 'Offline', count: 1, color: '#ef4444', textColor: 'text-red-500', dot: 'bg-red-500' },
];

const machineUtilization = [
  { name: 'Corrugator Line 1', status: 'Running', utilization: 94, barColor: '#22c55e' },
  { name: 'Flexo Printer A', status: 'Running', utilization: 88, barColor: '#22c55e' },
  { name: 'Die-Cutting Machine 1', status: 'Running', utilization: 81, barColor: '#22c55e' },
  { name: 'Slotting Machine', status: 'Maintenance', utilization: 74, barColor: '#3b82f6' },
  { name: 'Stitching / Baling Unit', status: 'Idle', utilization: 84, barColor: '#f97316' },
];

// ─── Quality Data ─────────────────────────────────────────────────────────────

const qualityCards = [
  { label: 'Quality Score', value: '97.8%', change: 'Across 24 Machines', icon: TrendingUp },
  { label: 'Rejection Rate', value: '3.4%', change: '4 Idle Or Down', icon: ShoppingCart },
  { label: 'Rework Rate', value: '2.1%', change: 'OEE This Month', icon: FileText },
  { label: 'Customer Complaints', value: '5', change: 'Scheduled This Week', icon: Package },
];

const qualityScoreTrend = [
  { name: 'JAN', score: 87 }, { name: 'FEB', score: 82 },
  { name: 'MAR', score: 84 }, { name: 'APR', score: 90 },
  { name: 'MAY', score: 93 }, { name: 'JUN', score: 95 },
  { name: 'JUL', score: 94 }, { name: 'AUG', score: 96 },
  { name: 'SEP', score: 95 }, { name: 'OCT', score: 97 },
  { name: 'NOV', score: 98 }, { name: 'DEC', score: 97 },
];

const qualitySummaryItems = [
  { label: 'Passed', value: '1850', icon: TrendingUp },
  { label: 'Rejected', value: '40', icon: ShoppingCart },
  { label: 'Rework', value: '38', icon: TrendingUp },
  { label: 'Complaints', value: '4', icon: ShoppingCart },
];

const tabs = ['Overview', 'Sales', 'Purchase', 'Production', 'Machine', 'Quality'];

// ─── Shared Components ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: entry.color }} />
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MetricCard = ({ label, value, change, icon: Icon, trendColor = "text-emerald-500", trendIcon: TrendIcon = TrendingUp }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col p-4 h-full">
    <div className="flex items-start justify-between mb-2">
      <p className="text-[12px] text-gray-500 font-medium leading-tight pr-2">{label}</p>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] shadow-sm">
        <Icon className="w-4 h-4 text-white" strokeWidth={2} />
      </div>
    </div>
    <div className="mt-auto">
      <p className="text-[20px] font-bold text-gray-900 tracking-tight mb-1">{value}</p>
      <p className={`text-[11px] ${trendColor} font-medium flex items-center gap-1`}>
        <TrendIcon className="w-3 h-3" />
        {change}
      </p>
    </div>
  </div>
);

// ─── Overview Tab ───────────────────────────────────────────────────────────────

const OverviewTab = () => {
  const [timeRange, setTimeRange] = useState('all');
  const chartData = overviewChartData[timeRange] || overviewChartData['all'];

  return (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
        {overviewCards.map((card, i) => <MetricCard key={i} {...card} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

        {/* Production Output vs Wastage */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Production Output vs Wastage</h2>
            <div className="flex items-center gap-2">
              {[['14days', '14 Days'], ['7days', '7 days'], ['all', 'All']].map(([key, lbl]) => (
                <button key={key} onClick={() => setTimeRange(key)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${timeRange === key ? 'bg-gray-800 text-white' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 110]} ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="output" name="Output (units)" stroke="#7c3aed" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="wastage" name="Wastage (%)" stroke="#ec4899" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-violet-500">Output (units)</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-pink-400">Wastage (%)</span>
          </div>
        </div>

        {/* OEE Composition Donut */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">OEE Composition</h2>
          <div className="flex-1 flex flex-col items-center justify-center">
            <PieChart width={230} height={230}>
              <Pie
                data={overviewOEEDonut}
                cx={115} cy={115}
                innerRadius={60} outerRadius={100}
                paddingAngle={0.8}
                dataKey="value"
                startAngle={255} endAngle={255 - 360}
                labelLine={false}
              >
                {overviewOEEDonut.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div className="flex flex-col gap-3 mt-4 w-full px-4">
              {overviewOEELegend.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Sales Tab ──────────────────────────────────────────────────────────────────

const SalesTab = () => {
  const [trendRange, setTrendRange] = useState('6M');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trendOptions = { '6M': salesTrend6M, '1Y': salesTrendAll };
  const trendData = trendOptions[trendRange];

  return (
    <>
      {/* Sales KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        {salesCards.map((card, i) => <MetricCard key={i} {...card} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">

        {/* Sales Trend Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Sales Trend</h2>
            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 text-xs font-medium text-blue-500 bg-white hover:bg-blue-50 transition-colors"
              >
                Last {trendRange === '6M' ? '6 month' : '1 year'}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-36 overflow-hidden">
                  {[['6M', 'Last 6 month'], ['1Y', 'Last 1 year']].map(([key, lbl]) => (
                    <button key={key} onClick={() => { setTrendRange(key); setDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${trendRange === key ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                      {lbl}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={{ stroke: '#a78bfa', strokeWidth: 1.5 }} tickLine={{ stroke: '#a78bfa' }} tickMargin={8} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={{ stroke: '#a78bfa', strokeWidth: 1.5 }} tickLine={{ stroke: '#a78bfa' }} tickMargin={8} domain={[0, 110]} ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" name="Revenue (Cr)" stroke="#7c3aed" strokeWidth={2} dot={false} activeDot={{ r: 5, fill: '#7c3aed' }} />
              <Line type="monotone" dataKey="target" name="Target (Cr)" stroke="#ec4899" strokeWidth={1.5} dot={false} activeDot={{ r: 5, fill: '#ec4899' }} />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex items-center gap-3 mt-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-violet-500">Revenue (Cr)</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-pink-400">Target (Cr)</span>
          </div>
        </div>

        {/* Sales by Channel Rainbow Donut */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Sales by Channel</h2>
          <div className="flex flex-col items-center justify-center flex-1">
            <PieChart width={220} height={220}>
              <Pie
                data={rainbowDonut}
                cx={110} cy={110}
                innerRadius={62} outerRadius={100}
                paddingAngle={0.8}
                dataKey="value"
                startAngle={200} endAngle={200 - 360}
                labelLine={false}
              >
                {rainbowDonut.map((seg, i) => <Cell key={i} fill={seg.color} />)}
              </Pie>
            </PieChart>

            {/* Channel Legend */}
            <div className="w-full mt-2 space-y-1.5 px-1">
              {channelLegend.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Customer Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-3">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Top Customer</h2>

        {/* Search + Filter row */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.8} />
            <input
              type="text"
              placeholder="Search customer, product or item..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 bg-white hover:bg-gray-50 transition-colors">
            This Month
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Customer', 'Order', 'Quantity', 'Revenue'].map(h => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium pb-3 pr-6 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((c, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-6 text-sm text-gray-700">{c.name}</td>
                  <td className="py-3 pr-6 text-sm text-gray-600">{c.orders}</td>
                  <td className="py-3 pr-6 text-sm text-gray-600">{c.quantity}</td>
                  <td className="py-3 text-sm font-medium text-gray-800">{c.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Production Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Recent Production Orders</h2>

        {/* Search + Filter row */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.8} />
            <input
              type="text"
              placeholder="Search customer, product or item..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 bg-white hover:bg-gray-50 transition-colors">
            This Month
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Order', 'Customer', 'Product', 'Quantity', 'Status', 'Date', 'Revenue'].map(h => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium pb-3 pr-4 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 text-sm font-medium text-gray-700">{o.id}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{o.customer}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{o.product}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{o.qty}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${o.status === 'In Progress' ? 'text-sky-500 bg-sky-50'
                        : o.status === 'Completed' ? 'text-emerald-600 bg-emerald-50'
                          : 'text-pink-500 bg-pink-50'
                      }`}>{o.status}</span>
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-500">{o.date}</td>
                  <td className="py-3 text-sm font-medium text-gray-800">{o.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-1 mt-4">
          <button className="w-7 h-7 rounded border border-gray-200 text-gray-400 text-xs flex items-center justify-center hover:bg-gray-50 transition-colors">&lt;</button>
          <button className="w-7 h-7 rounded border border-gray-200 text-gray-400 text-xs flex items-center justify-center hover:bg-gray-50 transition-colors">&gt;</button>
        </div>
      </div>
    </>
  );
};

// ─── Purchase Tab ───────────────────────────────────────────────────────────────

const PurchaseTab = () => {
  const [costRange, setCostRange] = useState('6M');
  const [costDropOpen, setCostDropOpen] = useState(false);
  const costData = costRange === '6M' ? rawMaterialTrend6M : rawMaterialTrendAll;

  return (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        {purchaseCards.map((card, i) => <MetricCard key={i} {...card} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">

        {/* Raw Material Cost Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Raw Material Cost Trend</h2>
            <div className="relative">
              <button onClick={() => setCostDropOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors">
                Last {costRange === '6M' ? '6 month' : '1 year'}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {costDropOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-36 overflow-hidden">
                  {[['6M', 'Last 6 month'], ['1Y', 'Last 1 year']].map(([key, lbl]) => (
                    <button key={key} onClick={() => { setCostRange(key); setCostDropOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${costRange === key ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                      {lbl}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={costData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 110]} ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="spend" name="Spend" stroke="#7c3aed" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-violet-500">Spend</span>
          </div>
        </div>

        {/* Spend by Material Donut */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Spend by Material</h2>
          <div className="flex flex-col items-center justify-center flex-1">
            <PieChart width={220} height={220}>
              <Pie data={spendDonut} cx={110} cy={110}
                innerRadius={62} outerRadius={100}
                paddingAngle={0.8} dataKey="value"
                startAngle={90} endAngle={90 - 360} labelLine={false}>
                {spendDonut.map((seg, i) => <Cell key={i} fill={seg.color} />)}
              </Pie>
            </PieChart>
            <div className="w-full mt-2 space-y-1.5 px-1">
              {spendLegend.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Summary + Stock Reorder Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">

        {/* Purchase Summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Purchase Summary</h2>
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">This Month</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {purchaseSummaryItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-sky-500" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                    <p className="text-xl font-bold text-gray-800 mt-0.5">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stock Reorder Alerts */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Stock Reorder Alerts</h2>
          <div className="flex flex-col gap-3">
            {stockAlerts.map((alert, i) => (
              <div key={i} className={`rounded-xl p-4 ${alert.level === 'critical' ? 'bg-red-50' : 'bg-yellow-50'
                }`}>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className={`text-base leading-none ${alert.level === 'critical' ? 'text-red-500' : 'text-yellow-500'
                    }`}>⚠</span>
                  <span className="text-sm font-semibold text-gray-800">{alert.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/70 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${alert.level === 'critical' ? 'bg-red-500' : 'bg-yellow-400'
                      }`} style={{ width: `${alert.pct}%` }} />
                  </div>
                  <span className={`text-xs font-semibold min-w-[2.5rem] text-right ${alert.level === 'critical' ? 'text-red-600' : 'text-yellow-700'
                    }`}>{alert.pct}%</span>
                </div>
                {alert.note && (
                  <p className="text-xs mt-2 font-medium text-red-500">{alert.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor Performance Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-3">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Vendor Performance</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.8} />
            <input type="text" placeholder="Search customer, product or item..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
          <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">This Month</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Vendor', 'Material', 'Orders', 'Spend (MTD)', 'Rating', 'Lead Time', 'On Time', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium pb-3 pr-4 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vendorPerformance.map((v, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 text-sm font-medium text-gray-700">{v.vendor}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{v.material}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{v.orders}</td>
                  <td className="py-3 pr-4 text-sm font-medium text-gray-800">{v.spend}</td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-gray-700 flex items-center gap-1">
                      <span className="text-yellow-400">★</span>{v.rating}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{v.leadTime}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{v.onTime}</td>
                  <td className="py-3 text-xs text-gray-400">{v.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-center gap-1 mt-4">
          <button className="w-7 h-7 rounded border border-gray-200 text-gray-400 text-xs flex items-center justify-center hover:bg-gray-50 transition-colors">&lt;</button>
          <button className="w-7 h-7 rounded border border-gray-200 text-gray-400 text-xs flex items-center justify-center hover:bg-gray-50 transition-colors">&gt;</button>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Purchase Orders</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.8} />
            <input type="text" placeholder="Search customer, product or item..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
          <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">This Month</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Po Number', 'Vendor', 'Material', 'Quantity', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium pb-3 pr-4 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((o, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 text-sm font-medium text-gray-700">{o.po}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{o.vendor}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{o.material}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{o.qty}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${o.status === 'Approved' ? 'text-sky-500 bg-sky-50'
                        : o.status === 'Received' ? 'text-emerald-600 bg-emerald-50'
                          : 'text-pink-500 bg-pink-50'
                      }`}>{o.status}</span>
                  </td>
                  <td className="py-3 text-sm text-gray-500">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-center gap-1 mt-4">
          <button className="w-7 h-7 rounded border border-gray-200 text-gray-400 text-xs flex items-center justify-center hover:bg-gray-50 transition-colors">&lt;</button>
          <button className="w-7 h-7 rounded border border-gray-200 text-gray-400 text-xs flex items-center justify-center hover:bg-gray-50 transition-colors">&gt;</button>
        </div>
      </div>
    </>
  );
};
// \u2500\u2500\u2500 Production Tab \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const ProductionTab = () => {
  const [prodRange, setProdRange] = useState('7D');
  const [prodDropOpen, setProdDropOpen] = useState(false);
  const trendData = prodRange === '7D' ? productionTrend7D : productionTrend1M;

  return (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        {productionCards.map((card, i) => <MetricCard key={i} {...card} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">

        {/* Production Output Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Production Output Trend</h2>
            <div className="relative">
              <button onClick={() => setProdDropOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors">
                Last {prodRange === '7D' ? '7 days' : '1 month'}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {prodDropOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-36 overflow-hidden">
                  {[['7D', 'Last 7 days'], ['1M', 'Last 1 month']].map(([key, lbl]) => (
                    <button key={key} onClick={() => { setProdRange(key); setProdDropOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${prodRange === key ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                      {lbl}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="outputGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="wastageGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 110]} ticks={[0, 20, 40, 60, 80, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="output" name="Output" stroke="#7c3aed" fill="url(#outputGrad)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              <Area type="monotone" dataKey="wastage" name="Wastage" stroke="#ec4899" fill="url(#wastageGrad)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-violet-500">Output</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-pink-400">Wastage</span>
          </div>
        </div>

        {/* OEE Composition Donut with center text */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">OEE Composition</h2>
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="relative" style={{ width: 220, height: 220 }}>
              <PieChart width={220} height={220}>
                <Pie data={oeeDonut} cx={110} cy={110}
                  innerRadius={68} outerRadius={105}
                  paddingAngle={0.5} dataKey="value"
                  startAngle={90} endAngle={90 - 360} labelLine={false}>
                  {oeeDonut.map((seg, i) => <Cell key={i} fill={seg.color} />)}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-2xl font-bold text-gray-800">82.6%</p>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider text-center leading-tight">Overall OEE</p>
              </div>
            </div>
            <div className="w-full mt-3 space-y-1.5 px-1">
              {oeeLegend.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Production Summary + Shift Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">

        {/* Production Summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Production Summary</h2>
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">This Month</button>
          </div>
          {/* Today's target bar */}
          <div className="border border-gray-100 rounded-xl p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-sm">⚠</span>
                <p className="text-xs font-medium text-gray-600">Today's target</p>
              </div>
              <span className="text-sm font-bold text-blue-500">5,200</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }} />
            </div>
            <p className="text-xs text-amber-500 font-medium">80% completed</p>
          </div>
          {/* 2x2 stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Completed', value: '4,180' },
              { label: 'Remaining', value: '1,020' },
              { label: 'Rejected', value: '96' },
              { label: 'Quality Score', value: '97.8%' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shift Performance */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Shift Performance</h2>
          <div className="flex flex-col gap-3">
            {shifts.map((shift, i) => {
              const pct = Math.round((shift.produced / shift.target) * 100);
              return (
                <div key={i}>
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{shift.name}</p>
                      <p className="text-xs text-gray-400">Supervisor: {shift.supervisor}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-800">{shift.produced.toLocaleString()}/{shift.target.toLocaleString()}</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: shift.barColor }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-amber-500 font-medium">Wastage: {shift.wastage}%</p>
                    <p className={`text-xs font-semibold ${shift.achieved >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {shift.achieved}% Target achieved
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Production Order Status Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Production Order Status</h2>
        <div className="flex items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.8} />
            <input type="text" placeholder="Search customer, product or item..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Order', 'Customer', 'Quantity', 'Revenue'].map(h => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium pb-3 pr-4 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productionOrders.map((o, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 text-sm font-medium text-gray-700">{o.id}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{o.customer}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{o.qty}</td>
                  <td className="py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${o.status === 'Shipped' ? 'text-emerald-600 bg-emerald-50'
                        : o.status === 'In Production' ? 'text-orange-500 bg-orange-50'
                          : 'text-red-500 bg-red-50'
                      }`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// ─── Machine Tab ───────────────────────────────────────────────────────────────

const MachineTab = () => {
  const total = machineStatusItems.reduce((s, m) => s + m.count, 0);

  const statusBadgeClass = {
    'Running': 'text-emerald-600 bg-emerald-50',
    'Maintenance': 'text-blue-600 bg-blue-50',
    'Idle': 'text-gray-500 bg-gray-100',
    'Offline': 'text-red-500 bg-red-50',
  };

  return (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        {machineKPICards.map((card, i) => <MetricCard key={i} {...card} />)}
      </div>

      {/* Machine Status + Machine Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

        {/* Machine Status */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Machine Status</h2>

          {/* 2×2 count grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {machineStatusItems.map((s, i) => (
              <div key={i}>
                <p className={`text-4xl font-bold mb-1.5 ${s.textColor}`}>{s.count}</p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                  <span className="text-xs text-gray-500">{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Composite color bar */}
          <div className="flex w-full h-2.5 rounded-full overflow-hidden mb-2">
            {machineStatusItems.map((s, i) => (
              <div key={i}
                style={{ width: `${(s.count / total) * 100}%`, backgroundColor: s.color }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400">{total} machines on the floor today</p>
        </div>

        {/* Machine Utilization */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Machine Utilization</h2>
          <div className="flex flex-col gap-3">
            {machineUtilization.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-gray-700 flex-1 min-w-0 truncate">{m.name}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded flex-shrink-0 ${statusBadgeClass[m.status]}`}>
                  {m.status}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0" style={{ width: 140 }}>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${m.utilization}%`, backgroundColor: m.barColor }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 w-8 text-right">{m.utilization}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
// ─── Quality Tab ───────────────────────────────────────────────────────────────

const QualityTab = () => (
  <>
    {/* KPI Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
      {qualityCards.map((card, i) => <MetricCard key={i} {...card} />)}
    </div>

    {/* Quality Score Trend + Quality Summary */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

      {/* Quality Score Trend */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Quality Score Trend</h2>
          <span className="px-3 py-1.5 rounded-full bg-sky-500 text-white text-xs font-medium">
            Last 14 Days
          </span>
        </div>
        <ResponsiveContainer width="100%" height={285}>
          <LineChart data={qualityScoreTrend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false}
              domain={[0, 110]} ticks={[0, 20, 40, 60, 80, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="score" name="Quality Score"
              stroke="#c026d3" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quality Summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Quality Summary</h2>
          <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">This Month</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {qualitySummaryItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-sky-500" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                  <p className="text-xl font-bold text-gray-800 mt-0.5">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </>
);

// ─── Dashboard Page ─────────────────────────────────────────────────────────────

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [lastUpdated] = useState('Just Now');


  return (
    <div className="flex-1 flex flex-col bg-[#f4f7f9] overflow-hidden">
      <div className="flex-shrink-0 p-1.5 pb-0 z-10">
        <div className="max-w-screen-2xl mx-auto space-y-1.5">

          {/* Page Header Section */}
          <div className="bg-white rounded-[16px] border border-gray-100 px-5 py-2 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[22px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] inline-block leading-tight">
                  ERP Dashboard
                </h1>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Monitor Production, Machines, Inventory, Sales, Purchase And Plant Performance.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[11px] font-medium text-gray-400">Last Updated {lastUpdated}</span>
                <button className="w-8 h-8 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                  <RefreshCw className="w-4 h-4" strokeWidth={2} />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-[12px] font-bold hover:bg-gray-50 transition-colors shadow-sm">
                  <Download className="w-3.5 h-3.5" strokeWidth={2} />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-[20px] border border-gray-100 px-3 py-1.5 shadow-sm">
            <div className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all ${activeTab === tab ? 'bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-1.5">
        <div className="max-w-screen-2xl mx-auto space-y-1.5">
          {/* Main Content Area */}
          <div className="pt-1">
            {/* Tab Content */}
            {activeTab === 'Overview' && <OverviewTab />}
            {activeTab === 'Sales' && <SalesTab />}
            {activeTab === 'Purchase' && <PurchaseTab />}
            {activeTab === 'Production' && <ProductionTab />}
            {activeTab === 'Machine' && <MachineTab />}
            {activeTab === 'Quality' && <QualityTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
