import React from 'react';
import { 
  Settings, 
  ShieldCheck, 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Truck, 
  MoreHorizontal,
  Wrench,
  FileCheck,
  FileText,
  Tag,
  Circle
} from 'lucide-react';

const eventConfig = {
  maintenance: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    iconBg: 'bg-green-500',
    iconColor: 'text-white',
    icon: Wrench,
    label: 'Maintenance'
  },
  quality: {
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    iconBg: 'bg-purple-500',
    iconColor: 'text-white',
    icon: FileCheck,
    label: 'Quality'
  },
  sales: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    iconBg: 'bg-red-500',
    iconColor: 'text-white',
    icon: FileText,
    label: 'Sales'
  },
  inventory: {
    bg: 'bg-orange-50',
    text: 'text-orange-800',
    iconBg: 'bg-orange-500',
    iconColor: 'text-white',
    icon: Package,
    label: 'Inventory'
  },
  purchase: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-800',
    iconBg: 'bg-indigo-500',
    iconColor: 'text-white',
    icon: ShoppingCart,
    label: 'Purchase'
  },
  dispatch: {
    bg: 'bg-teal-50',
    text: 'text-teal-800',
    iconBg: 'bg-teal-500',
    iconColor: 'text-white',
    icon: Truck,
    label: 'Dispatch'
  },
  others: {
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    iconBg: 'bg-slate-500',
    iconColor: 'text-white',
    icon: MoreHorizontal,
    label: 'Others'
  }
};

const MonthEventPill = ({ title, type }) => {
  const config = eventConfig[type] || eventConfig.others;
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md mb-1 ${config.bg}`}>
      <div className={`flex items-center justify-center p-0.5 rounded-sm ${config.iconBg}`}>
        <Icon className={`w-3 h-3 ${config.iconColor}`} />
      </div>
      <span className={`text-[11px] font-semibold truncate ${config.text}`}>
        {title}
      </span>
    </div>
  );
};

const ManufacturingCalendarMonthView = () => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const monthData = [
    [
      { date: 26, isCurrentMonth: false, events: [] },
      { date: 27, isCurrentMonth: false, events: [] },
      { date: 28, isCurrentMonth: false, events: [] },
      { date: 29, isCurrentMonth: false, events: [] },
      { date: 30, isCurrentMonth: false, events: [] },
      { date: 31, isCurrentMonth: false, events: [] },
      { date: 1, isCurrentMonth: true, events: [] }
    ],
    [
      { date: 2, isCurrentMonth: true, events: [] },
      { date: 3, isCurrentMonth: true, events: [
        { title: 'Machine Maintenance', type: 'maintenance' },
        { title: 'Vendor Follow-up', type: 'purchase' }
      ] },
      { date: 4, isCurrentMonth: true, events: [
        { title: 'Production Plan', type: 'purchase' },
        { title: 'Raw Material Check', type: 'inventory' }
      ] },
      { date: 5, isCurrentMonth: true, events: [
        { title: 'QC Report Review', type: 'sales' },
        { title: 'Customer Call ABC', type: 'maintenance' }
      ] },
      { date: 6, isCurrentMonth: true, events: [
        { title: 'PO-245B Confirmation', type: 'inventory' },
        { title: 'Sales Order Follow Up', type: 'purchase' }
      ] },
      { date: 7, isCurrentMonth: true, events: [
        { title: 'Material Issue Review', type: 'inventory' },
        { title: 'Plant Maintenance', type: 'purchase' }
      ] },
      { date: 8, isCurrentMonth: true, events: [] }
    ],
    [
      { date: 9, isCurrentMonth: true, events: [] },
      { date: 10, isCurrentMonth: true, events: [
        { title: 'Dispatch Schedule', type: 'inventory' },
        { title: 'Invoice Follow-up', type: 'maintenance' }
      ] },
      { date: 11, isCurrentMonth: true, events: [
        { title: 'Quality Inspection', type: 'purchase' },
        { title: 'Store Verification', type: 'sales' }
      ] },
      { date: 12, isCurrentMonth: true, events: [
        { title: 'Machine Utilization', type: 'maintenance' },
        { title: 'Purchase Follow-up', type: 'purchase' }
      ] },
      { date: 13, isCurrentMonth: true, events: [
        { title: 'Safety Inspection', type: 'inventory' },
        { title: 'Labour Review', type: 'dispatch' }
      ] },
      { date: 14, isCurrentMonth: true, events: [
        { title: 'Production Review', type: 'purchase' },
        { title: 'Customer Meeting', type: 'purchase' }
      ] },
      { date: 15, isCurrentMonth: true, events: [] }
    ],
    [
      { date: 16, isCurrentMonth: true, events: [] },
      { date: 17, isCurrentMonth: true, events: [
        { title: 'Raw Material Check', type: 'sales' },
        { title: 'Vendor Evaluation', type: 'maintenance' }
      ] },
      { date: 18, isCurrentMonth: true, events: [
        { title: 'Production Plan', type: 'purchase' },
        { title: 'QC Report Review', type: 'inventory' }
      ] },
      { date: 19, isCurrentMonth: true, events: [
        { title: 'Machine Maintenance', type: 'maintenance' },
        { title: 'Dispatch Planning', type: 'purchase' }
      ] },
      { date: 20, isCurrentMonth: true, events: [
        { title: 'Sales Review', type: 'sales' },
        { title: 'Budget Check', type: 'dispatch' }
      ] },
      { date: 21, isCurrentMonth: true, events: [
        { title: 'Material Issue Review', type: 'inventory' },
        { title: 'Cost Analysis', type: 'dispatch' }
      ] },
      { date: 22, isCurrentMonth: true, events: [] }
    ],
    [
      { date: 23, isCurrentMonth: true, events: [] },
      { date: 24, isCurrentMonth: true, isSelected: true, events: [
        { title: 'Material Issue Review', type: 'sales' },
        { title: 'Machine Maintenance', type: 'dispatch' },
        { title: 'Customer Call ABC', type: 'inventory' },
        { title: 'Extra Event 1', type: 'purchase' },
        { title: 'Extra Event 2', type: 'maintenance' }
      ] },
      { date: 25, isCurrentMonth: true, events: [
        { title: 'Production Plan Review', type: 'purchase' },
        { title: 'Quality Check', type: 'purchase' }
      ] },
      { date: 26, isCurrentMonth: true, events: [
        { title: 'Dispatch Schedule', type: 'inventory' },
        { title: 'Vendor Follow-up', type: 'maintenance' }
      ] },
      { date: 27, isCurrentMonth: true, events: [
        { title: 'PO Confirmation', type: 'purchase' },
        { title: 'Safety Audit', type: 'inventory' }
      ] },
      { date: 28, isCurrentMonth: true, events: [
        { title: 'Machine Utilization', type: 'maintenance' },
        { title: 'Sales Order Follow-up', type: 'sales' }
      ] },
      { date: 29, isCurrentMonth: true, events: [] }
    ]
  ];

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-[600px]">
      
      {/* Header Row */}
      <div className="grid grid-cols-7 border-b border-slate-200 bg-white sticky top-0 z-20">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className={`py-3 flex items-center justify-center text-[11px] font-bold text-slate-500 ${idx !== daysOfWeek.length - 1 ? 'border-r border-slate-200' : ''}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Grid Area */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        {monthData.map((week, weekIdx) => (
          <div key={weekIdx} className={`flex-1 grid grid-cols-7 ${weekIdx !== monthData.length - 1 ? 'border-b border-slate-200' : ''}`}>
            {week.map((day, dayIdx) => (
              <div 
                key={dayIdx} 
                className={`p-2 flex flex-col min-h-[110px] ${dayIdx !== week.length - 1 ? 'border-r border-slate-200' : ''} ${!day.isCurrentMonth ? 'bg-slate-50/50 text-slate-400' : ''} ${day.isSelected ? 'bg-indigo-50/30' : ''}`}
              >
                <div className={`text-sm font-semibold mb-2 flex items-center justify-center w-7 h-7 rounded-full ${day.isSelected ? 'bg-indigo-600 text-white' : (day.isCurrentMonth ? 'text-slate-700' : 'text-slate-400')}`}>
                  {day.date}
                </div>
                
                <div className="flex-1 flex flex-col gap-0.5 overflow-hidden">
                  {day.events.slice(0, 3).map((event, idx) => (
                    <MonthEventPill key={idx} title={event.title} type={event.type} />
                  ))}
                  {day.events.length > 3 && (
                    <div className="text-[10px] font-bold text-indigo-600 mt-1 pl-1 cursor-pointer hover:underline">
                      +{day.events.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend & Controls Row */}
      <div className="border-t border-slate-200 p-3 bg-white flex items-center justify-between text-xs">
        <div className="flex items-center gap-4 overflow-x-auto pb-1 flex-1">
          {Object.entries(eventConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <div key={key} className="flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:opacity-80">
                <div className={`flex items-center justify-center p-0.5 rounded-sm ${config.iconBg}`}>
                  <Icon className={`w-3 h-3 ${config.iconColor}`} />
                </div>
                <span className="font-semibold text-slate-600">{config.label}</span>
              </div>
            );
          })}
          <div className="flex items-center justify-center px-3 py-1 rounded-full border border-slate-200 text-slate-600 font-semibold cursor-pointer hover:bg-slate-50">
            + 2 more
          </div>
        </div>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 ml-4 flex-shrink-0">
          <span className="font-semibold text-slate-700">Show weekends</span>
          <div className="w-10 h-6 bg-indigo-600 rounded-full flex items-center justify-end p-1 cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ManufacturingCalendarMonthView;
